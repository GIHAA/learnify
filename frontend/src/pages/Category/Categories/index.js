import {
    Navbar,
    ItemCart
} from "../../../components";
import Landing from './Landing';

export default function Categories() {

    document.title = "Categories | Beheth Kade"

    return (
        <>
            <Navbar />
            <Landing />
            <ItemCart />
        </>
    )
}
