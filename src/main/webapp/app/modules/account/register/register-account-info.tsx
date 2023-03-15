import React, {useState, useEffect} from 'react';
import {ValidatedField, ValidatedForm, isEmail} from 'react-jhipster';
import {Row, Col, Button} from 'reactstrap';
import {toast} from 'react-toastify';
import {Navigate, useLocation, useNavigate} from "react-router-dom";

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import {useAppDispatch, useAppSelector} from 'app/config/store';
import {handleRegister, reset} from './register.reducer';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Select from 'react-select'
import {Country, State, City} from "country-state-city";
import Resizer from "react-image-file-resizer";

type LocationState = { state: { login: string, em: string, password: string } }
export const RegisterAccountInfo = () => {
  const [password, setPassword] = useState('');
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
    dispatch(handleRegister({login: state.login, email: state.em, password: state.password, langKey: 'en'}));
  };


  const [selectedImage, setSelectedImage] = useState(null);



  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);


  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        128,
        128,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "blob"
      );
    });


  return (
    <div>
      <Row className="justify-content-center">
        <ProgressBar animated now={60} label={"Introducción datos personales"}></ProgressBar>
      </Row>

      <Row className="justify-content-center">
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
                maxLength: {value: 50, message: 'Su nombre de usuario no puede tener más de 50 caracteres.'}
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
                maxLength: {value: 50, message: 'Su apellido no puede tener más de 50 caracteres.'},
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
                maxLength: {value: 50, message: 'Su apellido no puede tener más de 50 caracteres.'},
                // TODO: verificación no repetición
              }}
              data-cy="surname2"
            />


            <ValidatedField
              name="introductionText"
              label="Breve texto de introducción"
              placeholder="Texto introducción"
              validate={{
                maxLength: {value: 2500, message: 'Su texto de introducción no puede tener más de 2500 caracteres'}
              }}
              data-cy="secondPassword"
            />

            <div>
              Seleccione la región
              <Select
                placeholder={'Seleccione el país'}
                options={Country.getAllCountries()}
                getOptionLabel={(options) => {
                  return options["name"];
                }}
                getOptionValue={(options) => {
                  return options["name"];
                }}
                value={selectedCountry}
                onChange={(item) => {
                  setSelectedCountry(item);
                }}
              />
              <br/>
              <Select
                noOptionsMessage={() => 'No hay opciones'}
                placeholder={'Seleccione la ciudad'}
                options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
                getOptionLabel={(options) => {
                  return options["name"];
                }}
                getOptionValue={(options) => {
                  return options["name"];
                }}
                value={selectedState}
                onChange={(item) => {
                  setSelectedState(item);
                }}
              />
              <br/>
            </div>

            <div>
              Foto de perfil <br/>
              {/*TODO: pasar imagen a tamaño correspondiente*/}
              {selectedImage && (
                <div>
                  <img
                    alt="not found"
                    width={"128px"}
                    src={URL.createObjectURL(selectedImage)}
                  />
                  <button onClick={() => setSelectedImage(null)}>Quitar</button>
                </div>
              )}

              <input
                type="file"
                name="myImage"
                onChange={(event) => {
                  // console.log(event.target.files[0]);
                  setSelectedImage(event.target.files[0]);
                }}
              />
              <br/>
            </div>

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
