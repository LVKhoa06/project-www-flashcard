import Create from "@/components/pages/Create";
import Protector from "@/components/Protector";


function createPage() {
    return ( <Protector><Create/></Protector> );
}

export default createPage;