import React, {useEffect, useMemo} from 'react';
import { Button, Col, Row } from 'reactstrap';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import { saveAccountSettings, reset } from './settings.reducer';
import countryList from 'react-select-country-list'
import Select from 'react-select'
export const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.authentication.account);
  const successMessage = useAppSelector(state => state.settings.successMessage);

  const options = [
    { value: 'none', label: 'Not selected' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'notsay', label: 'Rather not say' }
  ]
  const optionsCountry = useMemo(() => countryList().getData(), [])
  useEffect(() => {
    dispatch(getSession());
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  const handleValidSubmit = values => {
    dispatch(
      saveAccountSettings({
        ...account,
        ...values,
      })
    );
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="settings-title">
            Ajustes del usuario [<strong>{account.login}</strong>]
          </h2>
          <ValidatedForm id="settings-form" onSubmit={handleValidSubmit} defaultValues={account}>
            <ValidatedField
              name="login"
              label="Usuario"
              id="username"
              placeholder="Su usuario"
              validate={{
                required: { value: true, message: 'Su nombre de usuario es obligatorio.' },
                pattern: {
                  value: /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/,
                  message: 'Su nombre de usuario no es válido.',
                },
                minLength: { value: 1, message: 'Su nombre de usuario debe tener al menos 1 caracter.' },
                maxLength: { value: 50, message: 'Su nombre de usuario no puede tener más de 50 caracteres.' },
              }}
              data-cy="username"
            />
            <ValidatedField
              name="firstName"
              label="Nombre"
              id="firstName"
              placeholder="Su nombre"
              validate={{
                required: { value: true, message: 'Se requiere que ingrese su nombre.' },
                minLength: { value: 1, message: 'Se requiere que su nombre tenga por lo menos 1 caracter' },
                maxLength: { value: 50, message: 'Su nombre no puede tener más de 50 caracteres' },
              }}
              data-cy="firstname"
            />
            <ValidatedField
              name="lastName"
              label="Apellidos"
              id="lastName"
              placeholder="Sus apellidos"
              validate={{
                required: { value: true, message: 'Se requiere que ingrese sus apellidos.' },
                minLength: { value: 1, message: 'Se requiere que sus apellidos tengan por lo menos 1 caracter' },
                maxLength: { value: 50, message: 'Sus apellidos no pueden tener más de 50 caracteres' },
              }}
              data-cy="lastname"
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
              name="image"
              label="Imagen de perfil"
              id="image"
              placeholder="Imagen"
              validate={{

              }}
              type="file"
              inputProps={{ accept: 'image/*' }}
              data-cy="image"
            />
            <label >Género</label>
            <Select className="mt-2 mb-3" options={options} />
            <label>País de residencia</label>
            <Select className="mt-2 mb-3" options={optionsCountry} />

            <ValidatedField
              name="ubication"
              label="Ubicacion"
              id="ubicación"
              placeholder="Lugar de residencia"
              validate={{

              }}
              data-cy="ubication"
            />

            <ValidatedField
              name="description"
              label="Descripción"
              id="description"
              placeholder="Descripción"
              validate={{

              }}
              type="textarea"
              data-cy="description"
            />

            <Button  color="primary" type="submit" data-cy="submit">
              Guardar
            </Button>

          </ValidatedForm>
        </Col>
      </Row>
    </div>
  );
};

export default SettingsPage;
