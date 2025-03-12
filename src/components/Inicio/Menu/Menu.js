import React from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button } from "react-bootstrap";
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
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Buscar"
              className="me-2"
              aria-label="Buscar"
            />
            <Button variant="outline-success">Buscar</Button>
          </Form>
        </Container>
      </Navbar>
    </div>
  );
}