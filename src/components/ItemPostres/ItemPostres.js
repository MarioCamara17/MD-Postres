import React from "react";
import { Card, Button } from "react-bootstrap";
import "./ItemPostres.scss";

export function ItemPostres({ producto }) {
  return (
    <Card>
      <Card.Img variant="top" src={producto.imagen} className="card-img" />
      <Card.Body className="body">
        <Card.Title className="body__title">
          {producto.nombre}
        </Card.Title>
        <Card.Text className="body__text">
          Precio: {producto.precio} <br/>
          Cantidad: {producto.cantidad} <br/>
          Ingredientes: {producto.ingredientes}
        </Card.Text>
        <div className="d-flex justify-content-center">
          <Button variant="primary" className="me-2">Más detalles</Button>
          <Button variant="success">Apartar</Button>
        </div>
      </Card.Body>
    </Card>
  );
}