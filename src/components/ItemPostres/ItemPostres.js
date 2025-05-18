import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { getImageUrl } from "../../utils/Constantes";
import "./ItemPostres.scss";

export function ItemPostres({ postre }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card>
        <Card.Img
          variant="top"
          src={getImageUrl(postre.imagep)}
          className="card-img"
          alt={postre.nombre}
        />

        <Card.Body className="body">
          <Card.Title className="body__title">{postre.nombre}</Card.Title>
          <Card.Text className="body__text">
            Precio: ${postre.precio} <br />
            Cantidad: {postre.cantidad}
          </Card.Text>
          <div className="d-flex justify-content-center">
            <Button variant="primary" onClick={handleShow}>
              Más detalles
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{postre.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div>
            <strong>Precio:</strong> ${postre.precio} <br />
            <strong>Cantidad:</strong> {postre.cantidad} <br />
            <strong>Ingredientes:</strong> {postre.ingredientes}
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
