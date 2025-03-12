import React from 'react'
import {Table, Button} from "react-bootstrap"
import "./ListPostres.scss"

export function ListPostres() {
  return (
    <div>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre producto</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Ingredientes</th>
          <th>Imagen</th>
          <th>Editar</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Pan de queso de bola</td>
          <td>$280</td>
          <td>10</td>
          <td>mantequilla, azucar, lechera, queso de bola, harina, huevo</td>
          <td>
              <img src="pandebola.jpg" alt="Pan de queso de bola" width="100" />
          </td>
          <td><Button variant='success'> Editar</Button></td>
          <td><Button variant='danger'>Eliminar</Button></td>
        </tr>
        <tr>
        
        </tr>
        <tr>
       
        </tr>
      </tbody>
    </Table>
    </div>
  )
}
