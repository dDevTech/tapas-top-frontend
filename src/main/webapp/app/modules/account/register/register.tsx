import React, { useState, useEffect } from 'react';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { Row, Col, Alert, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import AnimatedProgress from 'app/shared/util/animated-progress';
import { registerFinished } from 'app/modules/account/register/register.reducer';

export const RegisterPage = () => {
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const ageVerified = useAppSelector(state => state.ageVerify.age_verification_success);

  useEffect(() => () => {}, []);
  const navigate = useNavigate();
  if (!ageVerified) {
    navigate('/age-verify');
  }

  const handleValidSubmit = ({ username, email, firstPassword }) => {
    dispatch(registerFinished());
    navigate('/register-account-info', { state: { login: username, em: email, password: firstPassword } });
  };

  const updatePassword = event => setPassword(event.target.value);

  return (
    <div>
      <AnimatedProgress label="DATOS NECESARIOS" start={15} end={45} delay={50}></AnimatedProgress>
      <Row className="justify-content-center">
        <Col md="8">
          <h1 id="register-title" data-cy="registerTitle">
            Registro
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <ValidatedForm id="register-form" onSubmit={handleValidSubmit}>
            <ValidatedField
              name="username"
              label="Usuario (*)"
              placeholder="Nombre de usuario"
              validate={{
                required: { value: true, message: 'Su nombre de usuario es obligatorio.' },
                pattern: {
                  value: /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/,
                  message: 'Su nombre de usuario no es válido.',
                },
                minLength: { value: 1, message: 'Su nombre de usuario debe tener al menos 1 caracter.' },
                maxLength: { value: 50, message: 'Su nombre de usuario no puede tener más de 50 caracteres.' },
                // TODO: verificación no repetición
              }}
              data-cy="username"
            />

            <ValidatedField
              name="email"
              label="Correo electrónico (*)"
              placeholder="Su correo electrónico"
              type="email"
              validate={{
                required: { value: true, message: 'Se requiere un correo electrónico.' },
                minLength: { value: 5, message: 'Se requiere que su correo electrónico tenga por lo menos 5 caracteres' },
                maxLength: { value: 254, message: 'Su correo electrónico no puede tener más de 50 caracteres' },
                validate: v => isEmail(v) || 'Su correo electrónico no es válido.',
              }}
              data-cy="email"
            />
            <ValidatedField
              name="firstPassword"
              label="Nueva contraseña (*)"
              placeholder="Nueva contraseña"
              type="password"
              onChange={updatePassword}
              validate={{
                required: { value: true, message: 'Se requiere que ingrese una contraseña.' },
                minLength: { value: 4, message: 'Se requiere que su contraseña tenga por lo menos 4 caracteres' },
                maxLength: { value: 50, message: 'Su contraseña no puede tener más de 50 caracteres' },
              }}
              data-cy="firstPassword"
            />
            <PasswordStrengthBar password={password} />
            <ValidatedField
              name="secondPassword"
              label="Confirmación de la nueva contraseña (*)"
              placeholder="Confirmación de la nueva contraseña"
              type="password"
              validate={{
                required: { value: true, message: 'Se requiere que confirme la contraseña.' },
                minLength: {
                  value: 4,
                  message: 'Se requiere que su contraseña de confirmación tenga por lo menos 4 caracteres',
                },
                maxLength: { value: 50, message: 'Su contraseña de confirmación no puede tener más de 50 caracteres' },
                validate: v => v === password || '¡La contraseña y la confirmación de contraseña no coinciden!',
              }}
              data-cy="secondPassword"
            />

            <Button id="register-submit" color="primary" type="submit" data-cy="submit">
              Continuar
            </Button>
          </ValidatedForm>
          <p>&nbsp;</p>
          <Alert color="warning">
            <span>Si desea </span>
            <a className="alert-link">iniciar sesión</a>
            <span>
              , puede intentar con las cuentas predeterminadas:
              <br />- Administrador (usuario=&quot;admin&quot; y contraseña=&quot;admin&quot;) <br />- Usuario (usuario=&quot;user&quot; y
              contraseña=&quot;user&quot;).
            </span>
          </Alert>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterPage;
