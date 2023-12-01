/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from "react-bootstrap/Modal";
import Alert from 'react-bootstrap/Alert';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import jwt_decode from "jwt-decode";
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'


import './ItemOneLanding.css'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import ItemService from '../../../services/item.service';
import BuyerAuth from "../../../services/buyerAuth.service";
import ReviewService from '../../../services/review.service';
import CartService from '../../../services/cart.service';
import CartItemService from '../../../services/cartItem.service';

export default function Landing(props) {

  const [rating, setRating] = useState(1);

  //login validation
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    password: Yup.string()
      .min(8, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  });

  //review validation
  const reviewSchema = Yup.object().shape({
    description: Yup.string()
      .min(10, 'Too Short!')
      .max(500, 'Too Long!')
      .required('Required'),
  });

  const [showLoginBuyer, setShowLoginBuyer] = useState(false);
  const handleCloseLoginBuyer = () => setShowLoginBuyer(false);
  const handleShowLoginBuyer = () => setShowLoginBuyer(true);

  const [showReview, setShowReview] = useState(false);
  const handleCloseReview = () => setShowReview(false);
  const handleShowReview = () => setShowReview(true);

  const { itemID } = props;
  const [item, setItem] = useState({});
  const [reviews, setReviews] = useState([]);

  //get one item details
  useEffect(() => {
    ItemService.get(itemID)
      .then((response) => {
        setItem(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  //get reviews by itemid
  useEffect(() => {
    ReviewService.getByItemID(itemID)
      .then((response) => {
        setReviews(response.data)
        console.log(response.data, 'asdasd');
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  document.title = item.name;


  function handleToken(token) {
    //decode token
    const decodedToken = jwt_decode(token);
    console.log(decodedToken);
    sessionStorage.setItem("auth-token", token);
    sessionStorage.setItem("user-id", decodedToken.id);
    sessionStorage.setItem("verification", decodedToken.verified);
    sessionStorage.setItem("brand", decodedToken.brand);
    sessionStorage.setItem("fname", decodedToken.fname);
    sessionStorage.setItem("lname", decodedToken.lname);
    sessionStorage.setItem("email", decodedToken.email);
  }

  async function loginBuyer(values) {
    const data = {
      email: values.email,
      password: values.password,
    }

    BuyerAuth.login(data)
      .then((res) => {
        sessionStorage.setItem("user-type", res.data.user);
        handleToken(res.data.token);
        const cart = {
          buyerID: sessionStorage.getItem("user-id"),
          buyerfname: sessionStorage.getItem("fname"),
          buyerlname: sessionStorage.getItem("lname"),
          buyeremail: sessionStorage.getItem("email"),
        }
        CartService.create(cart).then((res) => {
          console.log(res);
          console.log(res.data._id);
          sessionStorage.setItem("cart-id", res.data._id);
        }).catch((err) => {
          console.log(err);
        });
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: 'Login Successfully!',
          footer: '<a href="/buyerProfile">Go to your profile</a>'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        })
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Please Check Your Email & Password!!',
          footer: 'Your Credentails Are Invalid!!'
        }).then((result) => {
          if (result.isConfirmed) {
          }
        })
      });
  }

  async function addReview(values) {
    const data = {
      buyerFname: sessionStorage.getItem("fname"),
      buyerLname: sessionStorage.getItem("lname"),
      description: values.description,
      rating: rating,
      itemID: itemID,
      buyerID: sessionStorage.getItem("user-id"),
    }

    ReviewService.create(data)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: 'Review Added Successfully!',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        })
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Please Try Again!!',
          footer: 'Something Went Wrong!!'
        }).then((result) => {
          if (result.isConfirmed) {
          }
        })
      });
  }

  function handleAddCart() {
    if (!sessionStorage.getItem('user-type')) {
      Swal.fire(
        'Error',
        'You Need To Login as a Buyer To Add Items To The Cart',
        'error'
      );
      handleShowLoginBuyer();
    }
    else {
      const oneItem = {
        cartID: sessionStorage.getItem("cart-id"),
        itemID: item._id,
        itemName: item.name,
        itembrand: item.brand,
        itemimage: item.image,
        itemPrice: item.price,
        availableQuantity: item.quantity,
      }

      console.log(oneItem);

      CartItemService.create(oneItem)
        .then((res) => {
          console.log(res.data);
          Swal.fire({
            icon: 'success',
            title: 'Successful',
            text: 'Item Added To The Cart Successfully!',
          }).then((result) => {
            if (result.isConfirmed) {
            }
          })
        })
    }
  }

  function handleAddReview() {
    if (!sessionStorage.getItem('user-type')) {
      Swal.fire(
        'Error',
        'You Need To Login as a Buyer To Add Reviews',
        'error'
      );
      handleShowLoginBuyer();
    }
    else {
      handleShowReview();
    }
  }

  function handlePage() {
    window.location.href = `/brands/${item.brand}`;
  }

  return (
    <>
      {/* review add modal */}
      <Modal
        show={showReview}
        onHide={handleCloseReview}
        backdrop="static"
        keyboard={false}
        size="m">
        <Modal.Header closeButton>
          <Modal.Title>Add Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              description: '',
            }}
            validationSchema={reviewSchema}
            onSubmit={values => {
              console.log(values);
              console.log(rating);
              addReview(values);
              handleAddReview();
            }}
          >
            {({ errors, touched }) => (
              <Form>
                {/* description */}
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <Field name="description" type="text" style={{ width: '25rem' }} className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} />
                  <div className="invalid-feedback">{errors.description}</div>
                </div>
                {/* radio button for rating horizontally*/}
                <div className="form-group col-md-10">
                  <label htmlFor="rating">Rating</label>
                  <br />
                  <div className="form-check form-check-inline">
                    <Field className="form-check-input" type="radio" name="rating" id="inlineRadio1" value="1" onClick={() => setRating(1)} checked />
                    <label className="form-check-label" htmlFor="inlineRadio1">1</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <Field className="form-check-input" type="radio" name="rating" id="inlineRadio2" value="2" onClick={() => setRating(2)} />
                    <label className="form-check-label" htmlFor="inlineRadio2">2</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <Field className="form-check-input" type="radio" name="rating" id="inlineRadio3" value="3" onClick={() => setRating(3)} />
                    <label className="form-check-label" htmlFor="inlineRadio3">3</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <Field className="form-check-input" type="radio" name="rating" id="inlineRadio4" value="4" onClick={() => setRating(4)} />
                    <label className="form-check-label" htmlFor="inlineRadio4">4</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <Field className="form-check-input" type="radio" name="rating" id="inlineRadio5" value="5" onClick={() => setRating(5)} />
                    <label className="form-check-label" htmlFor="inlineRadio5">5</label>
                  </div>
                </div>
                <br />
                <div className="form-group col-md-6">
                  <button type="submit" className="btn-primary">Submit</button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>

      {/* buyer login modal */}
      <Modal
        show={showLoginBuyer}
        onHide={handleCloseLoginBuyer}
        backdrop="static"
        keyboard={false}
        size="m">
        <Modal.Header closeButton>
          <Modal.Title>Buyer Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              email: 'notRandula98@gmail.com',
              password: 'QWERTY123',
            }}
            validationSchema={loginSchema}
            onSubmit={values => {
              console.log(values);
              loginBuyer(values);
            }
            }
          >
            {({ errors, touched }) => (
              <Form>
                {/* email */}
                <div className="form-group col-md-6">
                  <label htmlFor="empNo">Buyer Email</label>
                  <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                  <div className="invalid-feedback">{errors.email}</div>
                </div>

                {/* password */}
                <div className="form-group col-md-6">
                  <label htmlFor="empNo">Buyer Password</label>
                  <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                  <div className="invalid-feedback">{errors.password}</div>
                </div>

                <br />
                {/* submit button */}
                <Button type="submit">
                  Submit
                </Button>
              </Form>
            )}

          </Formik>
        </Modal.Body>
      </Modal>

      <br /><br /><br /><br />
      <div className="ItemOneLanding">
        <Row>
          <Col sm={4} className='TopLeft'>
            <Row>
              <img className="itemimg" alt="..." src={item.image} />
            </Row>
            <Row style={{ marginTop: '1rem' }}>
              <h3>{item.brand}</h3>
              <h3>Rs. {item.price}.00</h3>
            </Row>
          </Col>
          <Col sm={8} className='TopRight'>
            <Row style={{ height: '80px', width: '90%', margin: '0px auto' }}>
              <Card>
                <Card.Body style={{ borderRadius: '10rem' }}><h1>{item.name}</h1></Card.Body>
              </Card>
            </Row>
            <Row className="itemDesc">
              <h4>{item.description}</h4>
            </Row>
            <Row className="itemReview">
              <Row style={{ height: '120px' }}>
                {!reviews.length ? (
                  <div className='landing__container' style={{ width: '200%' }}>
                    <Alert variant="success" style={{ margin: '0 auto' }}>
                      <Alert.Heading>No Reviews posted for this item</Alert.Heading>
                    </Alert>
                  </div>
                ) : (
                  <div>
                    <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }}>
                      {reviews.map((review) => (
                        <SwiperSlide style={{ height: '130px' }} key={review._id}>
                          <div className="quoteCard" >
                            <p className="text-center quotesTextParagraph ">{review.description}</p>
                            <p className="owner">- {review.buyerFname} {review.buyerLname}-</p>
                            <p className="owner">Rating - {review.rating}/5</p>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                )}
              </Row>
              <Row>
                <Col className='BottomLeft'><Button variant="primary" onClick={() => handleAddReview()}>Add a Review</Button>{' '}</Col>
              </Row>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col sm={4} className='BottomLeft'>
            <Button variant="primary" onClick={() => handleAddCart()}>Add To Cart</Button>{' '}<br /><br />
            <Button variant="primary" onClick={() => handlePage()}>View Items By This Brand</Button>{' '}
          </Col>
        </Row>
      </div>
    </>
  )
}
