import React, {useEffect, useMemo} from 'react';
import {Button, Col, Row} from 'reactstrap';
import {ValidatedField, ValidatedForm, isEmail} from 'react-jhipster';
import {toast} from 'react-toastify';

import {useAppDispatch, useAppSelector} from 'app/config/store';
import {getSession} from 'app/shared/reducers/authentication';
import {saveAccountSettings, reset} from './settings.reducer';
import countryList from 'react-select-country-list'
import Select from 'react-select'

export const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.authentication.account);
  const successMessage = useAppSelector(state => state.settings.successMessage);

  const options = [
    {value: 'none', label: 'No seleccionar'},
    {value: 'male', label: 'Hombre'},
    {value: 'female', label: 'Mujer'},
    {value: 'notsay', label: 'Prefiero no indicarlo'}
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
                required: {value: true, message: 'Su nombre de usuario es obligatorio.'},
                pattern: {
                  value: /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/,
                  message: 'Su nombre de usuario no es válido.',
                },
                minLength: {value: 1, message: 'Su nombre de usuario debe tener al menos 1 caracter.'},
                maxLength: {value: 50, message: 'Su nombre de usuario no puede tener más de 50 caracteres.'},
              }}
              data-cy="username"
            />
            <ValidatedField
              name="firstName"
              label="Nombre"
              id="firstName"
              placeholder="Su nombre"
              validate={{
                maxLength: {value: 50, message: 'Su nombre no puede tener más de 50 caracteres'},
              }}
              data-cy="firstname"
            />
            <ValidatedField
              name="lastName"
              label="Apellido 1"
              id="lastName"
              placeholder="Su primer apellido"
              validate={{
                maxLength: {value: 50, message: 'Su apellido no puede tener más de 50 caracteres'},
              }}
              data-cy="surname1"
            />
            <ValidatedField
              name="lastName"
              label="Apellido 2"
              id="lastName"
              placeholder="Su segundo apellido"
              validate={{
                maxLength: {value: 50, message: 'Su apellido no puede tener más de 50 caracteres'},
              }}
              data-cy="surname2"
            />
            <ValidatedField
              name="email"
              label="Correo electrónico"
              placeholder="Su correo electrónico"
              type="email"
              readOnly={true}
              data-cy="email"
            />
            <ValidatedField
              name="image"
              label="Imagen de perfil"
              id="image"
              placeholder="Imagen"
              validate={{}}
              type="file"
              accept={'image/*'}
              data-cy="image"
            />
            <label>Género</label>
            <Select className="mt-2 mb-3" options={options}/>
            <label>País de residencia</label>
            <Select className="mt-2 mb-3" options={optionsCountry}/>

            <ValidatedField
              name="ubication"
              label="Ubicación"
              id="ubication"
              placeholder="Lugar de residencia"
              data-cy="ubication"
            />

            <ValidatedField
              name="description"
              label="Descripción"
              id="description"
              placeholder="Descripción"
              validate={{
                maxLength: {value: 2500, message: 'Su apellido no puede tener más de 2500 caracteres'},
              }}
              type="textarea"
              data-cy="description"
            />

            <Button color="primary" type="submit" data-cy="submit">
              Guardar
            </Button>

          </ValidatedForm>
        </Col>
      </Row>
    </div>
  );
};

export default SettingsPage;
