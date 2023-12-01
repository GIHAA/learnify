import { useParams } from "react-router-dom";
import {
    Navbar,
    ItemCart
} from "../../../components";
import Landing from './Landing';

export default function CategoryItems() {
    const { param } = useParams();
    const category = param;
    document.title = `${category} | Beheth Kade`

    return (
        <>
            <Navbar />
            <ItemCart />
            <Landing category={category} />
        </>
    )
}
