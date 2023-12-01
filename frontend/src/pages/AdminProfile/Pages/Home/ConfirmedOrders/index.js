import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form, Field } from 'formik';
import Swal from 'sweetalert2'
import * as Yup from 'yup';

import './Orders.css'

import CartService from '../../../../../services/cart.service'
import CartItemService from '../../../../../services/cartItem.service'
import DeliveryService from '../../../../../services/delivery.service'

export default function ConfirmedOrders() {

  const [orders, setOrders] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [delivery, setDelivery] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showCartItems, setShowCartItems] = useState(false);

  const handleCloseCartItems = () => setShowCartItems(false);
  const handleShowCartItems = () => setShowCartItems(true);

  useEffect(() => {
    CartService.getByStatus("Confirmed").then(
      (response) => {
        setOrders(response.data);
      },
      (error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    DeliveryService.getAll().then(
      (response) => {
        setDelivery(response.data);
      },
      (error) => {
        console.log(error);
      });
  }, []);

  async function viewCartItems(cartId) {
    await CartItemService.getByCartID(cartId).then(
      (response) => {
        setCartItems(response.data);
      },
      (error) => {
        console.log(error);
      });
    console.log(cartItems);
    handleShowCartItems();
  }

  async function setDel(id) {
    sessionStorage.setItem("deliveryOrder", id);
    handleShow();
  }

  //delivery partner validation
  const validate = Yup.object({
    deliveryPartner: Yup.string()
      .required('Delivery Partner is required'),
  })


  async function handleStatus(values) {
    const cartId = sessionStorage.getItem("deliveryOrder");
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to Dispatch the order?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Dispatch Order!',
      cancelButtonText: 'No!',
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          status: "Dispatched"
        }
        CartService.update(cartId, data).then(
          (response) => {
            console.log(response.data);
          },
          (error) => {
            console.log(error);
          }
        );

        CartService.update(cartId, data).then(
          (response) => {
            console.log(response.data);
          },
          (error) => {
            console.log(error);
          }
        );

        Swal.fire(
          'Confirmed!',
          'This Order has been Dispatch !!.',
          'success'
        ).then(() => {
          window.location.reload();
        })
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
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Delivery Partner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              deliveryPartner: '',
            }}
            validationSchema={validate}
            onSubmit={values => {
              console.log(values);
              const data = {
                email: values.deliveryPartner,
                orderID: sessionStorage.getItem("deliveryOrder")
              }
              console.log(data);
              handleStatus(values);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="form-group" style={{ width: '18rem' }}>
                  <label htmlFor="deliveryPartner">Delivery Partner</label>
                  <Field
                    as="select"
                    id="deliveryPartner"
                    name="deliveryPartner"
                    className={`form-control ${touched.deliveryPartner && errors.deliveryPartner ? "is-invalid" : ""
                      }`}
                  >
                    <option value="">Select Delivery Partner</option>
                    {delivery.map((del) => (
                      <option value={del.email}>{del.name}</option>
                    ))}
                  </Field>
                  <div className="invalid-feedback">{errors.deliveryPartner}</div>
                </div>
                <br />
                <div className="form-group">
                  <button type="submit" className="btn btn-primary mr-2">
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showCartItems}
        onHide={handleCloseCartItems}
        backdrop="static"
        keyboard={false}
        size="xl"
      >
        <Modal.Header closeButton className='headerM'>
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

      <div>
        <div className='order' style={{ padding: '1rem' }}>
          <Alert key='secondary' variant='secondary'>
            Confiremd Orders In The System
          </Alert>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={{ width: '20%' }}>Buyer Name Name</th>
                <th style={{ width: '20%' }}>View Buyer</th>
                <th style={{ width: '20%' }}>Total Price</th>
                <th style={{ width: '20%' }}>View Order</th>
                <th style={{ width: '20%' }}>Send To Delivery</th>
              </tr>
            </thead>
            <tbody>
              {!orders.length ? (
                <td colSpan='5' style={{ textAlign: 'center' }}>
                  No Orders
                </td>
              ) : (
                orders.map((order) => (
                  <tr key={order._id}>
                    <td >
                      {order.buyerfname} {order.buyerlname}
                    </td>
                    <td>
                      <Button variant='primary'>View Buyer</Button>
                    </td>
                    <td>Rs. {order.totalPrice.toFixed(2)}</td>
                    <td>
                      <Button variant='success' onClick={() => viewCartItems(order._id)}>View Order</Button>
                    </td>
                    <td>
                      <Button variant='warning' onClick={() => setDel(order._id)}>Send To Delivery</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  )
}
