import {
    Navbar,
    ItemCart
  } from "../../../components";
import Landing from './Landing';

export default function Brands() {

    document.title = "Brands | Beheth Kade"

    return (
        <>
            <Navbar />
            <Landing />
            <ItemCart />
        </>
    )
}
