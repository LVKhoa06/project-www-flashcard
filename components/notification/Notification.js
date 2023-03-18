import IconError from 'assets/icon-error';
import IconSuccess from 'assets/icon-success';
import IconWarning from 'assets/icon-warning';
import { useEffect, useState } from 'react';

function Notification(props) {
    const { show, message, type } = props.config
    const [showx, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 5000);

        if (message) {
            setShow(true);
            return () => clearTimeout(timer);
        } else
            setShow(false)
        return () => clearTimeout(timer);

    }, [show]);

    const getClassNames = () => {
        let className = '';
        switch (type) {
            case "error":
                className = " error";
                break;
            case "warning":
                className = " warning";
                break;
            case "success":
                className = " success";
                break;
            default:
                break;
        }
        return className;
    };

    return (
        <>
            <div className={`notification ${getClassNames()} ${showx ? 'show' : ''}`} onClick={() => { setShow(false) }}>
                <span>
                    {type === 'warning' && <IconWarning />}
                    {type === 'error' && <IconError />}
                    {type === 'success' && <IconSuccess />}
                </span>
                <p>{message}</p>
            </div>
        </>
    );
}

export default Notification;