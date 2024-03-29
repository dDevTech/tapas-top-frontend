import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Row, Col, Alert } from 'reactstrap';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { activateAction, reset } from './activate.reducer';
import AnimatedProgress from 'app/shared/util/animated-progress';

const successAlert = (
  <div>
    <AnimatedProgress label="" start={100} end={100} delay={50}></AnimatedProgress>
    <Alert color="success">
      <strong>Su cuenta ha sido activada.</strong> Por favor,
      <Link to="/login" className="alert-link">
        iniciar sesión
      </Link>
      .
    </Alert>
  </div>
);

const failureAlert = (
  <Alert color="danger">
    <strong>Su cuenta no pudo ser activada.</strong> Por favor, utilice el formulario de inscripción para registrarse.
  </Alert>
);

export const ActivatePage = () => {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const key = searchParams.get('key');

    dispatch(activateAction(key));
    return () => {
      dispatch(reset());
    };
  }, []);

  const { activationSuccess, activationFailure } = useAppSelector(state => state.activate);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1>Activación</h1>
          {activationSuccess ? successAlert : undefined}
          {activationFailure ? failureAlert : undefined}
        </Col>
      </Row>
    </div>
  );
};

export default ActivatePage;
