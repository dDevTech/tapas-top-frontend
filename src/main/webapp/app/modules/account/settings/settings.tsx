import React, { useEffect, useMemo, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import { saveAccountSettings, reset, updateAccount } from './settings.reducer';

import Select from 'react-select';
import { Country, State } from 'country-state-city';

export const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.authentication.account);
  const successMessage = useAppSelector(state => state.settings.successMessage);

  const optionsGender = [
    { value: 'none', label: 'No seleccionar' },
    { value: 'male', label: 'Hombre' },
    { value: 'female', label: 'Mujer' },
    { value: 'notsay', label: 'Prefiero no indicarlo' },
  ];

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);

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

  function handleValidSubmit({ login, firstName, lastName1, lastName2, email, image, address, description }){
    
    let genderId = null;
    if (selectedGender != null) {
      if (selectedGender.label === 'Hombre') {
        genderId = 'MALE';
      } else {
        genderId = 'FEMALE';
      }
    }
    let countryString = null;
    let cityString = null;
    if (selectedCountry != null) {
      countryString = selectedCountry.name;
    }
    if (selectedState != null) {
      cityString = selectedState.name;
    }
    /*let data = {
      login: account.login,
      userName: login,
      firstName: firstName,
      lastName: lastName1,
      lastName2: lastName2,
      email: email,
      address: { address, country: countryString, city: cityString },
      gender: genderId,
      description: description,
      imageUrl: image,
      langKey: 'en'
    }
    console.log(data)*/
    dispatch(
      updateAccount({
        login: account.login,
        userName: login,
        firstName: firstName,
        lastName: lastName1,
        lastName2: lastName2,
        email: email,
        address: { address, country: countryString, city: cityString },
        gender: genderId,
        description: description,
        imageUrl: image,
        langKey: 'en'
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
                maxLength: { value: 50, message: 'Su nombre no puede tener más de 50 caracteres' },
              }}
              data-cy="firstname"
            />
            <ValidatedField
              name="lastName1"
              label="Apellido 1"
              id="lastName"
              placeholder="Su primer apellido"
              validate={{
                maxLength: { value: 50, message: 'Su apellido no puede tener más de 50 caracteres' },
              }}
              data-cy="surname1"
            />
            <ValidatedField
              name="lastName2"
              label="Apellido 2"
              id="lastName"
              placeholder="Su segundo apellido"
              validate={{
                maxLength: { value: 50, message: 'Su apellido no puede tener más de 50 caracteres' },
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
            <Select 
              name="gender" 
              className="mt-2 mb-3" 
              placeholder="Introduzca su género" 
              options={optionsGender} 
              onChange={item => {
                setSelectedGender(item);
              }}/>

            <label>Ubicación</label>
            <div className={'row'}>
              <Select
                name='country'
                className={'mt-3 mb-2 col-sm'}
                placeholder={'Seleccione el país'}
                options={Country.getAllCountries()}
                getOptionLabel={options => {
                  return options['name'];
                }}
                getOptionValue={options => {
                  return options['name'];
                }}
                value={selectedCountry}
                onChange={item => {
                  setSelectedCountry(item);
                  setSelectedState(null);
                }}
              />
              <Select
                name='city'
                className={'mt-3 mb-2 col-sm'}
                noOptionsMessage={() => 'No hay opciones'}
                placeholder={'Seleccione la ciudad'}
                options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
                getOptionLabel={options => {
                  return options['name'];
                }}
                getOptionValue={options => {
                  return options['name'];
                }}
                value={selectedState}
                onChange={item => {
                  setSelectedState(item);
                }}
              />
            </div>

            <ValidatedField name="address" label="Dirección" id="address" placeholder="Dirección de residencia" data-cy="address" />

            <ValidatedField
              name="description"
              label="Descripción"
              id="description"
              placeholder="Descripción"
              validate={{
                maxLength: { value: 2500, message: 'Su apellido no puede tener más de 2500 caracteres' },
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
