import React from 'react'
import Navbar from '../../Navbar'
import Landing from './Landing'

export default function Items() {

    document.title = "Items | Admin Profile"

    return (
        <>
            <Navbar />
            <Landing />
        </>
    )
}
