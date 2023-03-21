import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styles from '../../styles/GetImg.module.scss'
import Notification from "../notification/Notification";

function GetImg(props) {
    const { setShow, id, setImg } = props;
    const regexCheckUrlImage = /^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi;
    const [url, setUrl] = useState('');
    const [notificationConfig, setNotificationConfig] = useState({
        show: false,
        type: '',
        message: ''
    })

    useEffect(() => {
        const handler = async () => {
            await axios.patch(
                'api/flashcard/home',
                {
                    id,
                    field: 'img',
                    value: url
                },
                {
                    "Content-Type": "application/json",
                }
            );

            setNotificationConfig({
                type: 'success',
                show: !notificationConfig.show,
                message: 'Change image successfull'
            })

            setImg(url)
        }

        if (url) handler();
    }, [url])

    const checkImgUrl = async () => {
        const inputUrl = prompt('Enter image URL');

        try {
            if (inputUrl.trim() === '')
                return setNotificationConfig({
                    type: 'warning',
                    show: !notificationConfig.show,
                    message: 'Please enter image URL'
                })

            if (!inputUrl.match(regexCheckUrlImage))
                return setNotificationConfig({
                    type: 'warning',
                    show: !notificationConfig.show,
                    message: 'Invalid image URL'
                });

            try {
                if (inputUrl.match(regexCheckUrlImage)) {
                    await fetch(inputUrl);

                    if (inputUrl.length)
                        setUrl(inputUrl);
                }
            } catch (error) {
                setNotificationConfig({
                    type: 'error',
                    show: !notificationConfig.show,
                    message: "Can't get image from given source"
                })
            }
        } catch { }
    }

    const convertImgToBase64 = async () => {
        const elm = document.getElementById('file');
        const file = elm?.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            setUrl(reader.result)
        }
    } // convertImgToBase64

    return (
        <>
            <Notification config={notificationConfig} />
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div onClick={checkImgUrl} className={styles.item}>
                    <span>Get image from URL</span>
                </div>
                <div className={styles.item}>
                    <span>Get image from file
                        <input onChange={convertImgToBase64} id='file' type="file" />
                    </span>
                </div>
            </div>
        </>
    );
}

export default GetImg;