import Home from "@/components/pages/Home";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Foo() {
    const router = useRouter();

    return ( 
    <>
        <Home></Home>
    </> 
    );
}

export default Foo;