import React, { useState, useEffect, useRef, useCallback } from "react";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import { Button, Form, Row, Col, InputGroup, Image } from "react-bootstrap";
import { initialValues, validationSchema } from "./Postres.form";
import { Postre } from "../../api";
import { ListPostres } from "../ListPostres/ListPostres";
import { imagenes } from "../../assets"; // Asegúrate de tener una imagen default

const ctrPostre = new Postre();

export function Admon() {
  const [listaPostres, setListaPostres] = useState([]);
  const [postreSeleccionado, setPostreSeleccionado] = useState(null);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const datos = { ...formValue };

        // Si hay un archivo, conviértelo a URL
        if (formValue.imagenFile instanceof File) {
          datos.imagen = URL.createObjectURL(formValue.imagenFile);
        }

        if (postreSeleccionado && postreSeleccionado._id) {
          await ctrPostre.deletePostre(postreSeleccionado._id);
          await ctrPostre.createPostre(datos);
        } else {
          await ctrPostre.createPostre(datos);
        }

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
      setListaPostres(listaPro || []);
    } catch (error) {
      console.error("Error al obtener los postres:", error);
      setListaPostres([]);
    }
  };

  const eliminarPostre = async (id) => {
    try {
      await ctrPostre.deletePostre(id);
      setListaPostres((prevLista) => prevLista.filter((postre) => postre._id !== id));
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
            <Form.Control
              type="number"
              name="cantidad"
              placeholder="Cantidad"
              value={formik.values.cantidad}
              onChange={formik.handleChange}
            />
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
            <div {...getRootProps()} className="form-imagen">
              <input {...getInputProps()} />
              <Image src={getImagen()} thumbnail width={100} />
            </div>
          </Form.Group>
        </Row>

        <Button type="submit">{postreSeleccionado ? "Actualizar" : "Enviar"}</Button>
      </Form>

      <Row className="mt-4">
        <Col>
          <ListPostres
            postres={listaPostres}
            eliminarPostre={eliminarPostre}
            editarPostre={editarPostre}
          />
        </Col>
      </Row>
    </div>
  );
}
