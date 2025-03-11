import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePostres } from "../components/HomePostres";
import { Home } from "../page";
import { Plantilla } from "../layouts";
import { Login } from "../components/Login";


export function Rutas() {
  const Plant = (Plantilla, Page) => (
    <Plantilla>
      <Page />
    </Plantilla>
  );

  return (
    <Routes>
      <Route path="/" element={Plant(Plantilla, Home)} />
      <Route path="/inicio" element={Plant(Plantilla, Home)} />
      <Route path="/catalogo" element={Plant(Plantilla, HomePostres)} />
      <Route path="/admon" element={Plant(Plantilla, Home)} />
      <Route path="/registro" element={Plant(Plantilla, Home)} />
      <Route path="/login" element={Plant(Plantilla, Login)} />
    </Routes>
  );
}