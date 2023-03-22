import Search from "@/components/pages/Search";
import Protector from "@/components/Protector";

function SearchResultPage() {
    return ( 
    <Protector>
        <Search/>
    </Protector> );
}

export default SearchResultPage;