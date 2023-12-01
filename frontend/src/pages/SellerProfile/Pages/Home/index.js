import React from 'react'

import Navbar from '../../Navbar'

import Landing from './Landing'
import Items from './Items'

export default function SellerProfile() {

  document.title = "Seller Profile"

  return (
    <>
      <Navbar />
      <Landing />
      <Items />
    </>
  )
}
