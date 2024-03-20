import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import React, { useContext } from "react";
import { UserContext } from "./UserContext";

function MyNavbar() {
  const { loggedInUser } = useContext(UserContext);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  return (
    <Navbar expand="lg" className="bg-body-tertiary" id="nav">
      <Container className="navbar">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/articles">Articles</Nav.Link>
        <Nav.Link href="/users">
          <img src={loggedInUser.avatar_url} className="login-photo"></img>
        </Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Topics" id="basic-nav-dropdown">
              <NavDropdown.Item href="/articles?topic=coding">
                Coding
              </NavDropdown.Item>
              <NavDropdown.Item href="/articles?topic=football">
                Football
              </NavDropdown.Item>
              <NavDropdown.Item href="/articles?topic=cooking">
                Cooking
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
