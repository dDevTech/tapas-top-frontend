import React, { useState, useEffect } from 'react';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { Row, Col, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { handleRegister, reset } from './register.reducer';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Select from 'react-select';
import { Country, State } from 'country-state-city';

export const RegisterAccountInfo = () => {
  const dispatch = useAppDispatch();

  useEffect(
    () => () => {
      dispatch(reset());
    },
    []
  );
  const successMessage = useAppSelector(state => state.register.successMessage);

  const state = useLocation().state;
  const handleSubmit = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(handleRegister({ login: state.login, email: state.em, password: state.password, langKey: 'en' }));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  return (
    <div>
      <Row className="justify-content-center">
        <ProgressBar animated now={60} label={'Introducción datos personales'}></ProgressBar>
      </Row>

      <Row className="justify-content-center mt-3">
        <Col md="8">
          <h1 id="register-title" data-cy="registerTitle">
            Datos personales
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <ValidatedForm id="register-form" onSubmit={handleSubmit}>
            <ValidatedField
              name="name"
              label="Nombre"
              placeholder="Nombre"
              validate={{
                pattern: {
                  value: /^[ÁÉÍÓÚÑÜA-Za-záéíóúñü]+(\s+[ÁÉÍÓÚÑA-Z]?[a-záéíóúñ]+)*$/,
                  message: 'Su nombre no tiene el formato válido.',
                },
                maxLength: { value: 50, message: 'Su nombre de usuario no puede tener más de 50 caracteres.' },
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
              }}
              data-cy="surname2"
            />

            <ValidatedField
              name="introductionText"
              label="Breve texto de introducción"
              placeholder="Texto introducción"
              validate={{
                maxLength: { value: 2500, message: 'Su texto de introducción no puede tener más de 2500 caracteres' },
              }}
              type="textarea"
              data-cy="description"
            />

            <label>Seleccione la región</label>
            <div className={'row'}>
              <Select
                className={'mt-3 mb-2 col-sm'}
                placeholder={'Seleccione el país'}
                options={Country.getAllCountries()}
                getOptionLabel={options => {
                  return options['name'];
                }}
                onChange={item => {
                  setSelectedCountry(item);
                }}
              />
              <Select
                className={'mt-3 mb-2 col-sm'}
                noOptionsMessage={() => 'No hay opciones'}
                placeholder={'Seleccione la ciudad'}
                options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
                getOptionLabel={options => {
                  return options['name'];
                }}
                onChange={item => {
                  setSelectedState(item);
                }}
              />
            </div>
            <ValidatedField name="ubication" label="Ubicación" id="ubication" placeholder="Lugar de residencia" data-cy="ubication" />
            <div></div>
            <ValidatedField
              name="image"
              label="Foto de perfil"
              id="image"
              placeholder="Imagen"
              validate={{}}
              type="file"
              accept="image/*"
              data-cy="image"
            />

            <Button onSubmit={handleSubmit} id="register-submit" color="primary" type="submit" data-cy="submit">
              Continuar
            </Button>
          </ValidatedForm>
          <p>&nbsp;</p>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterAccountInfo;
