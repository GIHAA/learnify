/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { Formik, Form, Field } from 'formik';
import Swal from 'sweetalert2'
import * as Yup from 'yup';
import { storage } from "../../../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

import './Landing.css'

import AdminAuth from '../../../../../services/adminAuth.service';
import CategoryService from '../../../../../services/category.service'; //2
import ItemService from '../../../../../services/item.service'; //1
import CartService from '../../../../../services/cart.service'; //3
import DeliveryService from '../../../../../services/delivery.service'; //4

export default function Landing() {

    const add = "https://firebasestorage.googleapis.com/v0/b/beheth-kade-6ds3w9c.appspot.com/o/asserts%2F4270272.jpg?alt=media&token=fbdd98a6-040e-4ccd-9b7a-472201ed1dec";
    const update = "https://firebasestorage.googleapis.com/v0/b/beheth-kade-6ds3w9c.appspot.com/o/asserts%2F20943587.jpg?alt=media&token=046cad2b-0e68-478c-b913-7adf12f35169";
    const deleteImage = "https://firebasestorage.googleapis.com/v0/b/beheth-kade-6ds3w9c.appspot.com/o/asserts%2FWavy_Bus-26_Single-11.jpg?alt=media&token=3abd8831-4bef-4558-b230-f8cde15cd869";

    document.body.style.overflow = "visible";

    const [admin, setAdmin] = useState({});
    const [categories, setCategories] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const [deliveries, setDeliveries] = useState([]);
    const [items, setItems] = useState([]);

    const [imageItem, setImageItem] = useState("");

    const [catID, setCatID] = useState("");
    const [catName, setCatName] = useState("");

    const [delID, setDelID] = useState("");
    const [delName, setDelName] = useState("");
    const [delPhone, setDelPhone] = useState("");
    const [delEmail, setDelEmail] = useState("");

    const [showViewCat, setShowViewCat] = useState(false);
    const [showAddCat, setShowAddCat] = useState(false);
    const [showEditCat, setShowEditCat] = useState(false);
    const [showDanger, setShowDanger] = useState(false);
    const [showUpdatePassword, setShowUpdatePassword] = useState(false);
    const [showAddAdmin, setShowAddAdmin] = useState(false);

    const handleCloseViewCat = () => setShowViewCat(false);
    const handleShowViewCat = () => setShowViewCat(true);

    const handleCloseAddCat = () => setShowAddCat(false);
    const handleShowAddCat = () => {
        handleCloseViewCat()
        setShowAddCat(true)
    };

    const handleCloseEditCat = () => setShowEditCat(false);
    const handleShowEditCat = () => {
        handleCloseViewCat()
        setShowEditCat(true)
    };

    const handleCloseDanger = () => setShowDanger(false);
    const handleShowDanger = () => setShowDanger(true);

    const [showCompletedOrders, setShowCompletedOrders] = useState(false);
    const [showViewDels, setShowViewDels] = useState(false);
    const [showAddDels, setShowAddDels] = useState(false);
    const [showEditDels, setShowEditDels] = useState(false);
    const [showUpdateProfile, setShowUpdateProfile] = useState(false);

    const handleCloseCompletedOrders = () => setShowCompletedOrders(false);
    const handleShowCompletedOrders = () => setShowCompletedOrders(true);

    const handleCloseViewDels = () => setShowViewDels(false);
    const handleShowViewDels = () => setShowViewDels(true);

    const handleCloseAddDels = () => setShowAddDels(false);
    const handleShowAddDels = () => {
        handleCloseViewDels();
        setShowAddDels(true);
    }

    const handleCloseEditDels = () => setShowEditDels(false);
    const handleShowEditDels = () => {
        handleCloseViewDels();
        setShowEditDels(true);
    }

    const handleCloseUpdateProfile = () => setShowUpdateProfile(false);
    const handleShowUpdateProfile = () => setShowUpdateProfile(true);

    const handleCloseUpdatePassword = () => setShowUpdatePassword(false);
    const handleShowUpdatePassword = () => {
        handleCloseDanger();
        setShowUpdatePassword(true)
    };

    const handleCloseAddAdmin = () => setShowAddAdmin(false);
    const handleShowAddAdmin = () => {
        handleCloseDanger();
        setShowAddAdmin(true)
    };

    //admin profile update schema
    const UpdateProfileSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        lastName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        contactNo: Yup.string()
            .min(11, 'Too Short!')
            .max(11, 'Too Long!')
            .required('Required'),
    });

    //add admin schema
    const AddAdminSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        lastName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        contactNo: Yup.string()
            .min(11, 'Too Short!')
            .max(11, 'Too Long!')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
        password: Yup.string()
            .min(6, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
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

    //category validation schema
    const CategorySchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
    });

    //delivery validation schema
    const DeliverySchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
        phone: Yup.string()
            .min(10, 'Too Short!')
            .max(10, 'Too Long!')
            .required('Required'),
    });

    //get all deliveries
    useEffect(() => {
        DeliveryService.getAll().then(
            (response) => {
                setDeliveries(response.data);
                console.log(deliveries, 'deliveries');
            },
            (error) => {
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
            });
    }, []);

    //get all completed orders
    useEffect(() => {
        CartService.getByStatus("Completed").then(
            (response) => {
                setCompletedOrders(response.data);
                console.log(completedOrders, 'completedOrders');
            },
            (error) => {
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
            });
    }, []);

    //get admin details
    useEffect(() => {
        AdminAuth.getCurrentUser(sessionStorage.getItem("user-id")).then(
            (response) => {
                setAdmin(response.data);
                console.log(admin, 'admin');
            },
            (error) => {
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
            });
    }, []);

    //get all categories
    useEffect(() => {
        CategoryService.getAll().then(
            (response) => {
                setCategories(response.data);
                console.log(categories, 'categories');
            },
            (error) => {
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
            });
    }, []);

    //get all completed orders
    useEffect(() => {
        CartService.getByStatus("Delivered").then(
            (response) => {
                setCompletedOrders(response.data);
                console.log(completedOrders, 'completedOrders');
            },
            (error) => {
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
            });
    }, []);

    //get all items
    useEffect(() => {
        ItemService.getAll().then(
            (response) => {
                setItems(response.data);
                console.log(items, 'items');
            },
            (error) => {
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
            });
    }, []);

    //add admin profile
    async function addAdmin(values) {

        const storageRef = ref(storage, `admin/${v4()}`);

        await uploadBytes(storageRef, imageItem)
            .then(() => {
                console.log("uploaded");
            })
            .catch((err) => {
                console.log(err);
            });

        await getDownloadURL(storageRef)
            .then((url) => {
                const data = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    contactNo: values.contactNo,
                    email: values.email,
                    password: values.password,
                    image: url,
                };

                AdminAuth.register(data)
                    .then(response => {
                        console.log(response.data);
                        Swal.fire({
                            icon: 'success',
                            title: 'Success !!',
                            text: 'New Admin has been added !!',
                            footer: 'New Admin Can Login Using The Given Credentials'
                        })
                        handleCloseAddAdmin();
                        AdminAuth.getCurrentUser(sessionStorage.getItem("user-id")).then(
                            (response) => {
                                setAdmin(response.data);
                                console.log(admin, 'admin');
                            },
                            (error) => {
                                (error.response &&
                                    error.response.data &&
                                    error.response.data.message) ||
                                    error.message ||
                                    error.toString();
                            });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //update admin profile
    async function updateProfile(values) {

        const storageRef = ref(storage, `admin/${v4()}`);

        await uploadBytes(storageRef, imageItem)
            .then(() => {
                console.log("uploaded");
            })
            .catch((err) => {
                console.log(err);
            });

        await getDownloadURL(storageRef)
            .then((url) => {
                const data = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    contactNo: values.contactNo,
                    image: url,
                };

                AdminAuth.update(sessionStorage.getItem("user-id"), data)
                    .then(response => {
                        console.log(response.data);
                        Swal.fire(
                            'Success!',
                            'Profile has been updated !!',
                            'success'
                        )
                        handleCloseUpdateProfile();
                        AdminAuth.getCurrentUser(sessionStorage.getItem("user-id")).then(
                            (response) => {
                                setAdmin(response.data);
                                console.log(admin, 'admin');
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
    }

    //update admin password
    async function updatePassword(values) {
        const data = {
            password: values.password,
        };

        AdminAuth.update(sessionStorage.getItem("user-id"), data)
            .then(response => {
                console.log(response.data);
                Swal.fire(
                    'Success!',
                    'Password has been updated !!',
                    'success'
                )
                handleCloseUpdatePassword();
            })
            .catch(e => {
                console.log(e);
            });
    }

    //delete admin profile
    async function deleteAccount(id) {
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
                AdminAuth.remove(id)
                    .then(response => {
                        console.log(response.data);
                        Swal.fire({
                            icon: 'success',
                            title: 'Deleted !!',
                            text: 'This Admin has been Deleted !!',
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

    //add new category
    async function addCategory(values) {
        const storageRef = ref(storage, `category/${v4()}`);

        await uploadBytes(storageRef, imageItem)
            .then(() => {
                console.log("uploaded");
            })
            .catch((err) => {
                console.log(err);
            });

        await getDownloadURL(storageRef)
            .then((url) => {
                const data = {
                    name: values.name,
                    image: url,
                };

                CategoryService.create(data)
                    .then(response => {
                        console.log(response.data);
                        Swal.fire({
                            icon: 'success',
                            title: 'Success !!',
                            text: 'New Category has been added !!',
                            footer: 'New Category Can Be Added To Products'
                        })
                        handleCloseAddCat();
                        CategoryService.getAll().then(
                            (response) => {
                                setCategories(response.data);
                            },
                            (error) => {
                                (error.response &&
                                    error.response.data &&
                                    error.response.data.message) ||
                                    error.message ||
                                    error.toString();
                            });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
    }

    async function handleUpdateCategory(values) {
        setCatID(values._id);
        setCatName(values.name);
        handleShowEditCat();
    }

    //update category
    async function updateCategory(values, catID) {
        const storageRef = ref(storage, `category/${v4()}`);

        await uploadBytes(storageRef, imageItem)
            .then(() => {
                console.log("uploaded");
            })
            .catch((err) => {
                console.log(err);
            });

        await getDownloadURL(storageRef)
            .then((url) => {
                const data = {
                    name: values.name,
                    image: url,
                };

                CategoryService.update(catID, data)
                    .then(response => {
                        console.log(response.data);
                        Swal.fire({
                            icon: 'success',
                            title: 'Success !!',
                            text: 'Category has been updated !!',
                            footer: 'Category Can Be Updated In Products'
                        })
                        handleCloseEditCat();
                        CategoryService.getAll().then(
                            (response) => {
                                setCategories(response.data);
                            },
                            (error) => {
                                (error.response &&
                                    error.response.data &&
                                    error.response.data.message) ||
                                    error.message ||
                                    error.toString();
                            });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
    }

    //delete category
    async function deleteCategory(id) {
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
                Swal.fire(
                    'Deleted!',
                    'This Brand has been deleted.',
                    'success'
                )
                CategoryService.remove(id).then(
                    (response) => {
                        console.log(response.data);
                        CategoryService.getAll().then(
                            (response) => {
                                setCategories(response.data);
                            },
                            (error) => {
                                (error.response &&
                                    error.response.data &&
                                    error.response.data.message) ||
                                    error.message ||
                                    error.toString();
                            });
                    },
                    (error) => {
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                            error.message ||
                            error.toString();
                    });
            }
        })
    }

    //add new delivery partner
    async function addDelivery(values) {
        const data = {
            name: values.name,
            email: values.email,
            phone: values.phone,
        };

        DeliveryService.create(data)
            .then(response => {
                console.log(response.data);
                Swal.fire(
                    'Success!',
                    'New Delivery Partner has been added !!',
                    'success'
                )
                handleCloseAddDels();
                handleShowViewDels();
                DeliveryService.getAll().then(
                    (response) => {
                        setDeliveries(response.data);
                        console.log(deliveries, 'deliveries');
                    },
                    (error) => {
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                            error.message ||
                            error.toString();
                    });
            })
            .catch(e => {
                console.log(e);
            });
    }

    async function handleUpdateDelivery(values) {
        setDelID(values._id);
        setDelName(values.name);
        setDelEmail(values.email);
        setDelPhone(values.phone);
        handleShowEditDels();
    }

    //update delivery partner
    async function updateDelivery(values, delID) {
        const data = {
            name: values.name,
            email: values.email,
            phone: values.phone,
        };

        DeliveryService.update(delID, data)
            .then(response => {
                console.log(response.data);
                Swal.fire(
                    'Success!',
                    'Delivery Partner has been updated !!',
                    'success'
                )
                handleCloseEditDels();
                handleShowViewDels();
                DeliveryService.getAll().then(
                    (response) => {
                        setDeliveries(response.data);
                        console.log(deliveries, 'deliveries');
                    },
                    (error) => {
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                            error.message ||
                            error.toString();
                    });
            })
            .catch(e => {
                console.log(e);
            });
    }

    //delete delivery partner
    async function deleteDelivery(id) {
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
                Swal.fire(
                    'Deleted!',
                    'This Delivery Partner has been deleted.',
                    'success'
                )
                DeliveryService.remove(id).then(
                    (response) => {
                        console.log(response.data);
                        DeliveryService.getAll().then(
                            (response) => {
                                setDeliveries(response.data);
                            },
                            (error) => {
                                (error.response &&
                                    error.response.data &&
                                    error.response.data.message) ||
                                    error.message ||
                                    error.toString();
                            });
                    },
                    (error) => {
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                            error.message ||
                            error.toString();
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
                size="xl"
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
                                <Card.Img variant="top" src={add} />
                                <Card.Body>
                                    <Card.Title>Add New Admin</Card.Title>
                                    <Button variant="success" onClick={handleShowAddAdmin}>Add New Admin</Button>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={deleteImage} />
                                <Card.Body>
                                    <Card.Title>Delete This Admin Account</Card.Title>
                                    <Button variant="danger" onClick={() => deleteAccount(sessionStorage.getItem("user-id"))}>Delete Account</Button>
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

            {/* add admin modal */}
            <Modal
                show={showAddAdmin}
                onHide={handleCloseAddAdmin}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Admin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            contactNo: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                        }}
                        validationSchema={AddAdminSchema}
                        onSubmit={(values) => {
                            addAdmin(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                {/* firstName */}
                                <div className="form-group col-md-6">
                                    <label htmlFor="firstName">First Name</label>
                                    <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.firstName}</div>
                                </div>

                                {/* lastName */}
                                <div className="form-group col-md-6">
                                    <label htmlFor="lastName">Last Name</label>
                                    <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.lastName}</div>
                                </div>

                                {/* contactNo */}
                                <div className="form-group col-md-6">
                                    <label htmlFor="contactNo">Contact No</label>
                                    <Field name="contactNo" type="text" className={'form-control' + (errors.contactNo && touched.contactNo ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.contactNo}</div>
                                </div>

                                {/* email */}
                                <div className="form-group col-md-6">
                                    <label htmlFor="email">Email</label>
                                    <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.email}</div>
                                </div>

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

                                {/* image */}
                                <div className="form-group col-md-6">
                                    <label htmlFor="image">Image</label>
                                    <Field name="image" type="file" className={'form-control' + (errors.image && touched.image ? ' is-invalid' : '')} onChange={(e) => setImageItem(e.target.files[0])} />
                                    <div className="invalid-feedback">{errors.image}</div>
                                </div>

                                <br />
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary mr-2">Add Admin</button>
                                </div>

                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddAdmin}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Profile Modal */}
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
                            firstName: admin.firstName,
                            lastName: admin.lastName,
                            contactNo: admin.contactNo,
                        }}
                        validationSchema={UpdateProfileSchema}

                        onSubmit={(values) => {
                            updateProfile(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                {/* firstName */}
                                <div className="form-group col-md-6">
                                    <label htmlFor="empNo">First Name</label>
                                    <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.firstName}</div>
                                </div>

                                {/* lastName */}
                                <div className="form-group col-md-6">
                                    <label htmlFor="empNo">Last Name</label>
                                    <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.lastName}</div>
                                </div>

                                {/* contactNo */}
                                <div className="form-group col-md-6">
                                    <label htmlFor="empNo">Contact No</label>
                                    <Field name="contactNo" type="text" className={'form-control' + (errors.contactNo && touched.contactNo ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.contactNo}</div>
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="image">Image</label>
                                    <Field name="image" type="file" className={'form-control' + (errors.image && touched.image ? ' is-invalid' : '')} onChange={(e) => setImageItem(e.target.files[0])} />
                                    <div className="invalid-feedback">{errors.image}</div>
                                </div>

                                <br />
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary mr-2">Submit</button>
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

            {/* Add Delivery Partners Modal */}
            <Modal
                show={showAddDels}
                onHide={handleCloseAddDels}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Delivery Partner</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            phone: '',
                        }}
                        validationSchema={DeliverySchema}
                        onSubmit={(values) => {
                            addDelivery(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="name"> Name</label>
                                    <Field name="name" style={{ width: '25rem' }} type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.name}</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email"> Email</label>
                                    <Field name="email" style={{ width: '25rem' }} type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.email}</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <Field name="phone" style={{ width: '25rem' }} type="text" className={'form-control' + (errors.phone && touched.phone ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.phone}</div>
                                </div>

                                <br />
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary mr-2">Add</button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddDels}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* View Delivery Partners Modal */}
            <Modal
                show={showViewDels}
                onHide={handleCloseViewDels}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>All Delivery Partners Registred in the System</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><Button variant="primary" onClick={handleShowAddDels}>Add New Delivery Partners </Button></p>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deliveries.map((delivery) => (
                                <tr>
                                    <td>{delivery.name}</td>
                                    <td>{delivery.email}</td>
                                    <td>{delivery.phone}</td>
                                    <td>
                                        <Button variant="success" onClick={() => handleUpdateDelivery(delivery)}>Edit</Button>{' '}
                                        <Button variant="danger" onClick={() => deleteDelivery(delivery._id)}>Delete</Button>{' '}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseViewDels}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Update Delivery Partners Modal */}
            <Modal
                show={showEditDels}
                onHide={handleCloseEditDels}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update Delivery Partner</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            name: delName,
                            email: delEmail,
                            phone: delPhone,
                        }}
                        validationSchema={DeliverySchema}
                        onSubmit={(values) => {
                            updateDelivery(values, delID);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="name"> Name</label>
                                    <Field name="name" style={{ width: '25rem' }} type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.name}</div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email"> Email</label>
                                    <Field name="email" style={{ width: '25rem' }} type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.email}</div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <Field name="phone" style={{ width: '25rem' }} type="text" className={'form-control' + (errors.phone && touched.phone ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.phone}</div>
                                </div>

                                <br />

                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary mr-2">Update</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditDels}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Completed order View Modal */}
            <Modal
                show={showCompletedOrders}
                onHide={handleCloseCompletedOrders}
                backdrop="static"
                keyboard={false}
                size={"lg"}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Completed Orders</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Order Price</th>
                                <th>Completed Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!completedOrders ? (
                                <tr>
                                    <td colSpan="3" className="text-center">
                                        <div className="spinner-border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                completedOrders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order.buyerfname} {order.buyerlname}</td>
                                        <td>Rs. {order.totalPrice.toFixed(2)}</td>
                                        <td>{new Date(order.updatedOn).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            )}

                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCompletedOrders}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Add Category Modal */}
            <Modal
                show={showAddCat}
                onHide={handleCloseAddCat}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            name: '',
                        }}
                        validationSchema={CategorySchema}
                        onSubmit={(values) => {
                            addCategory(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-group col-md-6">
                                    <label htmlFor="name">Category Name</label>
                                    <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.name}</div>
                                </div>
                                {/* image */}
                                <div className="form-group col-md-6">
                                    <label htmlFor="image">Image</label>
                                    <Field name="image" type="file" className={'form-control' + (errors.image && touched.image ? ' is-invalid' : '')} onChange={(e) => setImageItem(e.target.files[0])} />
                                    <div className="invalid-feedback">{errors.image}</div>
                                </div>
                                <br />
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary mr-2">Add Category</button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddCat}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Category Modal */}
            <Modal
                show={showEditCat}
                onHide={handleCloseEditCat}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            name: catName,
                        }}
                        validationSchema={CategorySchema}
                        onSubmit={(values) => {
                            updateCategory(values, catID);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-group col-md-6">
                                    <label htmlFor="name">Category Name</label>
                                    <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.name}</div>
                                </div>
                                {/* image */}
                                <div className="form-group col-md-6">
                                    <label htmlFor="image">Image</label>
                                    <Field name="image" type="file" className={'form-control' + (errors.image && touched.image ? ' is-invalid' : '')} onChange={(e) => setImageItem(e.target.files[0])} />
                                    <div className="invalid-feedback">{errors.image}</div>
                                </div>
                                <br />
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary mr-2">Edit Category</button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditCat}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Category View Modal */}
            <Modal
                show={showViewCat}
                onHide={handleCloseViewCat}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>View Categories</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><Button variant="primary" onClick={handleShowAddCat}>Add New Category</Button></p>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Category Name</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr>
                                    <td>{category.name}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => {
                                            Swal.fire({
                                                imageUrl: category.image,
                                                imageHeight: 200,
                                                imageAlt: 'No Image Found'
                                            })
                                        }}>View</Button>{' '}
                                    </td>
                                    <td>
                                        <Button variant="success" onClick={() => handleUpdateCategory(category)}>Edit</Button>{' '}
                                        <Button variant="danger" onClick={() => deleteCategory(category._id)}>Delete</Button>{' '}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseViewCat}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Base Div */}
            <div>
                <br /><br /><br /><br /><br />
                <div className='landing'>
                    <Row>
                        <Col>
                            <br />
                            <Card className="profile" style={{ width: '30rem' }}>
                                <Card.Img className="profileimg" variant="top" src={admin.image} />
                                <Card.Body>
                                    <Card.Title>{admin.firstName} {admin.lastName}</Card.Title>
                                    <Card.Text>
                                        <h6>
                                            {admin.email}
                                        </h6>
                                        <h6>
                                            {admin.contactNo}
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
                                        <h4>Number of Items in the system</h4>
                                        <h1>{items.length}</h1>
                                        <p><a href="/adminProfile/items"><Button variant="primary">Manage Items</Button></a></p>
                                    </div>
                                </Col>
                                <Col>
                                    <div className='box'>
                                        <h4>Number of Categories in the system</h4>
                                        <h1>{categories.length}</h1>
                                        <p><Button variant="primary" onClick={handleShowViewCat}>Manage Categories</Button></p>
                                    </div>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <div className='box'>
                                        <h4>Number of Completed Orders in the system</h4>
                                        <h1>{completedOrders.length}</h1>
                                        <p><Button variant="primary" onClick={handleShowCompletedOrders}>Completed Orders</Button></p>
                                    </div>
                                </Col>
                                <Col>
                                    <div className='box'>
                                        <h4>Number of Delivery Partners in the system</h4>
                                        <h1>{deliveries.length}</h1>
                                        <p><Button variant="primary" onClick={handleShowViewDels}>Manage Delivery Partners</Button></p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}
