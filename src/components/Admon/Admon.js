import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { initialValues, validationSchema } from "./Postres.form";
import { Postre } from "../../api";
import { ListPostres } from "../ListPostres/ListPostres";

const ctrPostre = new Postre();

export function Admon() {
  const [listaPostres, setListaPostres] = useState([]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await ctrPostre.createPostre(formValue);
        obtenerPostres();
      } catch (error) {
        console.error("Error al crear el postre:", error);
      }
    },
  });

  const obtenerPostres = async () => {
    try {
      const listaPro = await ctrPostre.getPostre();
      setListaPostres(listaPro || []);
    } catch (error) {
      console.error("Error al obtener los postres:", error);
      setListaPostres([]);
    }
  };

  const eliminarPostre = async (id) => {
    try {
      console.log("Eliminando postre con ID:", id);
      await ctrPostre.deletePostre(id);
      setListaPostres((prevLista) => prevLista.filter((postre) => postre._id !== id));
    } catch (error) {
      console.error("Error al eliminar el postre:", error);
    }
  };

  useEffect(() => {
    obtenerPostres();
  }, []);

  return (
    <div className="p-4">
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="12">
            <Form.Label>Nombre del postre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre del postre"
              name="nombre"
              onChange={formik.handleChange}
              value={formik.values.nombre}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              placeholder="Precio"
              value={formik.values.precio}
              onChange={formik.handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label>Cantidad</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                name="cantidad"
                placeholder="Cantidad"
                value={formik.values.cantidad}
                onChange={formik.handleChange}
                required
              />
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label>Ingredientes</Form.Label>
            <Form.Control
              type="text"
              name="ingredientes"
              placeholder="Ingredientes"
              value={formik.values.ingredientes}
              onChange={formik.handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="file"
              name="imagen"
              onChange={(event) => formik.setFieldValue("imagen", event.currentTarget.files[0])}
            />
          </Form.Group>
        </Row>

        <Button type="submit">Enviar</Button>
      </Form>

      <Row className="mt-4">
        <Col>
          <ListPostres postres={listaPostres} eliminarPostre={eliminarPostre} />
        </Col>
      </Row>
    </div>
  );
}