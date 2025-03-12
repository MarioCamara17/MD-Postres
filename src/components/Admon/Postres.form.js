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
    nombre: Yup.string().required("El nombre es obligatorio"),
    precio: Yup.number().required("El precio es obligatorio"),
    cantidad: Yup.number().required("La cantidad es obligatoria"),
    ingredientes: Yup.string().required("Los ingredientes son obligatorios"),
    imagen: Yup.mixed().required("La imagen es obligatoria"),
  });
}