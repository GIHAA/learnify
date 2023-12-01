import React from 'react'

import Navbar from '../../Navbar'
import Landing from './Landing'
import PendingOrders from './PendingOrders'
import ConfirmedOrders from './ConfirmedOrders'
import DispatchedOrders from './DispatchedOrders'

export default function Home() {

  document.title = "Admin Profile"

  return (
    <>
      <Navbar />
      <Landing />
      <PendingOrders />
      <ConfirmedOrders />
      <DispatchedOrders />
    </>
  )
}
