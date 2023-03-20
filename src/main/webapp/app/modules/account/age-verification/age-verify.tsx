import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { handleRegister, reset } from 'app/modules/account/register/register.reducer';
import { toast } from 'react-toastify';
import { Alert, Button, Col, Progress, Row } from 'reactstrap';
import { isEmail, ValidatedField, ValidatedForm } from 'react-jhipster';
import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import 'react-calendar/dist/Calendar.css';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';
import AnimatedProgress from 'app/shared/util/animated-progress';
import { verify_age } from 'app/modules/account/age-verification/age-verify.reducer';
import warning = toast.warning;
export const AgeVerifyPage = () => {
  const [verified, onVerify] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isAdult = (v: string) => {
    const today = new Date();
    const birth = new Date(v);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age >= 18;
  };
  function verify() {
    onVerify(true);
    dispatch(verify_age());
  }
  const navigate = useNavigate();
  if (verified) {
    navigate('/register');
  }

  return (
    <div>
      <Alert color="warning">Para acceder a la página debe verificar su edad</Alert>
      <AnimatedProgress label="VERIFICACIÓN EDAD" start={0} end={15} delay={50}></AnimatedProgress>
      <Row className="justify-content-center">
        <Col md="8">
          <h1 id="register-title" data-cy="registerTitle">
            Verificación edad
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <ValidatedForm id="age-form" onSubmit={verify}>
            <ValidatedField
              name="birth-date"
              label="Fecha de nacimiento"
              placeholder="Fecha de nacimiento"
              validate={{
                required: { value: true, message: 'Se requiere una fecha de nacimiento para continuar' },
                validate: v => isAdult(v) || 'Debe ser mayor de edad para continuar',
              }}
              data-cy="age"
              type="date"
            />
            <Button id="age-submit" color="primary" type="submit" data-cy="submit">
              Continuar
            </Button>
          </ValidatedForm>
        </Col>
      </Row>
    </div>
  );
};
