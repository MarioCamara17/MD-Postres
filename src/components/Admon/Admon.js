import React, { useState } from "react";
import { useFormik } from "formik";
import { Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { initialValues, validationSchema } from "./Postres.form";
import { ListPostres } from "../ListPostres/ListPostres";

export function Admon() {
  const [valores, setValores] = useState();
  const [informacion, setInformacion] = useState([]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onSubmit: (formValue) => {
      console.log(formValue);
    },
  });

  return (
    <div className="p-4">
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom01">
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
          <Form.Group as={Col} md="3" controlId="validationCustom02">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              required
              type="number"
              name="precio"
              placeholder="Precio"
              onChange={formik.handleChange}
              value={formik.values.precio}
            />
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustomUsername">
            <Form.Label>Cantidad</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="number"
                name="cantidad"
                placeholder="Cantidad"
                onChange={formik.handleChange}
                value={formik.values.cantidad}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label>Ingredientes</Form.Label>
            <Form.Control
              type="text"
              name="ingredientes"
              placeholder="Ingredientes"
              onChange={formik.handleChange}
              value={formik.values.ingredientes}
            />
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="file"
              required
              name="imagen"
              onChange={(event) => {
                formik.setFieldValue("imagen", event.currentTarget.files[0]);
              }}
            />
          </Form.Group>
        </Row>

        <Button type="submit">Enviar</Button>
      </Form>

      <Row>
        <ListPostres />
      </Row>
    </div>
  );
}