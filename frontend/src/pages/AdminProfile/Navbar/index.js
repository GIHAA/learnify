import "../../../styles/sudul/Navbar.css";
import "../../../styles/sudul/Home.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbarx from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";

export default function Navbar() {

  const logo = "https://firebasestorage.googleapis.com/v0/b/beheth-kade-6ds3w9c.appspot.com/o/asserts%2Flogo%20(transparent).png?alt=media&token=78d6bc1e-59bb-461c-b32e-cd278ebab61a";

  document.body.style.overflow = "visible";

  function logout() {
    sessionStorage.clear();
    window.location.href = "/";
  }

  function view() {
      return (
        <div>
          <Button className="whitebtn" onClick={() => window.location.href = "/adminProfile"}>
            Dashboard
          </Button>
          <Button className="whitebtn" onClick={logout}>
            Logout
          </Button>
        </div>
      );
  }

  return (
    <>
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
            </Nav>
            {view()}

          </Navbarx.Collapse>
        </Container>
      </Navbarx>
    </>
  );
}