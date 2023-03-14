import React, { useState, useEffect } from 'react';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { Row, Col, Alert, Button } from 'reactstrap';
import { toast } from 'react-toastify';

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { handleRegister, reset } from './register.reducer';
import ProgressBar from 'react-bootstrap/ProgressBar';

export const RegisterPage = () => {
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  useEffect(
    () => () => {
      dispatch(reset());
    },
    []
  );

  const handleValidSubmit = ({ username, email, firstPassword }) => {
    dispatch(handleRegister({ login: username, email, password: firstPassword, langKey: 'en' }));
  };

  const updatePassword = event => setPassword(event.target.value);
  const [selectedImage, setSelectedImage] = useState(null);

  const successMessage = useAppSelector(state => state.register.successMessage);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);


  return (
    <div>
      <Row className="justify-content-center">
        <ProgressBar animated  now={50} label={"Introducción datos personales"}></ProgressBar>
      </Row>

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
              name="name"
              label="Nombre (*)"
              placeholder="Nombre"
              validate={{
                required: { value: true, message: 'Su nombre es obligatorio.' },
                pattern: {
                  value: /^[ÁÉÍÓÚÑÜA-Za-záéíóúñü]+(\s+[ÁÉÍÓÚÑA-Z]?[a-záéíóúñ]+)*$/,
                  message: 'Su nombre no tiene el formato válido.',
                },
                minLength: { value: 1, message: 'Su nombre debe tener al menos 1 caracter.' },
                maxLength: { value: 50, message: 'Su nombre de usuario no puede tener más de 50 caracteres.' }
              }}
              data-cy="name"
            />
            <ValidatedField
              name="surname1"
              label="Apellido 1"
              placeholder="Apellido 1"
              validate={{
                pattern: {
                  value: /^[ÁÉÍÓÚÑÜA-Za-záéíóúñü]+(\s+[ÁÉÍÓÚÑA-Z]?[a-záéíóúñ]+)*$/,
                  message: 'El formato de su apellido no es válido.',
                },
                maxLength: { value: 50, message: 'Su apellido no puede tener más de 50 caracteres.' },
                // TODO: verificación no repetición
              }}
              data-cy="surname1"
            />
            <ValidatedField
              name="surname2"
              label="Apellido 2"
              placeholder="Apellido 2"
              validate={{
                pattern: {
                  value: /^[ÁÉÍÓÚÑÜA-Za-záéíóúñü]+(\s+[ÁÉÍÓÚÑA-Z]?[a-záéíóúñ]+)*$/,
                  message: 'El formato de su apellido no es válido.',
                },
                maxLength: { value: 50, message: 'Su apellido no puede tener más de 50 caracteres.' },
                // TODO: verificación no repetición
              }}
              data-cy="surname2"
            />
            <ValidatedField
              name="email"
              label="Correo electrónico"
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
              label="Nueva contraseña"
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
              label="Confirmación de la nueva contraseña"
              placeholder="Confirmación de la nueva contraseña"
              type="password"
              validate={{
                required: { value: true, message: 'Se requiere que confirme la contraseña.' },
                minLength: { value: 4, message: 'Se requiere que su contraseña de confirmación tenga por lo menos 4 caracteres' },
                maxLength: { value: 50, message: 'Su contraseña de confirmación no puede tener más de 50 caracteres' },
                validate: v => v === password || '¡La contraseña y la confirmación de contraseña no coinciden!',
              }}
              data-cy="secondPassword"
            />

            <ValidatedField
              name="introductionText"
              label="Breve texto de introducción"
              placeholder="Texto introducción"
              validate={{
                maxLength: { value: 2500, message: 'Su texto de introducción no puede tener más de 2500 caracteres' }
              }}
              data-cy="secondPassword"
            />

            {/*TODO: pasar imagen a tamaño correspondiente*/}
            {selectedImage && (
              <div>
                <img
                  alt="not found"
                  width={"250px"}
                  src={URL.createObjectURL(selectedImage)}
                />
                <br />
                <button onClick={() => setSelectedImage(null)}>Quitar</button>
              </div>
            )}

            <input
              type="file"
              name="myImage"
              onChange={(event) => {
                console.log(event.target.files[0]);
                setSelectedImage(event.target.files[0]);
              }}
            />

            <Button id="register-submit" color="primary" type="submit" data-cy="submit">
              Crear la cuenta
            </Button>
          </ValidatedForm>
          <p>&nbsp;</p>
          <Alert color="warning">
            <span>Si desea</span>
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
