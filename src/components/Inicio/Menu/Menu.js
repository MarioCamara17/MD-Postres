import React from 'react'
import {Navbar, Nav, Container} from "react-bootstrap"
import {Link} from "react-router-dom"
import "./Menu.scss"

export function Menu() {
  return (
    <div>
        <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand to="/">Barra de herramientas</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/">Salir</Link>
            <Link to="/inicio">pagina de bienvenida</Link>
            <Link to="/catalogo">Catalogo de productos</Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}
