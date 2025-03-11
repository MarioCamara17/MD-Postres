
import React from 'react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div style={{ //colores y diseño para las letras 
        textAlign: 'center', 
        backgroundColor: '#D2B48C', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontFamily: '"Poppins", sans-serif' 
    }}>
     
        <h1 style={{  //diferentes tipos de colos cafe para el fondo
            color: '#5C4033',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
        }}>
            Bienvenido a nuestro catálogo digital
        </h1>

        <h3 style={{ 
            color: '#8B5A2B', 
            fontSize: '1.5rem',
            fontWeight: '500'
        }}>
            Te invitamos a conocer nuestra gran variedad de productos disponibles
        </h3>
        
        
        <img src="/logo.jpg" alt="Logo" //para centrar la imagen
             style={{ 
                 width: '400px', 
                 marginTop: '30px', 
                 borderRadius: '10px', 
                 boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)' 
             }}/>

     
        <Link to="/catalogo">
            <button 
              style={{ 
                marginTop: '20px', 
                padding: '12px 24px', 
                fontSize: '18px', 
                fontWeight: 'bold',
                cursor: 'pointer',
                border: 'none',
                backgroundColor: '#8B4513', 
                color: 'white',
                borderRadius: '8px',
                textTransform: 'uppercase',
                boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)',
                transition: 'background-color 0.3s ease, transform 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#A0522D'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#8B4513'}
            >
              Ir a Catálogo
            </button>
        </Link>
    </div>
  );
}


