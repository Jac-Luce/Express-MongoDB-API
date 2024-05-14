import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./styles.css";

const NavBar = props => {
  return (
    <Navbar expand="lg" className="blog-navbar" fixed="top">
      <Container className="justify-content-between">
        <Navbar.Brand as={Link} to="/">
          <img className="blog-navbar-brand" alt="logo" src={logo} />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/authors">Autori</Nav.Link>
          <Nav.Link as={Link} to="/me">Profilo</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
