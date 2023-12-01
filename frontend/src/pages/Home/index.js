import "../../styles/sudul/Home.css";

import {
  Navbar,
  ItemCart,
  AppSlider,
} from "../../components";

import NewItems from "./NewItems";
import RandomItems from "./RandomItems";
import TopItems from "./TopItems";

function Home() {

  document.title = "Beheth Kade | Home";

  return (
    <>
      <Navbar />
      <AppSlider />
      <ItemCart />
      <NewItems />
      <TopItems />
      <RandomItems />
    </>
  );
}

export default Home;
