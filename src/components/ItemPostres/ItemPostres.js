import React from "react";
import { Card, Button } from "react-bootstrap";
import "./ItemPostres.scss";

export function ItemPostres({ postre }) {
  return (
    <Card>
      <Card.Img 
        variant="top" 
        src={`http://localhost:5000/${postre.imagep}`} // Ruta completa de la imagen
        className="card-img" 
      />
      <Card.Body className="body">
        <Card.Title className="body__title">
          {postre.nombre}
        </Card.Title>
        <Card.Text className="body__text">
          Precio: ${postre.precio} <br />
          Cantidad: {postre.cantidad} <br />
          Ingredientes: {postre.ingredientes}
        </Card.Text>
        <div className="d-flex justify-content-center">
          <Button variant="primary" className="me-2">Más detalles</Button>
          <Button variant="success">Apartar</Button>
        </div>
      </Card.Body>
    </Card>
  );
}