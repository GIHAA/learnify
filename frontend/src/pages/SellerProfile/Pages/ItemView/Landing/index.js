import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Swal from 'sweetalert2'
import { storage } from "../../../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';


import '../../itemSellerPages.css'

import CategoryService from '../../../../../services/category.service';
import ItemService from '../../../../../services/item.service';

export default function Landing() {

    document.body.style.overflow = "visible";

    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [imageItem, setImageItem] = useState("");

    const [itemID  , setItemID] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");

    const [showItemAdd, setShowItemAdd] = useState(false);

    const handleCloseItemAdd = () => setShowItemAdd(false);
    const handleShowItemAdd = () => setShowItemAdd(true);

    const [showItemEdit, setShowItemEdit] = useState(false);

    const handleCloseItemEdit = () => setShowItemEdit(false);
    const handleShowItemEdit = () => setShowItemEdit(true);

    //item validation
    const ItemSchema = Yup.object().shape({
        name: Yup.string()
            .min(5, 'Too Short!')
            .max(60, 'Too Long!')
            .required('Required'),
        description: Yup.string()
            .min(10, 'Too Short!')
            .max(500, 'Too Long!')
            .required('Required'),
        price: Yup.number()
            .required('Required'),
        quantity: Yup.number()
            .required('Required'),
        //category dropdown
        category: Yup.string()
            .required('Required'),
    });

    //get all categories
    useEffect(() => {
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
    }, []);

    //get all items
    useEffect(() => {
        ItemService.getBySeller(sessionStorage.getItem("user-id")).then(
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

    //add item
    async function addItem(values) {
        const storageRef = ref(storage, `items/${v4()}`);

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

                const item = {
                    name: values.name,
                    description: values.description,
                    price: values.price,
                    quantity: values.quantity,
                    category: values.category,
                    brand: sessionStorage.getItem("brand"),
                    image: url,
                    sellerID: sessionStorage.getItem("user-id")
                };
                console.log(item);

                ItemService.create(item).then((response) => {
                    console.log(response.data);
                    ItemService.getBySeller(sessionStorage.getItem("user-id")).then(
                        (response) => {
                            setItems(response.data);
                            handleCloseItemAdd();
                            Swal.fire(
                                'Success!',
                                'New Item has been added !!',
                                'success'
                            )
                        })
                }).catch((err) => {
                    console.log(err);
                });
            })
    }

    //delete item
    async function deleteItem(id) {
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
                    'This Item has been deleted.',
                    'success'
                )
                ItemService.remove(id).then(
                    (response) => {
                        console.log(response.data);
                        ItemService.getBySeller(sessionStorage.getItem("user-id")).then(
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

    function handleEdit(item) {
        setItemID(item._id);
        setName(item.name);
        setDescription(item.description);
        setPrice(item.price);
        setQuantity(item.quantity);
        setCategory(item.category);
        handleShowItemEdit();
    }

    //edit item
    async function editItem(values) {
        const storageRef = ref(storage, `items/${v4()}`);

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

                const item = {
                    name: values.name,
                    description: values.description,
                    price: values.price,
                    quantity: values.quantity,
                    category: values.category,
                    brand: sessionStorage.getItem("brand"),
                    image: url,
                    sellerID: sessionStorage.getItem("user-id")
                };
                console.log(item);

                ItemService.update(itemID , item).then((response) => {
                    console.log(response.data);
                    ItemService.getBySeller(sessionStorage.getItem("user-id")).then(
                        (response) => {
                            setItems(response.data);
                            handleCloseItemEdit();
                            Swal.fire(
                                'Success!',
                                'Item has been updated !!',
                                'success'
                            )
                        })
                }
                ).catch((err) => {
                    console.log(err);
                }
                );
            })
    }

    return (
        <>
            {/* Edit Item Modal */}
            <Modal
                show={showItemEdit}
                onHide={handleCloseItemEdit}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            name: name,
                            description: description,
                            price: price,
                            quantity: quantity,
                            category: category,
                        }}
                        validationSchema={ItemSchema}
                        onSubmit={(values) => {
                            console.log(values);
                            editItem(values);
                        }}>
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <Field name="name" type="text" style={{ width: '25rem' }} className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.name}</div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <Field name="description" type="text" style={{ width: '25rem' }} className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.description}</div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price">Price</label>
                                    <Field name="price" type="number" style={{ width: '25rem' }} className={'form-control' + (errors.price && touched.price ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.price}</div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="quantity">Quantity</label>
                                    <Field name="quantity" type="number" style={{ width: '25rem' }} className={'form-control' + (errors.quantity && touched.quantity ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.quantity}</div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category">Category</label>
                                    <Field as="select" name="category" style={{ width: '25rem' }} className={'form-control' + (errors.category && touched.category ? ' is-invalid' : '')}>
                                        <option value="" label="Select a category" />
                                        {categories.map((category) => (
                                            <option key={category._id} value={category.id}>{category.name}</option>
                                        ))}
                                    </Field>
                                    <div className="invalid-feedback">{errors.category}</div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="image">Image</label>
                                    <Field name="image" type="file" style={{ width: '25rem' }} className={'form-control' + (errors.image && touched.image ? ' is-invalid' : '')} onChange={(e) => setImageItem(e.target.files[0])} />
                                    <div className="invalid-feedback">{errors.image}</div>
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
                    <Button variant="secondary" onClick={handleCloseItemEdit}>
                        Close
                    </Button>
                </Modal.Footer>

            </Modal>

            {/* Add Item Modal */}
            <Modal
                show={showItemAdd}
                onHide={handleCloseItemAdd}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            name: '',
                            description: '',
                            price: '',
                            quantity: '',
                            category: '',
                            brand: ''
                        }}
                        validationSchema={ItemSchema}
                        onSubmit={(values) => {
                            addItem(values);
                        }}>

                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <Field name="name" type="text" style={{ width: '25rem' }} className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.name}</div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <Field name="description" type="text" style={{ width: '25rem' }} className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.description}</div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price">Price</label>
                                    <Field name="price" type="number" style={{ width: '25rem' }} className={'form-control' + (errors.price && touched.price ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.price}</div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="quantity">Quantity</label>
                                    <Field name="quantity" type="number" style={{ width: '25rem' }} className={'form-control' + (errors.quantity && touched.quantity ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.quantity}</div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category">Category</label>
                                    <Field as="select" name="category" style={{ width: '25rem' }} className={'form-control' + (errors.category && touched.category ? ' is-invalid' : '')}>
                                        <option value="" label="Select a category" />
                                        {categories.map((category) => (
                                            <option key={category._id} value={category.id}>{category.name}</option>
                                        ))}
                                    </Field>
                                    <div className="invalid-feedback">{errors.category}</div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="image">Image</label>
                                    <Field name="image" type="file" style={{ width: '25rem' }} className={'form-control' + (errors.image && touched.image ? ' is-invalid' : '')} onChange={(e) => setImageItem(e.target.files[0])} />
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
                    <Button variant="secondary" onClick={handleCloseItemAdd}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <br /><br /><br /><br /><br />
            <div className='sellerItemRow'>
                <Row>
                    <Col sm={2}>
                        <Button variant="primary" onClick={handleShowItemAdd}>Add New Item</Button>
                    </Col>
                    <Col sm={8}>
                        <Alert key='success' variant='success' className='itemAlert'>
                            All The Items Registered To Your Account/Brand
                        </Alert>
                    </Col>
                </Row>
            </div>

            <div className='sellerItemsPage'>
                {items.map((item) => (
                    <Card style={{ width: '18rem', height: '30rem', marginTop: '1rem' }} className="itemCard">
                        <Card.Img variant="top" style={{ width: '10rem', margin: '0px auto' }} src={item.image} />
                        <Card.Body>
                            <Card.Title style={{ height: '3rem' }}>{item.name}</Card.Title>
                            <Card.Text style={{ height: '1rem' }}>
                                Rs. {item.price}
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>{item.quantity}</ListGroup.Item>
                            <ListGroup.Item>{item.category}</ListGroup.Item>
                            <ListGroup.Item>{item.brand}</ListGroup.Item>
                        </ListGroup>
                        <Card.Body>
                            <Button variant="primary" onClick={() => handleEdit(item)}>Edit</Button>
                            <Button variant="danger" style={{ margin: '5px' }} onClick={() => deleteItem(item._id)}>Delete</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </>
    )
}
