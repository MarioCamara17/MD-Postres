import React from 'react';
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Menu.scss";

export function Menu() {
  return (
    <div>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand as={Link} >M&D</Navbar.Brand>
          <Nav className="me-auto">
            <Link className="nav-link" to="/">Salir</Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}