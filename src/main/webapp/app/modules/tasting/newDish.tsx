import { Button, Col, Row } from 'reactstrap';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { optionsTipo, optionsProcedencia } from 'app/shared/util/Selectores';
import { Rate } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getRestaurants, saveTapa } from 'app/shared/reducers/tapa.reducer';
import './tasting.scss';
import { isImage } from 'app/shared/util/image-verification';
import { NewEstablishment } from 'app/modules/tasting/newEstablishment';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const NewDish = () => {
  const dispatch = useAppDispatch();
  const restaurants = useAppSelector(state => state.tapas.restaurants);
  const loading = useAppSelector(state => state.tapas.loading);
  const createdRestaurantSuccess = useAppSelector(state => state.tapas.createdRestaurantSuccess);
  const createTapaSuccess = useAppSelector(state => state.tapas.createTapaSuccess);
  const [resturantePopup, show] = useState(false);
  const [selectedProcedencia, setSelectedProcedencia] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedEstablishment, setSelectedEstablishment] = useState(null);
  const [selectedDulce, setSelectedDulce] = useState(null);
  const [selectedSalado, setSelectedSalado] = useState(null);
  const [selectedAmargo, setSelectedAmargo] = useState(null);
  const [selectedAcido, setSelectedAcido] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (createdRestaurantSuccess) {
      toast.success('Se ha creado el restaurante correctamente');
      dispatch(getRestaurants());
    }
  }, [createdRestaurantSuccess]);

  useEffect(() => {
    if (createTapaSuccess) {
      toast.success('Se ha creado la tapa correctamente');
      navigate('/myTastings');
    }
  }, [createTapaSuccess]);

  useEffect(() => {
    dispatch(getRestaurants());
  }, []);
  const onValidatedFormSubmit = values => {
    const newEntity = {
      name: values.nombreTapa,
      description: values.descripcion,
      type: selectedType?.value,
      country: selectedProcedencia?.value,
      imageUrl: values.urlFoto,
      establishment: selectedEstablishment?.id,
      dulce: selectedDulce,
      amargo: selectedAmargo,
      acido: selectedAcido,
      salado: selectedSalado,
    };
    dispatch(saveTapa(newEntity));
  };

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
              onChange={value => setSelectedProcedencia(value)}
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
              onChange={value => setSelectedType(value)}
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
                  onChange={value => setSelectedEstablishment(value)}
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
                <Rate allowClear onChange={value => setSelectedDulce(value)} />{' '}
              </Col>
            </Row>
            <Row>
              <Col className={'col-2'}> Salado: </Col>
              <Col className={'col-10'}>
                {' '}
                <Rate allowClear onChange={value => setSelectedSalado(value)} />{' '}
              </Col>
            </Row>
            <Row>
              <Col className={'col-2'}> Amargo: </Col>
              <Col className={'col-10'}>
                {' '}
                <Rate allowClear onChange={value => setSelectedAmargo(value)} />{' '}
              </Col>
            </Row>
            <Row>
              <Col className={'col-2'}> Ácido: </Col>
              <Col className={'col-10'}>
                {' '}
                <Rate allowClear onChange={value => setSelectedAcido(value)} />{' '}
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
