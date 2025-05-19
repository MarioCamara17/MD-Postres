import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUsuario } from "../../api/usuarios";
import { Card, Button, Form, Alert, Container, Row, Col } from "react-bootstrap";

export function Login() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!usuario || !contrasena) {
      setError("Por favor, llena todos los campos");
      return;
    }
    try {
      const res = await loginUsuario(usuario, contrasena);
      if (res.data.rol === "admin") {
        navigate("/admon");
      } else if (res.data.rol === "usuario") {
        navigate("/inicio");
      }
    } catch (err) {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="shadow p-4" style={{ background: "#f7fafc", borderRadius: "16px" }}>
            <Card.Body>
              <h2 className="mb-4 text-center">Iniciar Sesión</h2>
              <Form onSubmit={handleLogin}>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form.Group className="mb-3">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    placeholder="Ingresa tu usuario"
                    maxLength={20}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                    maxLength={20}
                  />
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100 mb-2">
                  Ingresar
                </Button>
                <div className="text-center">
                  <Link to="/registro">¿No tienes cuenta? Regístrate</Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}