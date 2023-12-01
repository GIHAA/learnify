import React from 'react'
import { useParams } from 'react-router-dom'
import {
    Navbar
} from '../../components'

import Landing from './Landing';

export default function ItemSearch() {

    const { param } = useParams();

    document.title = `Search Results | ${param}`

    return (
        <>
            <Navbar />
            <Landing search={param} />
        </>
    )
}
