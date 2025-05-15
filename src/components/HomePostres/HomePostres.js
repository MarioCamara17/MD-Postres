import React, { useState, useEffect } from "react";
import { Tabs, Tab, Row, Col, Form } from "react-bootstrap";
import { ItemPostres } from "../ItemPostres";
import { Postre } from "../../api";
import "./HomePostres.scss";

const ctrPostre = new Postre();

export function HomePostres() {
  const [postres, setPostres] = useState([]);
  const [busqueda, setBusqueda] = useState(""); // Estado para el texto de búsqueda

  useEffect(() => {
    const obtenerPostres = async () => {
      try {
        const listaPostres = await ctrPostre.getPostre();
        setPostres(listaPostres || []);
      } catch (error) {
        console.error("Error al obtener los postres:", error);
      }
    };

    obtenerPostres();
  }, []);

  const fondo = {
    tema: {
      backgroundColor: "black",
      color: "white",
      fontSize: "20px",
    },
  };

  // Filtrar postres según el texto de búsqueda
  const postresFiltrados = postres.filter((postre) =>
    postre.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container" style={fondo.tema}>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="Lista de Postres">
          {/* Input de búsqueda */}
          <Form className="mb-3">
            <Form.Control
              type="text"
              placeholder="Buscar postre por nombre..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </Form>
          <Row xs={1} sm={2} md={3} lg={4}>
            {postresFiltrados.length > 0 ? (
              postresFiltrados.map((postre, index) => (
                <Col key={index}>
                  <div className="p-2">
                    <ItemPostres postre={postre} />
                  </div>
                </Col>
              ))
            ) : (
              <Col>
                <div className="p-2 text-center text-muted">
                  No se encontraron postres.
                </div>
              </Col>
            )}
          </Row>
        </Tab>
      </Tabs>
    </div>
  );
}