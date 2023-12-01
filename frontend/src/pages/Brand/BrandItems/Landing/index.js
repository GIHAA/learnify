/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import '../../Brand.css'
import ItemService from '../../../../services/item.service'

export default function Landing(props) {

    console.log(props.brand, 'brand');
    const [items, setItems] = useState({})

    //get all items by brand
    useEffect(() => {
        ItemService.getByBrand(props.brand).then(
            (response) => {
                setItems(response.data)
            },
            (error) => {
                console.log(error)
            })
        console.log(items, 'items')
    }, [])

    return (
        <>
            <br /><br /><br /><br /><br />
            <div className='BrandLanding'>
                {!items.length ? (
                    <div className='landing__container' style={{ width: '190%' }}>
                        <Alert variant="success" style={{ margin: '0 auto' }}>
                            <Alert.Heading>No items found for the Brand - {props.brand}</Alert.Heading>
                            <hr />
                            <p className="mb-0">
                                Please Check Other Brands
                            </p>
                        </Alert>
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
                                    <Button variant="primary">View Item</Button>
                                </Card.Body>
                            </Card>
                        </a>
                    )))
                }

            </div>
        </>
    )
}
