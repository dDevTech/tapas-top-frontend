import React, { useState, useEffect } from 'react';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { Row, Col, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { handleRegister } from './register.reducer';
import Select from 'react-select';
import { Country, State } from 'country-state-city';
import AnimatedProgress from 'app/shared/util/animated-progress';
import password from 'app/modules/account/password/password';
import { optionsGender } from 'app/shared/util/Selectores';

export const RegisterAccountInfo = () => {
  const dispatch = useAppDispatch();
  const ageVerified = useAppSelector(state => state.ageVerify.age_verification_success);
  const registerRequired = useAppSelector(state => state.register.registerRequiredFinished);

  const navigate = useNavigate();
  const successMessage = useAppSelector(state => state.register.successMessage);
  if (!successMessage) {
    if (!ageVerified) {
      navigate('/age-verify');
    } else if (!registerRequired) {
      navigate('/register');
    }
  }

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const state = useLocation().state;
  function handleSubmit({ name, surname1, surname2, introductionText, address, image }) {
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
    let countryString = null;
    let cityString = null;
    if (selectedCountry != null) {
      countryString = selectedCountry.name;
    } else {
      countryString = '';
    }

    if (selectedState != null) {
      cityString = selectedState.name;
    } else {
      cityString = '';
    }

    dispatch(
      handleRegister({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        login: state.login,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        email: state.em,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        password: state.password,
        firstName: name,
        lastName: surname1,
        lastName2: surname2,
        description: introductionText,
        imageUrl: image,
        langKey: 'en',
        address: { address, country: countryString, city: cityString },
        gender: genderId,
      })
    );
  }

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  function Progress() {
    if (successMessage) {
      return <AnimatedProgress label="VERIFICACIÓN CORREO" start={75} end={90} delay={50}></AnimatedProgress>;
    }
    return <AnimatedProgress label="DATOS OPCIONALES" start={45} end={75} delay={50}></AnimatedProgress>;
  }

  function isImage(i){
    let validate = true;
    
    if(!i.startsWith('http:') && !i.startsWith('https:')){
      validate = false
    }
    if(!i.endsWith('.jpg') && !i.endsWith('.jpeg') && !i.endsWith('.png') && !i.endsWith('.gif') && !i.endsWith('.svg') && !i.endsWith('.webp')){
      validate = false
    }

    return validate
  }

  return (
    <div>
      <Progress />
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
            <label>Género</label>
            <Select
              name="gender"
              className="mt-2 mb-3"
              placeholder="Introduzca su género"
              options={optionsGender}
              onChange={item => {
                setSelectedGender(item);
              }}
            />
            <label>Ubicación</label>
            <div className={'row'}>
              <Select
                name="country"
                className={'mt-3 mb-2 col-sm'}
                placeholder={'Seleccione el país'}
                options={Country.getAllCountries()}
                getOptionLabel={options => {
                  return options['name'];
                }}
                getOptionValue={options => {
                  return options['name'];
                }}
                onChange={item => {
                  setSelectedCountry(item);
                  setSelectedState(null);
                }}
                data-cy="country"
              />
              <Select
                name="city"
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
                data-cy="city"
              />
            </div>
            <ValidatedField name="address" label="Dirección" id="address" placeholder="Dirección de residencia" data-cy="address" />
            <div></div>
            <ValidatedField
              name="image"
              label="URL foto de perfil"
              id="image"
              placeholder="Imagen"
              validate={{
                validate: i => isImage(i) || 'La URL no es válida'
              }}
              accept="image/*"
              data-cy="image"
            />

            <Button id="register-submit" color="primary" type="submit" data-cy="submit">
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
