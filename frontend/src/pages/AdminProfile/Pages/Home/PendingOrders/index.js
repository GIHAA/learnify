import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2'

import './Orders.css'

import CartService from '../../../../../services/cart.service'
import CartItemService from '../../../../../services/cartItem.service'

export default function PendingOrders() {

  const [orders, setOrders] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const [showCartItems, setShowCartItems] = useState(false);

  const handleCloseCartItems = () => setShowCartItems(false);
  const handleShowCartItems = () => setShowCartItems(true);

  useEffect(() => {
    CartService.getByStatus("Pending").then(
      (response) => {
        setOrders(response.data);
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

  async function handleStatus(cartId) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to Confirm the order?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm Order!',
      cancelButtonText: 'No!',
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          status: "Confirmed"
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
          'This Order has been Confirmed !!.',
          'success'
        ).then(() => {
          window.location.reload();
        })
      }
    })
  }

  async function handleStatusCancel(cartId) {
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
        const data = {
          status: "Cancelled"
        }
        CartService.update(cartId, data).then(
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
          CartService.getByStatus("Pending").then(
            (response) => {
              setOrders(response.data);
            },
            (error) => {
              console.log(error);
            });
        })
      }
    })
  }

  return (
    <>
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

      <div>
        <div className='order' style={{ padding: '1rem' }}>
          <Alert key='secondary' variant='secondary'>
            Pending Orders In The System
          </Alert>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={{ width: '20%' }}>Buyer Name Name</th>
                <th style={{ width: '20%' }}>View Buyer</th>
                <th style={{ width: '20%' }}>Total Price</th>
                <th style={{ width: '20%' }} >View Order</th>
                <th style={{ width: '20%' }}>Actions</th>
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
                    <td>
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
                      <Button variant='warning' onClick={() => handleStatus(order._id)}>Confirm</Button> &nbsp;
                      <Button variant='danger' onClick={() => handleStatusCancel(order._id)}>Cancel</Button>
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
