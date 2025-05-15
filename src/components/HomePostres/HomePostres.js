import React, { useState, useEffect } from "react";
import { Tabs, Tab, Row, Col } from "react-bootstrap";
import { ItemPostres } from "../ItemPostres";
import { Postre } from "../../api";
import "./HomePostres.scss";

const ctrPostre = new Postre();

export function HomePostres() {
  const [postres, setPostres] = useState([]);

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

  return (
    <div className="container" style={fondo.tema}>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="Lista de Postres">
          <Row xs={1} sm={2} md={3} lg={4}>
            {postres.map((postre, index) => (
              <Col key={index}>
                <div className="p-2">
                  <ItemPostres postre={postre} />{" "}
                  {/* Cambié producto a postre */}
                </div>
              </Col>
            ))}
          </Row>
        </Tab>
      </Tabs>
    </div>
  );
}
