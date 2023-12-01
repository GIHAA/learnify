import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom';
import '../../styles/madusha/verify.css';


export default function SellerVerifyEmail() {

    const params = useParams();

    axios.get(`http://localhost:7000/sellers/verifySeller/${params.id}`)
        .then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        });

    return (
        <div>
            <div className='top-color-bar'>
            </div>
            <h1 className='heading'>You are verified</h1>
            <div>
                <img className='image' src = "https://firebasestorage.googleapis.com/v0/b/beheth-kade-6ds3w9c.appspot.com/o/asserts%2Fverified.jpg?alt=media&token=24065079-90ab-4395-af59-0d74aaf28f45" alt="Verified icon" />
            </div>
        </div>
    )
}