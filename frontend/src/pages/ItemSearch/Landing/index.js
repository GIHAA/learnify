/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import './searchLanding.css'
import ItemService from '../../../services/item.service'

export default function Landing(props) {

  const [items, setItems] = useState({})

  console.log(props.search);

  useEffect(() => {
    ItemService.search(props.search).then(
      (response) => {
        setItems(response.data)
      },
      (error) => {
        console.log(error)
      }
    )
  }, [])


  return (
    <>
      <br /><br /><br /><br /><br />
      <div className='searchLanding'>

        {!items.length ? (
          <div className='landing__container' style={{ width: '1000px', margin: '0 auto' }}>
            <h1 className='landing__container__title'>
              <Alert key='warning' variant='warning' className="NoItem">
                No Items Found For '{props.search}' Keyword
              </Alert>
            </h1>
          </div>
        ) : (
          items.map((item) => (
            <a href={`/itemOne/${item._id}`} className="content">
              <Card style={{ width: '18rem', height: '20rem', marginTop: '1rem' }} className="itemCard">
                <Card.Img variant="top" style={{ width: '10rem', height: '10rem', margin: '0px auto', padding: '5px' }} src={item.image} />
                <Card.Body>
                  <Card.Title style={{ height: '3rem' }}>{item.name}</Card.Title>
                  <Card.Text style={{ height: '1rem' }}>
                    Rs. {item.price}.00
                  </Card.Text>
                  <Button className='btn1'>View Item</Button>
                </Card.Body>
              </Card>
            </a>
          )))
        }

      </div>
    </>
  )
}
