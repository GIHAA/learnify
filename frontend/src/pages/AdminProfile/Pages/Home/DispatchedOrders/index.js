import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2'

import './Orders.css'

import CartService from '../../../../../services/cart.service'
import CartItemService from '../../../../../services/cartItem.service'

export default function Dispatched() {

  const [orders, setOrders] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const [showCartItems, setShowCartItems] = useState(false);

  const handleCloseCartItems = () => setShowCartItems(false);
  const handleShowCartItems = () => setShowCartItems(true);

  useEffect(() => {
    CartService.getByStatus("Dispatched").then(
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
      text: "Do you want to set this Order as Delivered?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Set as Delivered!',
      cancelButtonText: 'No!',
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          status: "Delivered"
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
          'This Order has been Delivered !!.',
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
            Dispatched Orders In The System
          </Alert>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={{ width: '20%' }}>Buyer Name Name</th>
                <th style={{ width: '20%' }}>View Buyer</th>
                <th style={{ width: '20%' }}>Total Price</th>
                <th style={{ width: '20%' }}>View Order</th>
                <th style={{ width: '20%' }}>Set Status</th>
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
                    <td>
                      Rs. {order.totalPrice.toFixed(2)}</td>
                    <td>
                      <Button variant='success' onClick={() => viewCartItems(order._id)}>View Order</Button>
                    </td>
                    <td>
                      <Button variant='warning' onClick={() => handleStatus(order._id)}>Set As Delivered</Button>
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
