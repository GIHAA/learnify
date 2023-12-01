import { useParams } from "react-router-dom";
import {
    Navbar,
    ItemCart
} from "../../../components";
import Landing from './Landing';

export default function BrandItems() {
    const { param } = useParams();
    const brandName = param;
    document.title = `${brandName} | Beheth Kade`

    return (
        <>
            <Navbar />
            <Landing brand={brandName} />
            <ItemCart />
        </>
    )
}
