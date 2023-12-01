/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ListGroup from 'react-bootstrap/ListGroup';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import './sellerItems.css'

import ItemService from '../../../../../services/item.service';

export default function Items() {

    const [items, setItems] = useState([]);

    //get all items
    useEffect(() => {
        ItemService.getNewBySeller(sessionStorage.getItem("user-id")).then(
            (response) => {
                setItems(response.data);
            },
            (error) => {
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
            });
    }, []);


    return (
        <>
            <div className="sellerItems">
                <h1>New Items By You</h1>
                <Swiper
                    // install Swiper modules
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={50}
                    slidesPerView={4}
                    navigation
                    pagination={{ clickable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                >
                    {items.map((item) => (
                        <SwiperSlide key={item.id}>
                            <Card style={{ width: '18rem' , margin : '10px' }}>
                                <Card.Img variant="top" src={item.image} />
                                <Card.Body>
                                    <Card.Title style={{ height: '3rem' }}>{item.name}</Card.Title>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item style={{ height: '2rem' }}>Price: {item.price}</ListGroup.Item>
                                    <ListGroup.Item style={{ height: '3rem' }}>Quantity: {item.quantity}</ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </SwiperSlide>
                    ))}

                </Swiper>
                <br />
                <p><a href="/sellerProfile/items"><Button variant="primary">View All Items</Button></a></p>
            </div>
        </>
    )
}