import React from "react";
import { Tabs, Tab, Row, Col } from "react-bootstrap";
import { ItemPostres } from "../ItemPostres";
import { Panes } from "../../utils/Postres";
import "./HomePostres.scss";

export function HomePostres() {

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
            {Panes.map((producto, index) => (
              <Col key={index}>
                <div className="p-2">
                  <ItemPostres producto={producto} />
                </div>
              </Col>
            ))}
          </Row>
        </Tab>
      </Tabs>
    </div>
  );
}