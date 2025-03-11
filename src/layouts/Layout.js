import React from 'react';
import { Menu } from "../components/Inicio/Menu";
import { Footer } from "../page/Footer";

export function Plantilla({ children }) {
  return (
    <div style={{ backgroundColor: '#D2B48C', minHeight: '100vh' }}>
      <div className="menu">
        <Menu />
      </div>
      <div className="body">{children}</div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}