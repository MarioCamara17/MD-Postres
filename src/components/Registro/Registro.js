import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registrarUsuario } from "../../api/usuarios";
import { Card, Button, Form, Alert, Container, Row, Col } from "react-bootstrap";

export function Registro() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");
    if (!usuario || !contrasena || !confirmar) {
      setError("Por favor, llena todos los campos");
      return;
    }
    if (contrasena !== confirmar) {
      setError("Las contraseñas no coinciden");
      return;
    }
    try {
      await registrarUsuario(usuario, contrasena);
      setExito("Usuario registrado correctamente");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError("El usuario ya existe o hubo un error");
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="shadow p-4" style={{ background: "#f7fafc", borderRadius: "16px" }}>
            <Card.Body>
              <h2 className="mb-4 text-center">Registro de usuario</h2>
              <Form onSubmit={handleRegistro}>
                {error && <Alert variant="danger">{error}</Alert>}
                {exito && <Alert variant="success">{exito}</Alert>}
                <Form.Group className="mb-3">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    placeholder="Usuario"
                    maxLength={20}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    placeholder="Contraseña"
                    maxLength={20}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirmar contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmar}
                    onChange={(e) => setConfirmar(e.target.value)}
                    placeholder="Confirmar contraseña"
                    maxLength={20}
                  />
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100 mb-2">
                  Registrarse
                </Button>
                <div className="text-center">
                  <Link to="/">¿Ya tienes cuenta? Inicia sesión</Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}