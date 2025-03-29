import * as Yup from "yup";

export function initialValues() {
  return {
    nombre: "",
    precio: "",
    cantidad: "",
    ingredientes: "",
    imagen: "",
  };
}

export function validationSchema() {
  return Yup.object({
    nombre: Yup.string(),
    precio: Yup.number(),
    cantidad: Yup.number(),
    ingredientes: Yup.string(),
    imagen: Yup.mixed(),
  });
}