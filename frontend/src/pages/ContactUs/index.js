import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';

import './contactUs.css'
import Navbar from '../../components/navbar';

export default function contactUs() {
    return (
        <>
            <Navbar />
            <br /><br /><br /><br />
            <div className='c_container'>
                <Form>
                    <Form.Group className="mb-3" controlId="formUP">
                        <Form.Label className='label_c'>CONTACT US</Form.Label>
                        <br></br>
                        <Form.Label className='txt_1'>We Love to Hear from You...</Form.Label>
                        <br></br>
                        <br></br>
                        <Form.Control type="text" className='inputc' placeholder="Name" />
                        <br></br>
                        <Form.Control type="email" className='inputc' placeholder="E-mail" />
                        <br></br>
                        <Form.Control type="text" className='inputc' placeholder="Contact Number" />
                        <br></br>
                        {/* <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1"> */}
                        <Form.Control as="textarea" className='area' coulmns={2} rows={3} placeholder='Your Message' />
                        {/* </Form.Group> */}

                    </Form.Group>

                    <Button type="submit" className="button_1">
                        Submit
                    </Button>
                </Form>
            </div>

        </>
    )
}