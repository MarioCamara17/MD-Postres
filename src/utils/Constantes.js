export const ENV = {
    BASE_API: "http://localhost:5000/api", // Ruta base para las solicitudes al backend
    BASE_PATH: "http://localhost:5000/uploads", // Ruta base para las imágenes
    API_ROUTES: {
        CREATEPOSTRE: "createpostre",
        GETPOSTRE: "getpostre",
        DELETEPOSTRE: "delpostre",
        UPDATEPOSTRE: "updatepostre",
    },
};

export function getImageUrl(imagep) {
    if (!imagep || typeof imagep !== "string") return ""; // si está vacío o mal definido
    if (imagep.startsWith("uploads/")) {
      return `http://localhost:5000/${imagep}`; // ya incluye uploads/
    }
    return `http://localhost:5000/uploads/${imagep}`; // solo es el nombre
  }
  