import React, { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

import './buyerProfile.css'

import BuyerAuth from "../../../services/buyerAuth.service";
import CartService from "../../../services/cart.service";
import ReviewService from '../../../services/review.service';
import CartItemService from '../../../services/cartItem.service'
import ItemService from '../../../services/item.service'

export default function Home() {

    const update = "https://firebasestorage.googleapis.com/v0/b/beheth-kade-6ds3w9c.appspot.com/o/asserts%2F20943587.jpg?alt=media&token=046cad2b-0e68-478c-b913-7adf12f35169";
    const deleteImage = "https://firebasestorage.googleapis.com/v0/b/beheth-kade-6ds3w9c.appspot.com/o/asserts%2FWavy_Bus-26_Single-11.jpg?alt=media&token=3abd8831-4bef-4558-b230-f8cde15cd869";

    document.body.style.overflow = "visible";

    const [buyer, setBuyer] = useState({});
    const [onGoingCarts, setOnGoingCarts] = useState([]);
    const [deliveredCarts, setDelivered] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [item, setItem] = useState({});

    const [imageItem, setImageItem] = useState("");

    const [showOnGoingCarts, setShowOnGoingCarts] = useState(false);
    const handleCloseOnGoingCarts = () => setShowOnGoingCarts(false);
    const handleShowOnGoingCarts = () => setShowOnGoingCarts(true);

    const [showDelivered, setShowDelivered] = useState(false);
    const handleCloseDelivered = () => setShowDelivered(false);
    const handleShowDelivered = () => setShowDelivered(true);

    const [showReviews, setShowReviews] = useState(false);
    const handleCloseReviews = () => setShowReviews(false);
    const handleShowReviews = () => setShowReviews(true);

    const [showCartItems, setShowCartItems] = useState(false);
    const handleCloseCartItems = () => setShowCartItems(false);
    const handleShowCartItems = () => setShowCartItems(true);

    const [showItem, setShowItem] = useState(false);
    const handleCloseShowItem = () => setShowItem(false);
    const handleShowShowItem = () => setShowItem(true);

    const [showUpdateProfile, setShowUpdateProfile] = useState(false);
    const [showDanger, setShowDanger] = useState(false);
    const [showUpdatePassword, setShowUpdatePassword] = useState(false);

    const handleCloseUpdateProfile = () => setShowUpdateProfile(false);
    const handleShowUpdateProfile = () => setShowUpdateProfile(true);

    const handleCloseDanger = () => setShowDanger(false);
    const handleShowDanger = () => setShowDanger(true);

    const handleCloseUpdatePassword = () => setShowUpdatePassword(false);
    const handleShowUpdatePassword = () => {
        handleCloseDanger();
        setShowUpdatePassword(true)
    };

    //buyer register validation
    const buyerUpdateSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(5, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        lastName: Yup.string()
            .min(5, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        contactNo: Yup.string()
            .min(11, 'Too Short!')
            .max(11, 'Too Long!')
            .required('Required'),
        address: Yup.string()
            .min(5, 'Too Short!')
            .max(100, 'Too Long!')
            .required('Required'),
    });

    //password update schema
    const UpdatePasswordSchema = Yup.object().shape({
        password: Yup.string()
            .min(8, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Required'),
    });

    //get reviews posted by buyer
    useEffect(() => {
        ReviewService.getByUserID(sessionStorage.getItem("user-id")).then(
            (response) => {
                setReviews(response.data);
                console.log(reviews, 'reviews');
            },
            (error) => {
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
            });
    }, []);

    //get ongoing carts
    useEffect(() => {
        CartService.getByBuyerIDAndNotDelivered(sessionStorage.getItem("user-id")).then(
            (response) => {
                setOnGoingCarts(response.data);
                console.log(onGoingCarts, 'ongoing');
            },
            (error) => {
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
            });
    }, []);

    //get delivered carts
    useEffect(() => {
        CartService.getByBuyerIDAndDelivered(sessionStorage.getItem("user-id")).then(
            (response) => {
                setDelivered(response.data);
                console.log(deliveredCarts, 'delivered');
            },
            (error) => {
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
            });
    }, []);

    //get buyer details
    useEffect(() => {
        BuyerAuth.getCurrentUser(sessionStorage.getItem("user-id")).then(
            (response) => {
                setBuyer(response.data);
                console.log(buyer, 'buyer');
            },
            (error) => {
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
            });
    }, []);

    // update buyer details
    async function updateBuyer(id, values) {
        const storageRef = ref(storage, `buyer/${v4()}`);

        await uploadBytes(storageRef, imageItem)
            .then(() => {
                console.log("uploaded");
            })
            .catch((err) => {
                console.log(err);
            });

        await getDownloadURL(storageRef)
            .then((url) => {
                console.log(url);

                const data = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    contactNo: values.contactNo,
                    address: values.address,
                    image: url,
                };

                BuyerAuth.updateBuyer(id, data)
                    .then((response) => {
                        console.log(response.data);
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Profile Updated Successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        handleCloseUpdateProfile();
                        BuyerAuth.getCurrentUser(sessionStorage.getItem("user-id")).then(
                            (response) => {
                                setBuyer(response.data);
                                console.log(buyer, 'buyer');
                            },
                            (error) => {
                                (error.response &&
                                    error.response.data &&
                                    error.response.data.message) ||
                                    error.message ||
                                    error.toString();
                            });
                    })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //update password
    async function updatePassword(values) {
        const data = {
            password: values.password,
        };

        BuyerAuth.updateBuyer(sessionStorage.getItem("user-id"), data)
            .then((response) => {
                console.log(response.data);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Password Updated Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                handleCloseUpdatePassword();
            })
    }

    //delete buyer
    async function deleteBuyer(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                BuyerAuth.deleteBuyer(id)
                    .then(response => {
                        console.log(response.data);
                        Swal.fire({
                            icon: 'success',
                            title: 'Deleted !!',
                            text: 'This Buyer has been Deleted !!',
                            footer: 'You will be redirected to the Home Page'
                        })
                            .then(() => {
                                sessionStorage.clear();
                                window.location.href = "/";
                            })
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        })
    }

    //detele cart
    async function deleteCart(cartId) {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to Cancel the order?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Cancel Order!',
            cancelButtonText: 'No!',
        }).then((result) => {
            if (result.isConfirmed) {
                CartService.remove(cartId).then(
                    (response) => {
                        console.log(response.data);
                    },
                    (error) => {
                        console.log(error);
                    }
                );

                Swal.fire(
                    'Cancelled!',
                    'This Order has been Cancelled !!.',
                    'success'
                ).then(() => {
                    CartService.getByBuyerIDAndNotDelivered(sessionStorage.getItem("user-id")).then(
                        (response) => {
                            setOnGoingCarts(response.data);
                            console.log(onGoingCarts, 'ongoing');
                        },
                        (error) => {
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                                error.message ||
                                error.toString();
                        });
                })
            }
        })
    }

    //view review description
    async function viewDescription(text) {
        Swal.fire({
            title: 'Review Description',
            text: text,
            icon: 'info',
            confirmButtonText: 'Ok',
        })
    }

    //delete review
    async function deleteReview(reviewId) {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete this review?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Delete!',
            cancelButtonText: 'No!',
        }).then((result) => {
            if (result.isConfirmed) {
                ReviewService.remove(reviewId).then(
                    (response) => {
                        console.log(response.data);
                    },
                    (error) => {
                        console.log(error);
                    }
                );

                Swal.fire(
                    'Deleted!',
                    'This review has been deleted.',
                    'success'
                ).then(() => {
                    ReviewService.getByUserID(sessionStorage.getItem("user-id")).then(
                        (response) => {
                            setReviews(response.data);
                            console.log(reviews, 'reviews');
                        },
                        (error) => {
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                                error.message ||
                                error.toString();
                        });
                })
            }
        })
    }

    //view Item
    async function viewItem(itemId) {
        //get item details
        ItemService.get(itemId).then(
            (response) => {
                setItem(response.data);
                console.log(item, 'item');
                handleShowShowItem();
            }
        );
    }

    async function viewCartItems(cartId) {
        CartItemService.getByCartID(cartId).then(
            (response) => {
                setCartItems(response.data);
                console.log(cartItems, 'cartItems');
                handleShowCartItems();
            },
            (error) => {
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
            });
    }


    return (
        <>
            {/* Danger select modal */}
            <Modal
                show={showDanger}
                onHide={handleCloseDanger}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Security Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={update} />
                                <Card.Body>
                                    <Card.Title>Update Password</Card.Title>
                                    <Button variant="danger" onClick={handleShowUpdatePassword}>Update Password</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={deleteImage} />
                                <Card.Body>
                                    <Card.Title>Delete This Buyer Account</Card.Title>
                                    <Button variant="danger" onClick={() => deleteBuyer(sessionStorage.getItem("user-id"))}>Delete Account</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDanger}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* password update modal */}
            <Modal
                show={showUpdatePassword}
                onHide={handleCloseUpdatePassword}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            password: '',
                            confirmPassword: '',
                        }}
                        validationSchema={UpdatePasswordSchema}
                        onSubmit={(values) => {
                            updatePassword(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                {/* password */}
                                <div className="form-group col-md-6">
                                    <label htmlFor="password">Password</label>
                                    <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.password}</div>
                                </div>

                                {/* confirm password */}
                                <div className="form-group col-md-6">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.confirmPassword}</div>
                                </div>

                                <br />
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary mr-2">Update Password</button>
                                </div>

                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUpdatePassword}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Buyer Profile Update Modal*/}
            <Modal
                show={showUpdateProfile}
                onHide={handleCloseUpdateProfile}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            firstName: buyer.firstName,
                            lastName: buyer.lastName,
                            contactNo: buyer.contactNo,
                            address: buyer.address,
                        }}
                        validationSchema={buyerUpdateSchema}
                        onSubmit={(values) => {
                            updateBuyer(sessionStorage.getItem("user-id"), values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                {/* first name */}
                                <div className="form-group col-md-6">
                                    <label htmlFor="firstName">First Name</label>
                                    <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.firstName}</div>
                                </div>

                                {/* last name */}
                                <div className="form-group col-md-6">
                                    <label htmlFor="lastName">Last Name</label>
                                    <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.lastName}</div>
                                </div>

                                {/* contact no */}
                                <div className="form-group col-md-6">
                                    <label htmlFor="contactNo">Contact No</label>
                                    <Field name="contactNo" type="text" className={'form-control' + (errors.contactNo && touched.contactNo ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.contactNo}</div>
                                </div>


                                {/* address */}
                                <div className="form-group col-md-6">
                                    <label htmlFor="address">Address</label>
                                    <Field name="address" type="text" className={'form-control' + (errors.address && touched.address ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.address}</div>
                                </div>

                                {/* image upload */}
                                <div className="form-group">
                                    <label htmlFor="image">Image</label>
                                    <Field name="image" type="file" style={{ width: '25rem' }} className={'form-control' + (errors.image && touched.image ? ' is-invalid' : '')} onChange={(e) => setImageItem(e.target.files[0])} />
                                    <div className="invalid-feedback">{errors.image}</div>
                                </div>

                                <br />
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary mr-2">Update Profile</button>
                                </div>

                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUpdateProfile}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Show Item Modal */}
            <Modal
                show={showItem}
                onHide={handleCloseShowItem}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{item.brand} {item.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col> <img className="itemimgprofile" alt="..." src={item.image} /></Col>
                        <Col>
                            <h3>{item.brand}</h3>
                            <h3>{item.name}</h3>
                            <h3>Rs. {item.price}.00</h3>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseShowItem}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* show cart items */}
            <Modal
                show={showCartItems}
                onHide={handleCloseCartItems}
                backdrop="static"
                keyboard={false}
                size="xl"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Cart Items</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Brand</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((cartItem) => (
                                <tr>
                                    <td><img src={cartItem.itemimage} alt='...' style={{ height: '100px', width: '100px' }} /></td>
                                    <td>{cartItem.itembrand}</td>
                                    <td>{cartItem.itemName}</td>
                                    <td>{cartItem.quantity}</td>
                                    <td>Rs. {cartItem.quantity * cartItem.itemPrice}.00</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCartItems}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Ongoing Order View Modal */}
            <Modal
                show={showOnGoingCarts}
                onHide={handleCloseOnGoingCarts}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Ongoing Orders</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th style={{ width: '20%' }}>Placed Date</th>
                                <th style={{ width: '20%' }}>Order Status</th>
                                <th style={{ width: '20%' }}>Total Price</th>
                                <th style={{ width: '20%' }} >View Order</th>
                                <th style={{ width: '20%' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!onGoingCarts.length ? (
                                <td colSpan='5' style={{ textAlign: 'center' }}>
                                    No Orders
                                </td>
                            ) : (
                                onGoingCarts.map((order) => (
                                    <tr key={order._id}>
                                        <td>
                                            {new Date(order.createdOn).toLocaleDateString()}
                                        </td>
                                        <td>
                                            {order.status}
                                        </td>
                                        <td>Rs. {order.totalPrice.toFixed(2)}</td>
                                        <td>
                                            <Button variant='success' onClick={() => viewCartItems(order._id)}>View Order</Button>
                                        </td>
                                        <td>
                                            <Button variant='danger' onClick={() => deleteCart(order._id)}>Cancel</Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseOnGoingCarts}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Completed Order View Modal */}
            <Modal
                show={showDelivered}
                onHide={handleCloseDelivered}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Completed Orders</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th style={{ width: '20%' }}>Completed Date</th>
                                <th style={{ width: '20%' }}>Order Status</th>
                                <th style={{ width: '20%' }}>Total Price</th>
                                <th style={{ width: '20%' }} >View Order</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!deliveredCarts.length ? (
                                <td colSpan='5' style={{ textAlign: 'center' }}>
                                    No Orders
                                </td>
                            ) : (
                                deliveredCarts.map((order) => (
                                    <tr key={order._id}>
                                        <td>
                                            {new Date(order.placedDate).toLocaleDateString()}
                                        </td>
                                        <td>
                                            {order.status}
                                        </td>
                                        <td>Rs. {order.totalPrice.toFixed(2)}</td>
                                        <td>
                                            <Button variant='success' onClick={() => viewCartItems(order._id)}>View Order</Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelivered}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>

            {/* Reviews View Modal */}
            <Modal
                show={showReviews}
                onHide={handleCloseReviews}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Reviews Posted</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th style={{ width: '20%' }}>Posted Date</th>
                                <th style={{ width: '20%' }}>View Item</th>
                                <th style={{ width: '20%' }}>View Description</th>
                                <th style={{ width: '20%' }}>Rating</th>
                                <th style={{ width: '20%' }}>Delete Review</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!reviews.length ? (
                                <td colSpan='5' style={{ textAlign: 'center' }}>
                                    No Reviews Posted
                                </td>
                            ) : (
                                reviews.map((review) => (
                                    <tr key={review._id}>
                                        <td>
                                            {new Date(review.createdOn).toLocaleDateString()}
                                        </td>
                                        <td>
                                            <Button variant="primary" onClick={() => viewItem(review.itemID)}>View Item</Button>{' '}
                                        </td>
                                        <td>
                                            <Button variant="info" onClick={() => viewDescription(review.description)}>View Details</Button>{' '}
                                        </td>
                                        <td>
                                            {review.rating}/5
                                        </td>
                                        <td>
                                            <Button variant="danger" onClick={() => deleteReview(review._id)}>Delete</Button>{' '}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseReviews}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <br /><br /><br /><br /><br />
            <div className="Buyerlanding">
                <Row>
                    <Col>
                        <br />
                        <Card className="seller" style={{ width: '30rem' }}>
                            <Card.Img className="sellerimg" variant="top" src={buyer.image} />
                            <Card.Body>
                                <Card.Title>{buyer.firstName} {buyer.lastName}</Card.Title>
                                <Card.Text>
                                    <h6>
                                        {buyer.email} - {buyer.contactNo}
                                    </h6>
                                    <h6>
                                        {buyer.address}
                                    </h6>
                                    <h6>
                                        {buyer.companyAddress}
                                    </h6>
                                </Card.Text>
                                <p><Button variant="primary" onClick={handleShowUpdateProfile}>Update Profile</Button></p>
                                <p><Button variant="danger" onClick={handleShowDanger}>Security Details</Button></p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <div className='box'>
                                    <h4>Number of Ongoing Orders</h4>
                                    <h1>{onGoingCarts.length}</h1>
                                    <p><Button variant="primary" onClick={handleShowOnGoingCarts}>View Orders</Button></p>
                                </div>
                            </Col>
                            <Col>
                                <div className='box'>
                                    <h4>Number of Completed Orders</h4>
                                    <h1>{deliveredCarts.length}</h1>
                                    <p><Button variant="primary" onClick={handleShowDelivered}>View Orders</Button></p>
                                </div>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <div className='box'>
                                    <h4>Number of Reviews Posted</h4>
                                    <h1>{reviews.length}</h1>
                                    <p><Button variant="primary" onClick={handleShowReviews}>View Posted Reviews</Button></p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </>
    )
}
