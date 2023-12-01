import React from 'react'
import Navbar from '../../Navbar'
import Landing from './Landing'

export default function ItemView() {

    document.title = "View Items | Seller"

    return (
        <>  
            <Navbar />
            <Landing />
        </>
    )
}
