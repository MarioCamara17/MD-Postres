import React from "react";
import { Table, Button, Image } from "react-bootstrap";
import "./ListPostres.scss";
import { ENV } from "../../utils/Constantes";

const urlImagen = ENV.BASE_PATH;

export function ListPostres({ postres, eliminarPostre, editarPostre }) {
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
              <td>
                <Image
                  src={`${urlImagen}/${postre.imagep}`} // urlImagen = ENV.BASE_PATH
                  style={{ width: "50px", height: "50px" }}
                  roundedCircle
                />
              </td>
              <td>
                <Button variant="success" onClick={() => editarPostre(postre)}>
                  Editar
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => eliminarPostre(postre._id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" className="text-center">
              No hay postres disponibles
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
