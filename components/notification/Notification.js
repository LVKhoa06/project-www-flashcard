import IconError from 'assets/icon-error';
import IconSuccess from 'assets/icon-success';
import IconWarning from 'assets/icon-warning';
import { useEffect, useState } from 'react';

function Notification(props) {
    const { type, message } = props;
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (message) {
            setShow(true);
            const timer = setTimeout(() => {
                setShow(false);
            }, 100000);
            return () => clearTimeout(timer);
        }
    }, [message]);

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
            <div className={`notification ${getClassNames()} ${show ? 'show' : ''}` } onClick={() => { setShow(false) }}>
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