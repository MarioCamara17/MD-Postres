import React, { useState, useEffect, useCallback } from "react";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import { Button, Form, Row, Col, Image } from "react-bootstrap";
import { initialValues, validationSchema } from "./Postres.form";
import { Postre } from "../../api";
import { ListPostres } from "../ListPostres/ListPostres";
import { imagenes } from "../../assets";
import { getImageUrl } from "../../utils/Constantes";

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
        if (postreSeleccionado && postreSeleccionado._id) {
          // ACTUALIZAR
          await ctrPostre.updatePostre(postreSeleccionado._id, formValue);
        } else {
          // CREAR
          await ctrPostre.createPostre(formValue);
        }
        obtenerPostres();
        setPostreSeleccionado(null);
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
  
      const filtrados = (listaPro || []).filter(
        (p) => p && p.nombre && p.nombre.trim() !== ""
      );
  
      setListaPostres(filtrados);
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
    imagep: getImageUrl(postre.imagep), // Usa la función para obtener la URL completa
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
  <div
    {...getRootProps()}
    className="form-control d-flex align-items-center"
    style={{
      height: 42,
      cursor: "pointer",
      padding: 0,
      marginBottom: 0,
      background: "#fff", // igual que los otros campos
      border: "1px solid #ced4da", // igual que los otros campos
      borderRadius: ".375rem"
    }}
  >
    <input {...getInputProps()} />
    <Image
      src={getImagen()}
      style={{
        width: 36,
        height: 36,
        objectFit: "cover",
        borderRadius: 6,
        border: "1px solid #dee2e6",
        background: "#fff",
        marginRight: 10,
        marginLeft: 6
      }}
    />
    <span style={{ fontSize: 13, color: "#888" }}>
      {formik.values.imagenFile ? "Imagen seleccionada" : "Haz clic o arrastra"}
    </span>
  </div>
  <Form.Text className="text-muted" style={{ fontSize: 12 }}>
    Formato: jpg, png, gif
  </Form.Text>
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
