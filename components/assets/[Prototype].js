export default function Icon(props) {
    const {
        viewBox="0 0 24 24",
        width = 24,
        height = 24,
        fill="none",
        stroke,
        className,
        ...others
    } = props;

    return (<svg viewBox={viewBox} width={width} height={height} fill={fill} stroke={stroke} className={className} {...others}>
        {props.children}
    </svg>);
}