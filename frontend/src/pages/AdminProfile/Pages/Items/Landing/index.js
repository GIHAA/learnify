import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Swal from 'sweetalert2'
import Alert from 'react-bootstrap/Alert';


import ItemService from '../../../../../services/item.service';

export default function Landing() {

  document.body.style.overflow = "visible";
  const [items, setItems] = useState([]);

  //get all items
  useEffect(() => {
    ItemService.getAll().then(
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
            ItemService.getAll().then(
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

  return (
    <>
      <br /><br /><br /><br /><br />
      <div style={{ width: '90%', margin: '0 auto' }}>
        <Alert key='success' variant='success'>
          All Items Registered in the System
        </Alert>
      </div>
      <div className='sellerItemsPage'>
        {items.map((item) => (
          <Card style={{ width: '18rem', height: '28rem', marginTop: '1rem' }} className="itemCard">
            <Card.Img variant="top" style={{ width: '10rem', margin: '0px auto' }} src={item.image} />
            <Card.Body>
              <Card.Title style={{ height: '3rem' }}>{item.name}</Card.Title>
              <Card.Text style={{ height: '1rem' }}>
                Rs. {item.price.toFixed(2)}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>{item.category}</ListGroup.Item>
              <ListGroup.Item>{item.brand}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Button variant="danger" style={{ margin: '5px' }} onClick={() => deleteItem(item._id)}>Delete</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  )
}
