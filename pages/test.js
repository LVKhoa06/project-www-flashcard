import axios from "axios";
import { useEffect, useState } from "react";


function Test() {
    const [data, setData] = useState('');
    useEffect(() => {
       console.log(data.data);
    }, [data]);
    
    const test = async () => {
        const data = await axios.get("/api/test");
        setData(data);
    }; // worker

    return (<>
        <h1 onClick={test}>Hello</h1>
    </>);
}

export default Test;