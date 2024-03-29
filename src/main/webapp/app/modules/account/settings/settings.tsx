import React, { useEffect, useMemo, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import { saveAccountSettings, reset, updateAccount } from './settings.reducer';

import Select from 'react-select';
import { Country, State } from 'country-state-city';
import axios from 'axios';
import { optionsGender } from 'app/shared/util/Selectores';
import { isImage } from 'app/shared/util/image-verification';

export const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.authentication.account);
  const successMessage = useAppSelector(state => state.settings.successMessage);

  const [selectedCountry, setSelectedCountry] = useState(account.address.country);
  const [selectedState, setSelectedState] = useState(account.address.city);
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

  function handleValidSubmit({ login, firstName, lastName1, lastName2, email, imageUrl, address, description }) {
    let genderId = null;
    if (selectedGender != null) {
      if (selectedGender.label === 'Hombre') {
        genderId = 'MALE';
      } else if (selectedGender.label === 'Mujer') {
        genderId = 'FEMALE';
      } else if (selectedGender.label === 'No seleccionar') {
        genderId = 'NONE';
      } else {
        genderId = 'NOTSAY';
      }
    }

    const countryString = typeof selectedCountry === 'undefined' ? '' : selectedCountry;
    const cityString = typeof selectedState === 'undefined' ? '' : selectedState;

    dispatch(
      saveAccountSettings({
        login: account.login,
        userName: login,
        firstName: firstName,
        lastName: lastName1,
        lastName2: lastName2,
        email: email,
        address: { address, country: countryString, city: cityString },
        gender: genderId,
        description: description,
        imageUrl: imageUrl,
        langKey: 'en',
      })
    );
  }

  function getGender(gender) {
    let genderValue = null;
    if (gender === 'NONE') {
      genderValue = optionsGender[0];
    } else if (gender === 'MALE') {
      genderValue = optionsGender[1];
    } else if (gender === 'FEMALE') {
      genderValue = optionsGender[2];
    } else {
      genderValue = optionsGender[3];
    }
    return genderValue;
  }

  function getSelectedCountry() {
    if (selectedCountry !== '') {
      const countryObject = Country.getAllCountries().find(obj => obj.name.toString() === selectedCountry);
      return countryObject;
    } else {
      return null;
    }
  }

  function getCalleString() {
    if (typeof account.address !== 'undefined') {
      if (typeof account.address.address !== 'undefined') {
        return account.address.address;
      }
      return '';
    }
    return '';
  }

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="settings-title">
            Ajustes del usuario [<strong>{account.login}</strong>]
          </h2>
          <ValidatedForm id="settings-form" onSubmit={handleValidSubmit}>
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
              defaultValue={account.login}
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
              defaultValue={account.firstName}
            />
            <ValidatedField
              name="lastName"
              label="Apellido 1"
              id="lastName"
              placeholder="Su primer apellido"
              validate={{
                maxLength: { value: 50, message: 'Su apellido no puede tener más de 50 caracteres' },
              }}
              data-cy="surname1"
              defaultValue={account.lastName}
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
              defaultValue={account.lastName2}
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
              defaultValue={account.email}
            />
            <ValidatedField
              name="imageUrl"
              label="Imagen de perfil"
              id="image"
              placeholder="https://"
              validate={{
                validate: i => isImage(i) || 'La URL no es válida',
              }}
              data-cy="image"
              defaultValue={account.imageUrl}
            />
            <label>Género</label>
            <Select
              name="gender"
              className="mt-2 mb-3"
              placeholder="Introduzca su género"
              options={optionsGender}
              onChange={item => {
                setSelectedGender(item);
              }}
              defaultValue={getGender(account.gender)}
            />

            <label>Ubicación</label>
            <div className={'row'}>
              <Select
                name="country"
                className={'mt-3 mb-2 col-sm'}
                options={Country.getAllCountries()}
                getOptionLabel={options => {
                  return options['name'];
                }}
                getOptionValue={options => {
                  return options['name'];
                }}
                placeholder={selectedCountry}
                value={selectedCountry}
                onChange={item => {
                  setSelectedCountry(item.name.toString());
                  setSelectedState(null);
                }}
              />
              <Select
                name="city"
                className={'mt-3 mb-2 col-sm'}
                noOptionsMessage={() => 'No hay opciones'}
                options={State?.getStatesOfCountry(getSelectedCountry()?.isoCode)}
                getOptionLabel={options => {
                  return options['name'];
                }}
                getOptionValue={options => {
                  return options['name'];
                }}
                placeholder={selectedState}
                value={selectedState}
                onChange={item => {
                  setSelectedState(item.name);
                }}
              />
            </div>

            <ValidatedField
              name="address"
              label="Dirección"
              id="address"
              placeholder="Dirección de residencia"
              data-cy="address"
              defaultValue={getCalleString()}
            />

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
              defaultValue={account.description}
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
