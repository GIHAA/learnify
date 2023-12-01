import React from 'react'

import {
  Navbar,
  ItemCart
} from "../../components";

import Home from "./Home";

export default function BuyerProfile() {

  document.title = "Buyer Profile"

  return (
    <>
      <Navbar />
      <Home />
      <ItemCart />
    </>
  )
}
