import React from 'react';
import { Table, Button } from "react-bootstrap";
import "./ListPostres.scss";

export function ListPostres({ postres, eliminarPostre }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre del postre</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Ingredientes</th>
          <th>Imagen</th>
          <th>Editar</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {postres.length > 0 ? (
          postres.map((postre, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{postre.nombre}</td>
              <td>${postre.precio}</td>
              <td>{postre.cantidad}</td>
              <td>{postre.ingredientes}</td>
              <td><img src={postre.imagen} alt="Imagen" className="table-img" /></td>
              <td><Button variant="success">Editar</Button></td>
              <td><Button variant="danger" onClick={() => eliminarPostre(postre._id)}>Eliminar</Button></td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" className="text-center">No hay postres disponibles</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}