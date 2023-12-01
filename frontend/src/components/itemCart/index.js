import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2'
import '../../styles/sudul/itemCart.css';

import cartItemService from '../../services/cartItem.service';

function ItemCart() {

    document.body.style.overflow = "visible";

    const userType = sessionStorage.getItem("user-type");
    const cartID = sessionStorage.getItem("cart-id");

    const [show, setShow] = useState(false);

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        cartItemService.getByCartID(cartID).then((res) => {
            setCartItems(res.data);
        });

    }, []);

    let subtotal = 0
    for (let i = 0; i < cartItems.length; i++) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        subtotal += cartItems[i].quantity * cartItems[i].itemPrice;
    }

    let tax = subtotal * 0.12;
    let deliver = 300;
    let total = subtotal + tax + deliver;

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
        cartItemService.getByCartID(cartID).then((res) => {
            setCartItems(res.data);
        });
    };

    async function handleQuantity(id, quantity) {
        const data = {
            quantity: quantity
        }

        await cartItemService.update(id, data).then((res) => {
            console.log(res.data);
        });

        await cartItemService.update(id, data).then((res) => {
            console.log(res.data);
        });

        cartItemService.getByCartID(cartID).then((res) => {
            setCartItems(res.data);
        });
        for (let i = 0; i < cartItems.length; i++) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            subtotal = cartItems[i].quantity * cartItems[i].itemPrice;
        }
    }

    function handlePayment() {
        console.log(total);
        for (let i = 0; i < cartItems.length; i++) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            console.log()
        }
        sessionStorage.setItem("total", total);
        window.location.href = "/payment";
    }

    async function deleteItem(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to remove this item from the cart?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'This Item has been removed from the cart.',
                    'success'
                )
                cartItemService.remove(id).then(
                    (response) => {
                        console.log(response.data);
                        cartItemService.getByCartID(cartID).then((res) => {
                            setCartItems(res.data);
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
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="xl"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
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
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((cartItem) => (
                                <tr>
                                    <td><img src={cartItem.itemimage} alt='...' style={{ height: '100px', width: '100px' }} /></td>
                                    <td>{cartItem.itembrand}</td>
                                    <td>{cartItem.itemName}</td>
                                    <td>
                                        {/* dropdown to select quantity */}
                                        <select onChange={(e) => handleQuantity(cartItem._id, e.target.value)} defaultValue={cartItem.quantity}>
                                            {
                                                // forloop to generate quantity
                                                [...Array(cartItem.availableQuantity).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1} >{x + 1}</option>
                                                ))

                                            }
                                        </select>
                                    </td>
                                    <td>Rs. {cartItem.quantity * cartItem.itemPrice}.00</td>
                                    <td><Button variant="danger" onClick={() => deleteItem(cartItem._id)}>Remove</Button>{' '}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>

                    <Container>
                        <Row >
                            <Row><Col sm={4}>Subtotal Price : </Col><Col>Rs {subtotal.toFixed(2)}</Col></Row>
                            <Row><Col sm={4}>Tax : </Col><Col>Rs {tax.toFixed(2)}</Col></Row>
                            <Row><Col sm={4}>Delivery Charges : </Col><Col>Rs {deliver.toFixed(2)}</Col></Row>
                            <Row><Col sm={4}>Total Price : </Col><Col>Rs {total.toFixed(2)}</Col></Row>
                            <Row style={{ marginTop: '2rem' }}>
                                <Col sm={4}>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                </Col>
                                <Col>
                                    <Col >
                                        <Button variant="primary" onClick={handlePayment}>Go To Checkout</Button>
                                    </Col>
                                </Col>
                            </Row>
                        </Row>
                        
                    </Container>
                </Modal.Footer>
            </Modal>

            <div className="container">
                {userType === ("Buyer") && (
                    <div className="floating-parent">
                        <div className="tooltip">My Cart</div>
                        <div className="right-button" onClick={handleShow}>
                            <i class="fa-solid fa-cart-shopping cart"></i>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
export default ItemCart;