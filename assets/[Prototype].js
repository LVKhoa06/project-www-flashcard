export default function Icon(props) {
    const {
        viewBox="0 0 24 24",
        width = '24px',
        height = '24px',
        fill="none",
        stroke,
        className,
        ...others
    } = props;

    return (<svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox} width={width} height={height} fill={fill} stroke={stroke} className={className} {...others}>
        {props.children}
    </svg>);
}