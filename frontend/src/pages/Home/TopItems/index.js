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

import '../HomeItems.css'

import ItemService from '../../../services/item.service';

export default function TopItems() {

  const [items, setItems] = useState([]);

  //get all items
  useEffect(() => {
    ItemService.getRandom().then(
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
      <div className="HomeItems">
        <h1>Top Rated Items!!</h1>
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
              <a href={`/itemOne/${item._id}`} className="content">
                <Card style={{ width: '18rem', margin: '10px' }}>
                  <Card.Img variant="top" src={item.image} style={{ height: '18rem', }} />
                  <Card.Body>
                    <Card.Title style={{ height: '1rem' }}>{item.brand}</Card.Title>
                    <Card.Title style={{ height: '2rem' }}>{item.name}</Card.Title>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item style={{ height: '3rem' }}>Price: Rs. {item.price.toFixed(2)}</ListGroup.Item>
                  </ListGroup>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item style={{ height: '3rem' }}><Button variant="primary">View Item</Button></ListGroup.Item>
                  </ListGroup>
                </Card>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}