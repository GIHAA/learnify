import { useParams } from "react-router-dom";
import {
  Navbar,
  ItemCart
} from "../../components";
import Landing from './Landing'

import React from 'react'

export default function ItemOne() {
  const { param } = useParams();
  const itemid = param;
  return (
    <>
      <Navbar />
      <Landing itemID={itemid} />
      <ItemCart />
    </>
  )
}
