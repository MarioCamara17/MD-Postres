import axios from "axios";

const API_URL = "http://localhost:5000/api/usuario";

export async function registrarUsuario(usuario, contrasena) {
  return axios.post(`${API_URL}/registro`, { usuario, contrasena });
}

export async function loginUsuario(usuario, contrasena) {
  return axios.post(`${API_URL}/login`, { usuario, contrasena });
}