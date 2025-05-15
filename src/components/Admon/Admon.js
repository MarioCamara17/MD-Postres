import React, { useState, useEffect, useCallback } from "react";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import { Button, Form, Row, Col, Image } from "react-bootstrap";
import { initialValues, validationSchema } from "./Postres.form";
import { Postre } from "../../api";
import { ListPostres } from "../ListPostres/ListPostres";
import { imagenes } from "../../assets";

const ctrPostre = new Postre();

export function Admon() {
  const [listaPostres, setListaPostres] = useState([]);
  const [postreSeleccionado, setPostreSeleccionado] = useState(null);
  const [filtroNombre, setFiltroNombre] = useState(""); // Estado para el filtro

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await ctrPostre.createPostre(formValue);
        obtenerPostres();
        formik.resetForm();

        const formData = new FormData();
        formData.append("nombre", formValue.nombre);
        formData.append("precio", formValue.precio);
        formData.append("cantidad", formValue.cantidad);
        formData.append("ingredientes", formValue.ingredientes);

        if (formValue.imagenFile instanceof File) {
          formData.append("imagen", formValue.imagenFile);
        }

        let response;
        if (postreSeleccionado && postreSeleccionado._id) {
          response = await ctrPostre.updatePostre(postreSeleccionado._id, formData);
        } else {
          response = await ctrPostre.createPostre(formData);
        }

        console.log("Respuesta del backend:", response);

        setPostreSeleccionado(null);
        obtenerPostres();
        formik.resetForm();
      } catch (error) {
        console.error("Error al guardar el postre:", error);
      }
    },
  });

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    formik.setFieldValue("imagep", URL.createObjectURL(file));
    formik.setFieldValue("imagenFile", file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png, image/gif",
    onDrop,
  });

  const obtenerPostres = async () => {
    try {
      const listaPro = await ctrPostre.getPostre();
      console.log("Postres obtenidos:", listaPro);
      setListaPostres(listaPro || []);
    } catch (error) {
      console.error("Error al obtener los postres:", error);
      setListaPostres([]);
    }
  };

  const eliminarPostre = async (id) => {
    try {
      await ctrPostre.deletePostre(id);
      obtenerPostres();
    } catch (error) {
      console.error("Error al eliminar el postre:", error);
    }
  };

  const editarPostre = (postre) => {
    setPostreSeleccionado(postre);
    formik.setValues({
      nombre: postre.nombre,
      precio: postre.precio,
      cantidad: postre.cantidad,
      ingredientes: postre.ingredientes,
      imagep: postre.imagen,
      imagenFile: null,
    });
  };

  useEffect(() => {
    obtenerPostres();
  }, []);

  const getImagen = () => {
    if (formik.values.imagenFile) return formik.values.imagep;
    if (formik.values.imagep) return formik.values.imagep;
    return imagenes.noAvatar;
  };

  // Filtrar lista de postres por nombre
  const postresFiltrados = listaPostres.filter((postre) =>
  (postre.nombre || "").toLowerCase().includes(filtroNombre.toLowerCase())
);


  return (
    <div className="p-4">
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="12">
            <Form.Label>Nombre del postre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              placeholder="Nombre del postre"
              value={formik.values.nombre}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.nombre}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.nombre}
            </Form.Control.Feedback>
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
              isInvalid={!!formik.errors.precio}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.precio}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="number"
              name="cantidad"
              placeholder="Cantidad"
              value={formik.values.cantidad}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.cantidad}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.cantidad}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label>Ingredientes</Form.Label>
            <Form.Control
              type="text"
              name="ingredientes"
              placeholder="Ingredientes"
              value={formik.values.ingredientes}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.ingredientes}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.ingredientes}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label>Imagen</Form.Label>
            <div {...getRootProps()} className="form-imagen">
              <input {...getInputProps()} />
              <Image src={getImagen()} thumbnail width={100} />
            </div>
          </Form.Group>
        </Row>

        <Button type="submit">{postreSeleccionado ? "Actualizar" : "Enviar"}</Button>
      </Form>

      {/* Buscador */}
      <Row className="mt-4 mb-3">
        <Col md="6">
          <Form.Control
            type="text"
            placeholder="Buscar postre por nombre..."
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}
          />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <ListPostres
            postres={postresFiltrados}
            eliminarPostre={eliminarPostre}
            editarPostre={editarPostre}
          />
        </Col>
      </Row>
    </div>
  );
}
