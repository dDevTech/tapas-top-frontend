import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Alert, Row, Col } from 'reactstrap';

import { useAppSelector } from 'app/config/store';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);

  return (
    <Row>
      <Col xs="1"></Col>
      <Col xs="10">
        {!account?.login ? (
          <>
            <Row>
              <p className="title">¡Bienvenido a TapasTop!</p>
            </Row>

            <Row className="margin-top-row shadow-box">
              <Col md="6">
                <img className="width-100" src="content/images/foto-tapa.avif" />
              </Col>
              <Col md="6">
                <Row className="row-introduction">
                  <p className="introduction">
                    TapasTop es una aplicación social que promociona los pequeños bares y restaurantes que ofertan productos de muy buena
                    calidad. Dentro de la aplicación podrás conocer cuál es la comida típica de una zona y valorla según tu gusto. Además
                    podrás encontrar locales con encanto visitados y comentados por nuestra comunidad.
                  </p>
                </Row>
                <Row className="row-citation">
                  <p className="citation">
                    &quot;El descubrimiento de un nuevo plato es de más provecho para la humanidad que el descubrimiento de una
                    estrella.&quot;
                  </p>
                  <span className="citation">(Jean Anthelme Brillat-Savarin)</span>
                </Row>
                <Row className="row-buttons">
                  <Col className="login-col" md="6">
                    <Link to="/login">
                      <Button className="login-button" color="primary" type="submit" data-cy="submit">
                        Iniciar sesión
                      </Button>
                    </Link>
                  </Col>
                  <Col className="register-col" md="6">
                    <Link to="/age-verify">
                      <Button className="register-button" color="primary" type="submit" data-cy="submit">
                        Crear una cuenta
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </Col>
            </Row>
          </>
        ) : (
          <>Hola</>
        )}
        <Row></Row>
      </Col>
      <Col xs="1"></Col>
    </Row>
  );
};

export default Home;
