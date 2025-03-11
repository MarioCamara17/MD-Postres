import React from 'react'
import { Link } from "react-router-dom";
export function Registro() {
  return (
 <div
    style={{
      //colores y diseño para las letras
      textAlign: "center",
      backgroundColor: "#D2B48C",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: '"Poppins", sans-serif',
    }}
  >
    <img
      src="/usuario.png"
      alt="Logo" //para centrar la imagen
      style={{
        width: "400px",
        marginTop: "30px",
        borderRadius: "10px",
      }}
    />

     <label style={{ fontSize: '18px', fontWeight: 'bold', display: 'block', color: '#4B3621' }}>
        Crear Usuario:
      </label>
      <input 
        type="text" 
        placeholder="Ingresa tu usuario"
        minLength={8} 
        maxLength={20}  
        style={{
          padding: '10px',
          fontSize: '16px',
          width: '250px',
          borderRadius: '5px',
          border: '1px solid #8B4513'
        }}
      />
        <label style={{ fontSize: '18px', fontWeight: 'bold', display: 'block', color: '#4B3621' }}>
        Crear Contraseña:
      </label>
      <input
        type="password" 
        placeholder="Ingresa tu contraseña" 
        minLength={8}
        maxLength={20} 
        style={{
          padding: '10px',
          fontSize: '16px',
          width: '250px',
          borderRadius: '5px',
          border: '1px solid #8B4513'
        }}
      />
      <label style={{ fontSize: '18px', fontWeight: 'bold', display: 'block', color: '#4B3621' }}>
        Confirmar Contraseña:
      </label>
      <input
        type="password" 
        placeholder="Confirma tu contraseña"
        minLength={8}
        maxLength={20} 
        style={{
          padding: '10px',
          fontSize: '16px',
          width: '250px',
          borderRadius: '5px',
          border: '1px solid #8B4513'
        }}
      />


<Link to="/">
    <button
      style={{
        padding: "12px 24px",
        fontSize: "18px",
        fontWeight: "bold",
        cursor: "pointer",
        border: "none",
        backgroundColor: "#8B4513",
        color: "white",
        borderRadius: "8px",
        textTransform: "uppercase",
        boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.3)",
        transition: "background-color 0.3s ease, transform 0.2s",
        margin: "10px",
      }}
      onMouseOver={(e) => (e.target.style.backgroundColor = "#A0522D")}
      onMouseOut={(e) => (e.target.style.backgroundColor = "#8B4513")}
    >
      Guardar
    </button> </Link>

   <Link to="/">
    <button
      style={{
        padding: "12px 24px",
        fontSize: "18px",
        fontWeight: "bold",
        cursor: "pointer",
        border: "none",
        backgroundColor: "#228B22",
        color: "white",
        borderRadius: "8px",
        textTransform: "uppercase",
        boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.3)",
        transition: "background-color 0.3s ease, transform 0.2s",
        margin: "10px",
      }}
      onMouseOver={(e) => (e.target.style.backgroundColor = "#2E8B57")}
      onMouseOut={(e) => (e.target.style.backgroundColor = "#228B22")}
    >
     Inicia Sesión
    </button>
    </Link></div>
  )}
