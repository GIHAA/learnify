import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';


import './AboutUs.css'

import Navbar from '../../components/navbar';

export default function aboutUs() {
    return (
        <>
            <Navbar />
            <br /><br /><br /><br />
            <div className='maincontainer'>
                <div className='container_about'>
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://firebasestorage.googleapis.com/v0/b/beheth-kade-6ds3w9c.appspot.com/o/asserts%2Felegant-skin-care-banner-design.jpg?alt=media&token=97855a08-a2a7-467e-ad76-e41d8b436021"
                                alt="First slide"
                            />
                            {/* <Carousel.Caption>
                                <h3>First slide label</h3>
                            </Carousel.Caption> */}
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://firebasestorage.googleapis.com/v0/b/beheth-kade-6ds3w9c.appspot.com/o/asserts%2FMicrosoftTeams-image%20(1).png?alt=media&token=aad374ed-8c06-4de9-8073-b6b1f2c4b520"
                                alt="Second slide"
                            />

                            {/* <Carousel.Caption>
                                <h3>Second slide label</h3>
                            </Carousel.Caption> */}
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://firebasestorage.googleapis.com/v0/b/beheth-kade-6ds3w9c.appspot.com/o/asserts%2Felegant-skin-care-banner-design%20(2).jpg?alt=media&token=82066f32-1fc9-4653-a6ff-877de6d62ed9"
                                alt="Third slide"
                            />

                            {/* <Carousel.Caption>
                                <h3>Third slide label</h3>
                            </Carousel.Caption> */}
                        </Carousel.Item>
                    </Carousel>

                    <div className='container_des'>
                        <Card className='Aboutcard'>
                            <Card.Header className='header1'>ABOUT US</Card.Header>
                            <Card.Body>
                                <Card.Title className='title'>Who We Are?</Card.Title>
                                <Card.Text className='text_des'>
                                    BEHETH KADE is Sri Lankan leading online store of natural, ayurvedic and herbal products.
                                    We offer variety of products from different brands which help to enhance your beauty and health.
                                    <br></br>
                                    We at BEHETH KADE, strive for the best for our consumers and our ultimate goal is to provide the finest and branded products
                                    and serve our clients to our greatest aptitude.
                                    <br></br>
                                    We provide consumers all kind of herbs in various forms and other products in one platform. All the herb products in BEHETH KADE are
                                    provided by branded companies and packed in fully hygienical environment with all the measurable qualities.
                                </Card.Text>
                                <Card.Title className='title'>Our Vision</Card.Title>
                                <Card.Text className='text_des1'>
                                    To Promote natural and organic Ayurveda products.
                                    <br></br>
                                    To provide best quality products at an unbeatable price with fast delivery.
                                    <br></br>

                                </Card.Text>
                                <Card.Title className='title'>Our Mission</Card.Title>
                                <Card.Text className='text_des1'>
                                    Our mission is to become a trusted global leader enriching the lives of people across the world by providing
                                    high quality Ayurvedic and herbal products

                                </Card.Text>
                            </Card.Body>
                        </Card>

                    </div>
                </div>
            </div>
        </>
    )
}