import "../../styles/sudul/Navbar.css";
import "../../styles/sudul/Home.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbarx from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import Swal from 'sweetalert2';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import jwt_decode from "jwt-decode";

import SellerAuth from "../../services/sellerAuth.service";
import BuyerAuth from "../../services/buyerAuth.service";
import AdminAuth from "../../services/adminAuth.service";
import CartService from "../../services/cart.service";

export default function Navbar() {

  const logo = "https://firebasestorage.googleapis.com/v0/b/beheth-kade-6ds3w9c.appspot.com/o/asserts%2Flogo%20(transparent).png?alt=media&token=78d6bc1e-59bb-461c-b32e-cd278ebab61a";

  document.body.style.overflow = "visible";
  const [imageBuyer, setImageBuyer] = useState("");
  const [imageSeller, setImageSeller] = useState("");

  const [search, setSearch] = useState("");

  //buyer register validation
  const buyerRegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(5, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
      .min(5, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    contactNo: Yup.string()
      .min(11, 'Too Short!')
      .max(11, 'Too Long!')
      .required('Required'),
    address: Yup.string()
      .min(5, 'Too Short!')
      .max(100, 'Too Long!')
      .required('Required'),
    password: Yup.string()
      .min(8, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });

  //seller register validation
  const sellerRegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(5, 'Too Short! Enter More Than 5 Characters')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
      .min(5, 'Too Short! Enter More Than 5 Characters')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    contactNo: Yup.string()
      .min(11, 'Too Short!')
      .max(11, 'Too Long!')
      .required('Required'),
    password: Yup.string()
      .min(8, 'Too Short! Enter More Than 8 Characters')
      .max(50, 'Too Long!')
      .required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
    companyName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    companyAddress: Yup.string()
      .min(2, 'Too Short!')
      .max(100, 'Too Long!')
      .required('Required'),
  });

  //login validation
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    password: Yup.string()
      .min(8, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  });

  const [showRegSelect, setShowRegSelect] = useState(false);
  const handleCloseRegSelect = () => setShowRegSelect(false);
  const handleShowRegSelect = () => setShowRegSelect(true);

  const [showRegSeller, setShowRegSeller] = useState(false);
  const handleCloseRegSeller = () => setShowRegSeller(false);
  const handleShowRegSeller = () => {
    setShowRegSelect(false);
    setShowRegSeller(true);
  };

  const [showRegBuyer, setShowRegBuyer] = useState(false);
  const handleCloseRegBuyer = () => setShowRegBuyer(false);
  const handleShowRegBuyer = () => {
    setShowRegSelect(false);
    setShowRegBuyer(true);
  };

  const [showLoginSelect, setShowLoginSelect] = useState(false);
  const handleCloseLoginSelect = () => setShowLoginSelect(false);
  const handleShowLoginSelect = () => setShowLoginSelect(true);

  const [showLoginSeller, setShowLoginSeller] = useState(false);
  const handleCloseLoginSeller = () => setShowLoginSeller(false);
  const handleShowLoginSeller = () => {
    setShowLoginSelect(false);
    setShowLoginSeller(true);
  };

  const [showLoginBuyer, setShowLoginBuyer] = useState(false);
  const handleCloseLoginBuyer = () => setShowLoginBuyer(false);
  const handleShowLoginBuyer = () => {
    setShowLoginSelect(false);
    setShowLoginBuyer(true);
  };

  const [showLoginAdmin, setShowLoginAdmin] = useState(false);
  const handleCloseLoginAdmin = () => setShowLoginAdmin(false);
  const handleShowLoginAdmin = () => {
    setShowLoginSelect(false);
    setShowLoginAdmin(true);
  };

  function handleSearch() {
    console.log(search);
    window.location.href = "/search/" + search;
  }

  function handleToken(token) {
    //decode token
    const decodedToken = jwt_decode(token);
    console.log(decodedToken);
    sessionStorage.setItem("auth-token", token);
    sessionStorage.setItem("user-id", decodedToken.id);
    sessionStorage.setItem("verification", decodedToken.verified);
    sessionStorage.setItem("brand", decodedToken.brand);
    sessionStorage.setItem("fname", decodedToken.fname);
    sessionStorage.setItem("lname", decodedToken.lname);
    sessionStorage.setItem("email", decodedToken.email);
    sessionStorage.setItem("contactNo", decodedToken.contactNo);
  }

  function logout() {
    if (sessionStorage.getItem("user-type") === "Buyer") {
      const cardID = sessionStorage.getItem("cart-id");
      console.log(cardID)
      CartService.remove(cardID).then((res) => {
        console.log(res);
        sessionStorage.clear();
        window.location.href = "/";
      }
      ).catch((err) => {
        console.log(err);
      });
    }
    else {
      sessionStorage.clear();
      window.location.href = "/";
    }
  }

  async function registerBuyer(values) {
    const storageRef = ref(storage, `buyer/${Image.name + v4()}`);

    await uploadBytes(storageRef, imageBuyer)
      .then(() => {
        console.log("uploaded");
      })
      .catch((err) => {
        console.log(err);
      });

    await getDownloadURL(storageRef)
      .then(async (url) => {
        console.log(url);
        const data = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          contactNo: values.contactNo,
          address: values.address,
          password: values.password,
          image: url,
        };
        BuyerAuth.register(data).then((res) => {
          console.log(res);
          Swal.fire({
            icon: 'success',
            title: 'Successful',
            text: 'New Buyer Registered Successfully!',
            footer: '<a href="/buyerProfile">Go to your profile</a>'
          }).then((result) => {
            if (result.isConfirmed) {
              const login = { email: values.email, password: values.password };
              loginBuyer(login);
            }
          })
        }).catch((err) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Please Check Your Email!!',
            footer: 'Your Email is already in the Database!!'
          }).then((result) => {
            if (result.isConfirmed) {
              return;
            }
          })
        });

      }).catch((err) => {
        console.log(err);
        alert("Email already exists!")
        return;
      });
  }

  async function registerSeller(values) {
    const storageRef = ref(storage, `seller/${Image.name + v4()}`);

    await uploadBytes(storageRef, imageSeller)
      .then(() => {
        console.log("uploaded");
      })
      .catch((err) => {
        console.log(err);
      });

    await getDownloadURL(storageRef)
      .then(async (url) => {
        console.log(url);
        const data = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          contactNo: values.contactNo,
          companyName: values.companyName,
          companyAddress: values.companyAddress,
          password: values.password,
          image: url,
        };
        SellerAuth.register(data).then((res) => {
          console.log(res);
          Swal.fire({
            icon: 'success',
            title: 'Successful',
            text: 'New Seller Registered Successfully!',
            footer: '<a href="/accVerify">Go to your profile</a>'
          }).then((result) => {
            if (result.isConfirmed) {
              const login = { email: values.email, password: values.password };
              handleCloseRegSeller();
              SellerAuth.login(login).then((res) => {
                sessionStorage.setItem("user-type", res.data.user);
                handleToken(res.data.token);
                window.location.href = "/sellerProfile";
              }).catch((err) => {
                console.log(err);
              });
            }
          })
        }).catch((err) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Please Check Your Email!!',
            footer: 'Your Email is already in the Database!!'
          }).then((result) => {
            if (result.isConfirmed) {
            }
          })
        });

      }).catch((err) => {
        console.log(err);
        alert("Email already exists!")
        return;
      });


  }

  async function loginBuyer(values) {
    const data = {
      email: values.email,
      password: values.password,
    }

    BuyerAuth.login(data)
      .then((res) => {
        sessionStorage.setItem("user-type", res.data.user);
        handleToken(res.data.token);
        const cart = {
          buyerID: sessionStorage.getItem("user-id"),
          buyerfname: sessionStorage.getItem("fname"),
          buyerlname: sessionStorage.getItem("lname"),
          buyeremail: sessionStorage.getItem("email"),
          buyercontactno: sessionStorage.getItem("contactNo"),
        }
        CartService.create(cart).then((res) => {
          console.log(res);
          console.log(res.data._id);
          sessionStorage.setItem("cart-id", res.data._id);
        }).catch((err) => {
          console.log(err);
        });

        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: 'Login Successfully!',
          footer: '<a href="/buyerProfile">Go to your profile</a>'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/buyerProfile";
          }
        })
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Please Check Your Email & Password!!',
          footer: 'Your Credentails Are Invalid!!'
        }).then((result) => {
          if (result.isConfirmed) {
          }
        })
      });
  }

  async function loginSeller(values) {
    const data = {
      email: values.email,
      password: values.password,
    }

    SellerAuth.login(data)
      .then((res) => {
        sessionStorage.setItem("user-type", res.data.user);
        handleToken(res.data.token);
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: 'Login Successfully!',
          footer: '<a href="/sellerProfile">Go to your profile</a>'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/sellerProfile";
          }
        })
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Please Check Your Email & Password!!',
          footer: 'Your Credentails Are Invalid!!'
        }).then((result) => {
          if (result.isConfirmed) {
          }
        })
      });
  }

  async function loginAdmin(values) {
    const data = {
      email: values.email,
      password: values.password,
    }
    AdminAuth.login(data)
      .then((res) => {
        sessionStorage.setItem("user-type", res.data.user);
        handleToken(res.data.token);
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: 'Login Successfully!',
          footer: '<a href="/adminProfile">Go to your profile</a>'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/adminProfile";
          }
        })
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Please Check Your Email & Password!!',
          footer: 'Your Credentails Are Invalid!!'
        }).then((result) => {
          if (result.isConfirmed) {
          }
        })
      });
  }

  async function handleProfile() {
    if (sessionStorage.getItem("user-type") === "Buyer") {
      window.location.href = "/buyerProfile";
    } else if (sessionStorage.getItem("user-type") === "Seller") {
      window.location.href = "/sellerProfile";
    } else if (sessionStorage.getItem("user-type") === "Admin") {
      window.location.href = "/adminProfile";
    }
  }

  function view() {
    if (sessionStorage.getItem("auth-token") === null) {
      return (
        <div>
          <Button className="whitebtn" onClick={handleShowRegSelect}>
            Register
          </Button>

          <Button className="whitebtn" onClick={handleShowLoginSelect}>
            Login
          </Button>
        </div>
      );
    } else {

      return (
        <div>
          <Button className="whitebtn" onClick={handleProfile}>
            Profile
          </Button>

          <Button className="whitebtn" onClick={logout}>
            Logout
          </Button>
        </div>
      );
    }
  }

  return (

    <>
      {/* reg select modal */}
      <Modal
        show={showRegSelect}
        onHide={handleCloseRegSelect}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Registration User Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://firebasestorage.googleapis.com/v0/b/beheth-kade-6ds3w9c.appspot.com/o/asserts%2F4729171.jpg?alt=media&token=37de4a8b-0f81-49f8-940b-a6dfdd56f8f7" />
                <Card.Body>
                  <Card.Title>Register as a Seller</Card.Title>
                  <Card.Text>
                    To sell your products by posting on Beheth Kade, you need to register as a seller.
                  </Card.Text>
                  <Button variant="primary" onClick={handleShowRegSeller}>Register as a Seller</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://firebasestorage.googleapis.com/v0/b/beheth-kade-6ds3w9c.appspot.com/o/asserts%2F8586.jpg?alt=media&token=634a4d32-a789-4519-b126-0c7dc4b403cb" />
                <Card.Body>
                  <Card.Title>Register as a Buyer</Card.Title>
                  <Card.Text>
                    To buy the products you need on Beheth Kade, you need to register as a buyer.
                  </Card.Text>
                  <Button variant="primary" onClick={handleShowRegBuyer}>Register as a Buyer</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRegSelect}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* seller register modal */}
      <Modal
        show={showRegSeller}
        onHide={handleCloseRegSeller}
        backdrop="static"
        keyboard={false}
        size="m"
      >
        <Modal.Header closeButton>
          <Modal.Title>Register as a Seller</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              contactNo: '',
              address: '',
              password: '',
              confirmPassword: '',
              companyName: '',
              companyAddress: '',
            }}
            validationSchema={sellerRegisterSchema}
            onSubmit={values => {
              registerSeller(values);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                {/* firstName */}
                <div className="form-group col-md-6">
                  <label htmlFor="empNo">Seller First Name</label>
                  <Field name="firstName" placeholder="First Name" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                  <div className="invalid-feedback">{errors.firstName}</div>
                </div>

                {/* lastName */}
                <div className="form-group col-md-6">
                  <label htmlFor="empNo">Seller Last Name</label>
                  <Field name="lastName" placeholder="Last Name" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                  <div className="invalid-feedback">{errors.lastName}</div>
                </div>

                {/* email */}
                <div className="form-group col-md-6">
                  <label htmlFor="empNo">Seller Email</label>
                  <Field name="email" placeholder="example@abc.com" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                  <div className="invalid-feedback">{errors.email}</div>
                </div>

                {/* contactNo */}
                <div className="form-group col-md-6">
                  <label htmlFor="empNo">Seller Contact No</label>
                  <Field name="contactNo" placeholder="+94770000000" type="text" className={'form-control' + (errors.contactNo && touched.contactNo ? ' is-invalid' : '')} />
                  <div className="invalid-feedback">{errors.contactNo}</div>
                </div>

                {/* password */}
                <div className="form-group col-md-6">
                  <label htmlFor="empNo">Seller Password</label>
                  <Field name="password" placeholder="Password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                  <div className="invalid-feedback">{errors.password}</div>
                </div>

                {/* confirmPassword */}
                <div className="form-group col-md-6">
                  <label htmlFor="empNo">Seller Confirm Password</label>
                  <Field name="confirmPassword" placeholder="Confirm Password" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                  <div className="invalid-feedback">{errors.confirmPassword}</div>
                </div>

                {/* companyName */}
                <div className="form-group col-md-6">
                  <label htmlFor="empNo">Seller Company Name</label>
                  <Field name="companyName" placeholder="Company Name" type="text" className={'form-control' + (errors.companyName && touched.companyName ? ' is-invalid' : '')} />
                  <div className="invalid-feedback">{errors.companyName}</div>
                </div>

                {/* companyAddress */}
                <div className="form-group col-md-6">
                  <label htmlFor="empNo">Seller Company Address</label>
                  <Field name="companyAddress" placeholder="Company Address" type="text" className={'form-control' + (errors.companyAddress && touched.companyAddress ? ' is-invalid' : '')} />
                  <div className="invalid-feedback">{errors.companyAddress}</div>
                </div>

                {/* image upload */}
                <div className="form-group col-md-6">
                  <label htmlFor="empNo">Seller Company Logo</label>
                  <br /><br />
                  <input type="file" name="file" onChange={(e) => {
                    setImageSeller(e.target.files[0]);
                  }} />
                </div>

                <br />
                {/* submit button */}
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            )}

          </Formik>
        </Modal.Body>
      </Modal>

      {/* buyer register modal */}
      <Modal
        show={showRegBuyer}
        onHide={handleCloseRegBuyer}
        backdrop="static"
        keyboard={false}
        size="m">
        <Modal.Header closeButton>
          <Modal.Title>Buyer Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              contactNo: '',
              address: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={buyerRegisterSchema}
            onSubmit={values => {
              registerBuyer(values);

            }}
          >
            {({ errors, touched }) => (
              <Form>
                {/* firstName */}
                <div className="form-group col-md-6">
                  <label htmlFor="empNo">Buyer First Name</label>
                  <Field name="firstName" placeholder="First name" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                  <div className="invalid-feedback">{errors.firstName}</div>
                </div>

                {/* lastName */}
                <div className="form-group col-md-6">
                  <label htmlFor="empNo">Buyer Last Name</label>
                  <Field name="lastName" placeholder="Last name" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                  <div className="invalid-feedback">{errors.lastName}</div>
                </div>

                {/* email */}
                <div className="form-group col-md-6">
                  <label htmlFor="empNo">Buyer Email</label>
                  <Field name="email" placeholder="example@abc.com" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                  <div className="invalid-feedback">{errors.email}</div>
                </div>

                {/* contactNo */}
                <div className="form-group col-md-6">
                  <label htmlFor="empNo">Buyer Contact No</label>
                  <Field name="contactNo" placeholder="+94770000000" type="text" className={'form-control' + (errors.contactNo && touched.contactNo ? ' is-invalid' : '')} />
                  <div className="invalid-feedback">{errors.contactNo}</div>
                </div>

                {/* address */}
                <div className="form-group col-md-6">
                  <label htmlFor="empNo">Buyer Address</label>
                  <Field name="address" placeholder="Address" type="text" className={'form-control' + (errors.address && touched.address ? ' is-invalid' : '')} />
                  <div className="invalid-feedback">{errors.address}</div>
                </div>

                {/* password */}
                <div className="form-group col-md-6">
                  <label htmlFor="empNo">Buyer Password</label>
                  <Field name="password" placeholder="Password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                  <div className="invalid-feedback">{errors.password}</div>
                </div>

                {/* confirmPassword */}
                <div className="form-group col-md-6">
                  <label htmlFor="empNo">Buyer Confirm Password</label>
                  <Field name="confirmPassword" placeholder="Confirm Password" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                  <div className="invalid-feedback">{errors.confirmPassword}</div>
                </div>

                {/* image upload */}
                <br />
                <div className="form-group col-md-6">
                  <label htmlFor="empNo">Buyer Profile Picture</label>
                  <br /><br />
                  <input type="file" name="file" onChange={(e) => {
                    setImageBuyer(e.target.files[0]);
                  }} />
                </div>

                <br />
                {/* submit button */}
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            )}

          </Formik>
        </Modal.Body>
      </Modal>

      {/* login select modal */}
      <Modal
        show={showLoginSelect}
        onHide={handleCloseLoginSelect}
        backdrop="static"
        keyboard={false}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Login User Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://firebasestorage.googleapis.com/v0/b/beheth-kade-6ds3w9c.appspot.com/o/asserts%2F4729171.jpg?alt=media&token=37de4a8b-0f81-49f8-940b-a6dfdd56f8f7" />
                <Card.Body>
                  <Card.Title>Login as a Seller</Card.Title>
                  <Card.Text>
                    To sell your products by posting on Beheth Kade, you need to login as a seller.
                  </Card.Text>
                  <Button variant="primary" onClick={handleShowLoginSeller}>Login as a Seller</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://firebasestorage.googleapis.com/v0/b/beheth-kade-6ds3w9c.appspot.com/o/asserts%2F8586.jpg?alt=media&token=634a4d32-a789-4519-b126-0c7dc4b403cb" />
                <Card.Body>
                  <Card.Title>Login as a Buyer</Card.Title>
                  <Card.Text>
                    To buy the products you need on Beheth Kade, you need to login as a buyer.
                  </Card.Text>
                  <Button variant="primary" onClick={handleShowLoginBuyer}>Login as a Buyer</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://firebasestorage.googleapis.com/v0/b/beheth-kade-6ds3w9c.appspot.com/o/asserts%2F4759943.jpg?alt=media&token=f204fe7c-9eb0-481d-95af-d877add70a65" />
                <Card.Body>
                  <Card.Title>Login as an Admin</Card.Title>
                  <Card.Text>
                    To manage the orders and other aspects of Beheth Kade, you need to login as an administrator.
                  </Card.Text>
                  <Button variant="primary" onClick={handleShowLoginAdmin}>Login as an Admin</Button>
                </Card.Body>
              </Card>
            </Col>

          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLoginSelect}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* seller login modal */}
      <Modal
        show={showLoginSeller}
        onHide={handleCloseLoginSeller}
        backdrop="static"
        keyboard={false}
        size="m">
        <Modal.Header closeButton>
          <Modal.Title>Seller Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={loginSchema}
            onSubmit={values => {
              console.log(values);
              loginSeller(values);
            }
            }
          >
            {({ errors, touched }) => (
              <Form>
                {/* email */}
                <div className="form-group col-md-6">
                  <label htmlFor="empNo">Seller Email</label>
                  <Field name="email" placeholder="example@abc.com" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                  <div className="invalid-feedback">{errors.email}</div>
                </div>

                {/* password */}
                <div className="form-group col-md-6">
                  <label htmlFor="empNo">Seller Password</label>
                  <Field name="password" placeholder="Password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                  <div className="invalid-feedback">{errors.password}</div>
                </div>

                <br />
                {/* submit button */}
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            )}

          </Formik>
        </Modal.Body>
        {/* <Modal.Footer>
          Can't remember your password?
          <Button variant="secondary">
            Reset Password
          </Button>
        </Modal.Footer> */}
      </Modal>

      {/* buyer login modal */}
      <Modal
        show={showLoginBuyer}
        onHide={handleCloseLoginBuyer}
        backdrop="static"
        keyboard={false}
        size="m">
        <Modal.Header closeButton>
          <Modal.Title>Buyer Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={loginSchema}
            onSubmit={values => {
              console.log(values);
              loginBuyer(values);
            }
            }
          >
            {({ errors, touched }) => (
              <Form>
                {/* email */}
                <div className="form-group col-md-6">
                  <label htmlFor="empNo">Buyer Email</label>
                  <Field name="email" placeholder="example@abc.com" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                  <div className="invalid-feedback">{errors.email}</div>
                </div>

                {/* password */}
                <div className="form-group col-md-6">
                  <label htmlFor="empNo">Buyer Password</label>
                  <Field name="password" placeholder="Password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                  <div className="invalid-feedback">{errors.password}</div>
                </div>

                <br />
                {/* submit button */}
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            )}

          </Formik>
        </Modal.Body>
        {/* <Modal.Footer>
          Can't remember your password?
          <Button variant="secondary">
            Reset Password
          </Button>
        </Modal.Footer> */}
      </Modal>

      {/* admin login modal */}
      <Modal
        show={showLoginAdmin}
        onHide={handleCloseLoginAdmin}
        backdrop="static"
        keyboard={false}
        size="m">
        <Modal.Header closeButton>
          <Modal.Title>Admin Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={loginSchema}
            onSubmit={values => {
              console.log(values);
              loginAdmin(values);
            }
            }
          >
            {({ errors, touched }) => (
              <Form>
                {/* username */}
                <div className="form-group col-md-6">
                  <label htmlFor="empNo">Admin Email</label>
                  <Field name="email" placeholder="example@abc.com" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                  <div className="invalid-feedback">{errors.email}</div>
                </div>

                {/* password */}
                <div className="form-group col-md-6">
                  <label htmlFor="empNo">Admin Password</label>
                  <Field name="password" placeholder="Password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                  <div className="invalid-feedback">{errors.password}</div>
                </div>

                <br />
                {/* submit button */}
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            )}

          </Formik>
        </Modal.Body>
        {/* <Modal.Footer>
          Can't remember your password?
          <Button variant="secondary">
            Reset Password
          </Button>
        </Modal.Footer> */}
      </Modal>

      {/* Navbar component */}
      <Navbarx className="NavbarCont" expand="lg">
        <Container>
          <Navbarx.Toggle aria-controls="basic-navbar-nav" />
          <Navbarx.Collapse id="basic-navbar-nav" className="NavbarList">
            <LinkContainer to="/" className="NavbarLogo">
              <Navbarx.Brand>
                <img
                  src={
                    logo
                  }
                  alt="heroimg"
                />
              </Navbarx.Brand>
            </LinkContainer>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/categories" className="navlink">
                Categories
              </Nav.Link>
              <Nav.Link as={Link} to="/brands" className="navlink">
                Brands
              </Nav.Link>
              <Nav.Link as={Link} to="/AboutUs" className="navlink">
                About Us
              </Nav.Link>
              <Nav.Link as={Link} to="/ContactUS" className="navlink">
                Contact Us
              </Nav.Link>
              <div className="searchBar">
                <input type="text" className="barInput" placeholder="Search Items ..." onChange={(e) => setSearch(e.target.value)} />
                <Button variant="success" className="searchbtn" onClick={handleSearch}><i class="fa-solid fa-search bar"></i></Button>{' '}
              </div>

            </Nav>
            {view()}

          </Navbarx.Collapse>
        </Container>
      </Navbarx>
    </>
  );
}