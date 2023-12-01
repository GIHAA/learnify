import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';

import './ForgotPassword.css'

export default function UpdatePass() {

    const email = document.getElementsByClassName('email').value;

    axios.post('http://localhost:7000/buyers/getBuyerByEmail', {
        email: email,
    })
    return (
        <>
            <div className='fcontainer'>
                <Form>
                    <Form.Group className="mb-3" controlId="formUP">
                        <Form.Label className='label'>Forgot Password</Form.Label>
                        <br></br>
                        <div className='pwcontainer'>
                            <Form.Control type="text" className='email' placeholder="Enter your email" />
                        </div>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                        <br></br>
                    </Form.Group>

                    <Button type="submit" className="button">
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    )
}