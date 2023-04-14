import classes from '../../styles/Loading.module.scss';

function Loading(props) {
    const { classNameBox, classNameContainer, styles, quantity } = props;
    const arr = Array.from({ length: quantity });

    return (
        <div className={`${classes.container} ${classNameContainer}`}>
            {
                arr.map((item, index) => {
                    return (
                        <div key={index} className={`${classes.box} ${classNameBox}`}>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Loading;