/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { Formik, Form, Field } from 'formik';
import Swal from 'sweetalert2'
import * as Yup from 'yup';
import { storage } from "../../../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import Table from 'react-bootstrap/Table';

import './SellerLanding.css'

import SellerAuth from '../../../../../services/sellerAuth.service';
import CartItemService from '../../../../../services/cartItem.service';

export default function Landing() {

    const update = "https://firebasestorage.googleapis.com/v0/b/beheth-kade-6ds3w9c.appspot.com/o/asserts%2F20943587.jpg?alt=media&token=046cad2b-0e68-478c-b913-7adf12f35169";
    const deleteImage = "https://firebasestorage.googleapis.com/v0/b/beheth-kade-6ds3w9c.appspot.com/o/asserts%2FWavy_Bus-26_Single-11.jpg?alt=media&token=3abd8831-4bef-4558-b230-f8cde15cd869";

    document.body.style.overflow = "visible";

    const [seller, setSeller] = useState({});
    const [cartItems, setCartItems] = useState([]);

    const [imageItem, setImageItem] = useState("");

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


    //seller register validation
    const sellerUpdateSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(5, 'Too Short! Enter More Than 5 Characters')
            .max(50, 'Too Long!')
            .required('Required'),
        lastName: Yup.string()
            .min(5, 'Too Short! Enter More Than 5 Characters')
            .max(50, 'Too Long!')
            .required('Required'),
        contactNo: Yup.string()
            .min(10, 'Too Short!')
            .max(10, 'Too Long!')
            .required('Required'),
        companyName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        companyAddress: Yup.string()
            .min(2, 'Too Short!')
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

    //get seller details
    useEffect(() => {
        SellerAuth.getCurrentUser(sessionStorage.getItem("user-id")).then(
            (response) => {
                setSeller(response.data);
                console.log(seller, 'seller');
            },
            (error) => {
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
            });
    }, []);

    //get cart items
    useEffect(() => {
        CartItemService.getRecentOrdersByBrand(sessionStorage.getItem("brand")).then(
            (response) => {
                setCartItems(response.data);
                console.log(cartItems, 'cartItems');
            },
            (error) => {
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
            });
    }, []);

    // update seller details
    async function updateSeller(id, values) {
        const storageRef = ref(storage, `seller/${v4()}`);

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
                    companyName: values.companyName,
                    companyAddress: values.companyAddress,
                    image: url,
                };

                SellerAuth.updateSeller(id, data)
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
                        SellerAuth.getCurrentUser(sessionStorage.getItem("user-id")).then(
                            (response) => {
                                setSeller(response.data);
                                console.log(seller, 'seller');
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

        SellerAuth.updateSeller(sessionStorage.getItem("user-id"), data)
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

    //delete seller
    async function deleteSeller(id) {
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
                SellerAuth.deleteSeller(id)
                    .then(response => {
                        console.log(response.data);
                        Swal.fire({
                            icon: 'success',
                            title: 'Deleted !!',
                            text: 'This Seller has been Deleted !!',
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
                                    <Card.Title>Delete This Seller Account</Card.Title>
                                    <Button variant="danger" onClick={() => deleteSeller(sessionStorage.getItem("user-id"))}>Delete Account</Button>
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

            {/* Seller Update Modal */}
            <Modal
                show={showUpdateProfile}
                onHide={handleCloseUpdateProfile}
                backdrop="static"
                keyboard={false}
                size="m"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            firstName: seller.firstName,
                            lastName: seller.lastName,
                            contactNo: seller.contactNo,
                            address: seller.address,
                            companyName: seller.companyName,
                            companyAddress: seller.companyAddress,
                        }}
                        validationSchema={sellerUpdateSchema}

                        onSubmit={values => {
                            const id = sessionStorage.getItem("user-id");
                            updateSeller(id, values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                {/* firstName */}
                                <div className="form-group col-md-6">
                                    <label htmlFor="empNo">Seller First Name</label>
                                    <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.firstName}</div>
                                </div>

                                {/* lastName */}
                                <div className="form-group col-md-6">
                                    <label htmlFor="empNo">Seller Last Name</label>
                                    <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.lastName}</div>
                                </div>

                                {/* contactNo */}
                                <div className="form-group col-md-6">
                                    <label htmlFor="empNo">Seller Contact No</label>
                                    <Field name="contactNo" type="text" className={'form-control' + (errors.contactNo && touched.contactNo ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.contactNo}</div>
                                </div>

                                {/* companyName */}
                                <div className="form-group col-md-6">
                                    <label htmlFor="empNo">Seller Company Name</label>
                                    <Field name="companyName" type="text" className={'form-control' + (errors.companyName && touched.companyName ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.companyName}</div>
                                </div>

                                {/* companyAddress */}
                                <div className="form-group col-md-6">
                                    <label htmlFor="empNo">Seller Company Address</label>
                                    <Field name="companyAddress" type="text" className={'form-control' + (errors.companyAddress && touched.companyAddress ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.companyAddress}</div>
                                </div>

                                {/* image upload */}
                                <div className="form-group">
                                    <label htmlFor="image">Image</label>
                                    <Field name="image" type="file" style={{ width: '25rem' }} className={'form-control' + (errors.image && touched.image ? ' is-invalid' : '')} onChange={(e) => setImageItem(e.target.files[0])} />
                                    <div className="invalid-feedback">{errors.image}</div>
                                </div>

                                <br />
                                {/* submit button */}
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        )}

                    </Formik>
                </Modal.Body>
            </Modal>

            <br /><br /><br /><br /><br />
            <div className="Sellerlanding">
                <Row>
                    <Col>
                        <br />
                        <Card className="seller" style={{ width: '30rem' }}>
                            <Card.Img className="sellerimg" variant="top" src={seller.image} />
                            <Card.Body>
                                <Card.Title>{seller.firstName} {seller.lastName}</Card.Title>
                                <Card.Text>
                                    <h6>
                                        {seller.email} - {seller.contactNo}
                                    </h6>
                                    <h6>
                                        {seller.companyName}
                                    </h6>
                                    <h6>
                                        {seller.companyAddress}
                                    </h6>
                                </Card.Text>
                                <p><Button variant="primary" onClick={handleShowUpdateProfile}>Update Profile</Button></p>
                                <p><Button variant="danger" onClick={handleShowDanger}>Security Details</Button></p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col style={{ padding: '10px' }}>

                        <Alert variant='success' className='alertI'>
                            Recently Sold Items From Your Store
                        </Alert>
                        <Table striped bordered hover >
                            <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Item Price</th>
                                    <th>Sold Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!cartItems ? (
                                    <tr>
                                        <td colSpan="6">No Orders</td>
                                    </tr>
                                ) : (
                                    cartItems.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.itemName}</td>
                                            <td>Rs. {item.itemPrice.toFixed(2)}</td>
                                            <td>{item.quantity}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        </>
    )
}
