/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import SellerAuth from '../../../../services/sellerAuth.service'

import '../../Brand.css'

export default function Landing() {

  const [seller, setSeller] = useState({})

  //get all sellers
  useEffect(() => {
    SellerAuth.getAllSellers().then(
      (response) => {
        setSeller(response.data)
      },
      (error) => {
        console.log(error)
      })
    console.log(seller, 'seller')
  }, [])

  return (
    <>
      <div>
        <br /><br /><br /><br /><br />
        <div className='BrandLanding'>
          {!seller.length ? (
            <div className='landing__container' style={{ width: '250%' }}>
              <Alert variant="success" style={{ margin: '0 auto' }}>
                <Alert.Heading>Loading Brands&nbsp; &nbsp; &nbsp; 
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </Alert.Heading>
              </Alert>
            </div>
          ) : (
            seller.map((seller) => (
              <a href={`/brands/${seller.companyName}`} className="content">
                <Card style={{ width: '18rem', height: '18rem', marginTop: '1rem' }} className="itemCard">
                  <Card.Img variant="top" style={{ width: '10rem', height: '10rem', margin: '0px auto' }} src={seller.image} />
                  <Card.Body>
                    <Card.Title style={{ height: '3rem' }}>{seller.companyName}</Card.Title>
                    <Button variant="primary">View Items</Button>
                  </Card.Body>
                </Card>
              </a>
            )))}
        </div>
      </div>
    </>
  )
}
