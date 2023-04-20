import { Button, Col, Row } from 'reactstrap';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { optionsTipo, optionsProcedencia } from 'app/shared/util/Selectores';
import { Rate } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getRestaurants } from 'app/shared/reducers/tapa.reducer';
import './tasting.scss';
import { isImage } from 'app/shared/util/image-verification';
import { NewEstablishment } from 'app/modules/tasting/newEstablishment';

export const NewDish = () => {
  const dispatch = useAppDispatch();
  const restaurants = useAppSelector(state => state.tapas.restaurants);
  const loading = useAppSelector(state => state.tapas.loading);
  const createdRestaurantSuccess = useAppSelector(state => state.tapas.createdRestaurantSuccess);

  const [resturantePopup, show] = useState(false);
  useEffect(() => {
    if (createdRestaurantSuccess) {
      dispatch(getRestaurants());
    }
  }, [createdRestaurantSuccess]);
  useEffect(() => {
    dispatch(getRestaurants());
  }, []);
  const onValidatedFormSubmit = () => {};

  return (
    <div>
      {resturantePopup && <NewEstablishment funct={show}></NewEstablishment>}
      <Row className="justify-content-center">
        <Col md="8">
          <h1 id="register-title" data-cy="registerTitle">
            Nueva tapa
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <ValidatedForm id="register-form" onSubmit={onValidatedFormSubmit}>
            <ValidatedField
              name="nombreTapa"
              label="Nombre de la tapa (*)"
              placeholder="Tapa"
              validate={{
                required: { value: true, message: 'El nombre de la tapa es obligatorio.' },
                pattern: {
                  value: /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/,
                  message: 'El nombre no es válido.',
                },
                minLength: { value: 5, message: 'La tapa debe tener al menos 5 caracteres.' },
                maxLength: { value: 50, message: 'La tapa no puede tener más de 50 caracteres.' },
              }}
            />
            <ValidatedField
              name="descripcion"
              label="Descripción (*)"
              placeholder="Descripción"
              validate={{
                required: { value: true, message: 'La descripción es obligatoria' },
                minLength: { value: 10, message: 'La descripción debe tener al menos 10 caracteres.' },
                maxLength: { value: 150, message: 'La descripción no puede tener más de 150 caracteres.' },
              }}
              type="textarea"
            />
            <ValidatedField
              name="urlFoto"
              label="Foto de la tapa (*)"
              placeholder="https://"
              validate={{
                required: { value: true, message: 'Se debe añadir una foto' },
                validate: i => isImage(i) || 'La URL no es válida',
              }}
            />
            <label>Procedencia (*) </label>
            <Select
              name="tipoComida"
              noOptionsMessage={() => 'No hay opciones'}
              options={optionsProcedencia}
              getOptionLabel={options => {
                return options['label'];
              }}
              getOptionValue={options => {
                return options['value'];
              }}
              className={'mt-2 mb-3 col-sm'}
              placeholder="Introduzca tipo"
              required={true}
            />
            <label>Tipo (*)</label>
            <Select
              name="procedencia"
              noOptionsMessage={() => 'No hay opciones'}
              options={optionsTipo}
              getOptionLabel={options => {
                return options['label'];
              }}
              getOptionValue={options => {
                return options['value'];
              }}
              className={'mt-2 mb-3 col-sm'}
              placeholder="Introduzca procedencia"
              required={true}
            />
            <label>Establecimiento asociado (*)</label>
            <Row className="row-mx-auto restaurant">
              <Col className="col-8">
                <Select
                  name="establecimiento"
                  noOptionsMessage={() => {
                    if (!loading) {
                      return 'No hay opciones. Si no existe crea un nuevo establecimiento';
                    } else {
                      return 'Cargando establecimientos...';
                    }
                  }}
                  options={restaurants}
                  getOptionLabel={options => {
                    if (options['address'].city === undefined) {
                      return options['name'] + '   ' + options['address'].country;
                    } else {
                      return options['name'] + '   ' + options['address'].city + ', ' + options['address'].country;
                    }
                  }}
                  getOptionValue={options => {
                    return options['id'];
                  }}
                  className={'mt-2 mb-3 col-sm'}
                  placeholder="Introduzca establecimiento"
                  required={true}
                />
              </Col>
              <Col className="col-md-auto">
                <Button type="button" color="secondary" onClick={() => show(true)}>
                  Nuevo establecimiento
                </Button>
              </Col>
            </Row>
            <label className="mb-2">Calificadores de gusto</label>
            <br />
            <Row>
              <Col className={'col-2'}> Dulce: </Col>
              <Col className={'col-10'}>
                {' '}
                <Rate allowClear />{' '}
              </Col>
            </Row>
            <Row>
              <Col className={'col-2'}> Salado: </Col>
              <Col className={'col-10'}>
                {' '}
                <Rate allowClear />{' '}
              </Col>
            </Row>
            <Row>
              <Col className={'col-2'}> Amargo: </Col>
              <Col className={'col-10'}>
                {' '}
                <Rate allowClear />{' '}
              </Col>
            </Row>
            <Row>
              <Col className={'col-2'}> Ácido: </Col>
              <Col className={'col-10'}>
                {' '}
                <Rate allowClear />{' '}
              </Col>
            </Row>
            <Button className="mt-5" id="register-submit" color="primary" type="submit" data-cy="submit">
              Crear tapa
            </Button>
          </ValidatedForm>
        </Col>
      </Row>
    </div>
  );
};
