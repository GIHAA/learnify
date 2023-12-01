import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../styles/madusha/footer.css';


export default function Footer() {
  <>
    <footer className="bg-dark text-light">
      <Container>
        <Row>
          <Col>
            <h5>Beheth Kade</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam commodo, turpis at finibus sollicitudin, ante ipsum eleifend eros, eu scelerisque turpis orci eget velit.</p>
          </Col>
          <Col>
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </Col>
          <Col>
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>123 Main Street</li>
              <li>City, State 12345</li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: nehethKade@gmail.com</li>
            </ul>
          </Col>
        </Row>
        <hr />
        <p className="text-center">&copy; 2023 Beheth Kade. All Rights Reserved.</p>
      </Container>
    </footer>
  </>
}