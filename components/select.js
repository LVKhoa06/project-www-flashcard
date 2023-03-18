function Select(props) {
    const { children, data, func } = props;

    return (
        <>
            <select onChange={(e) => func(e.target.value)}>
                {children}
                {data.map(item => {
                    return <option key={item.topic_id} value={item.topic_id}>{item.topic}</option>
                })}
            </select>
        </>
    );
}

export default Select;