import React from 'react';
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Menu.scss";

export function Menu() {
  return (
    <div>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand as={Link} >Barra de herramientas</Navbar.Brand>
          <Nav className="me-auto">
            <Link className="nav-link" to="/">Salir</Link>
            <Link className="nav-link" to="/inicio">Página de bienvenida</Link>
            <Link className="nav-link" to="/catalogo">Catálogo de productos</Link>
            <Link className="nav-link" to="/registro"></Link>
            <Link className="nav-link" to="/admon">Administración</Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}