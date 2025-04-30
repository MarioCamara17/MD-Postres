import * as Yup from "yup";

export function initialValues() {
  return {
    nombre: "",
    precio: "",
    cantidad: "",
    ingredientes: "",
    imagep: "",
    imagenFile: null,
  };
}

export function validationSchema() {
  return Yup.object({
    nombre: Yup.string().required("Nombre requerido"),
    precio: Yup.number().required("Precio requerido"),
    cantidad: Yup.number().required("Cantidad requerida"),
    ingredientes: Yup.string().required("Ingredientes requeridos"),
    imagenFile: Yup.mixed(), // Ya se gestiona la validación en el código
  });
}
