import { ENV } from "../utils/Constantes";
import Axios from "axios";

export class Postre {
    baseApi = ENV.BASE_API;

    async createPostre(data) {
        try {
            const formData = new FormData();
            // Solo agrega los campos que no sean imagep (el blob)
            Object.keys(data).forEach((key) => {
                if (key !== "imagep") formData.append(key, data[key]);
            });

            // Adjunta el archivo real si existe
            if (data.imagenFile) {
                formData.append("imagep", data.imagenFile);
            }

            const response = await Axios.post(`${this.baseApi}/${ENV.API_ROUTES.CREATEPOSTRE}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("Se agregó el postre correctamente:", response.data);
            return response.data; // Devuelve el postre creado
        } catch (error) {
            console.error("Error al crear postre:", error);
            throw error;
        }
    }

    async getPostre() {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.GETPOSTRE}`;
            const response = await Axios.get(url);
            console.log("Postres obtenidos:", response.data); // Verifica que el campo `imagen` esté presente
            return response.data;
        } catch (err) {
            console.error("Error al obtener postres:", err);
            return [];
        }
    }
    async deletePostre(id) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.DELETEPOSTRE}/${id}`;
            await Axios.delete(url);
            console.log("Postre eliminado correctamente");
        } catch (error) {
            console.error("Error al eliminar postre:", error);
            throw error;
        }
    }

    async updatePostre(id, data) {
  try {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key !== "imagep") formData.append(key, data[key]);
    });

    // Adjunta el archivo real si existe
    if (data.imagenFile) {
      formData.append("imagep", data.imagenFile);
    }

    const response = await Axios.patch(`${this.baseApi}/${ENV.API_ROUTES.UPDATEPOSTRE}/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Postre actualizado correctamente");
    return response.data;
  } catch (error) {
    console.error("Error al actualizar postre:", error);
    throw error;
  }
}
}