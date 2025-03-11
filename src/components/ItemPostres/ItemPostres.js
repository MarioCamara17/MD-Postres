import React from "react";
import { Card } from "react-bootstrap";
import "./ItemPostres.scss";

export function ItemPostres({ producto }) {
  return (
    <Card>
      <Card.Img variant="top" src={producto.imagen} />
      <Card.Body className="body">
        <Card.Title className="body__title">
          {producto.nombre}
        </Card.Title>
        <Card.Text className="body__text">
          Precio: {producto.precio} <br/>
          Cantidad: {producto.cantidad} <br/>
          Ingredientes: {producto.unidad}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}