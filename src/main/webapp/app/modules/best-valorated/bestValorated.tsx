import { Breadcrumb, BreadcrumbItem, Button, Col, Row } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import { List } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { optionsProcedencia, optionsTipo } from 'app/shared/util/Selectores';
import Select from 'react-select';
import { getBestValorated } from 'app/shared/reducers/tapa.reducer';
import { TastingElement } from 'app/modules/tasting/tastingElement';
import { Country, State } from 'country-state-city';

export const BestValorated = () => {
  const dispatch = useAppDispatch();
  const tastingList = useAppSelector(state => state.tapas.bestValorated);
  const loading = useAppSelector(state => state.tapas.loading);

  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    dispatch(
      getBestValorated({
        city: null,
        precedence: null,
        type: null,
        country: null,
      })
    );
  }, []);

  const applyFilter = () => {
    dispatch(
      getBestValorated({
        city: selectedCity ? selectedCity.name : null,
        precedence: selectedOrigin ? selectedOrigin.value : null,
        type: selectedType ? selectedType.value : null,
        country: selectedCountry ? selectedCountry.name : null,
      })
    );
  };

  const clearFilter = () => {
    setSelectedCity(null);
    setSelectedOrigin(null);
    setSelectedType(null);
    setSelectedCountry(null);
  };

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem active>
          <FontAwesomeIcon icon="award" />
          <span>&nbsp;Más valoradas</span>
        </BreadcrumbItem>
      </Breadcrumb>
      <Row className="justify-content-center mb-3">
        <Col>
          <h1 id="best-valorated" data-cy="best-valorated" className="mb-4">
            Tapas más valoradas
          </h1>
        </Col>
      </Row>

      <Row className="selectors">
        <Col className="col-11">
          <Row className="selectors">
            <Col className="col-3">
              <Select
                name="procedencia"
                noOptionsMessage={() => 'No hay opciones'}
                options={optionsProcedencia}
                getOptionLabel={options => {
                  return options['label'];
                }}
                getOptionValue={options => {
                  return options['value'];
                }}
                value={selectedOrigin}
                onChange={item => {
                  setSelectedOrigin(item);
                }}
                className={'mt-2 mb-3 col-sm'}
                placeholder="Introduzca procedencia"
              />
            </Col>
            <Col className="col-3">
              <Select
                name="tipoComida"
                noOptionsMessage={() => 'No hay opciones'}
                options={optionsTipo}
                getOptionLabel={options => {
                  return options['label'];
                }}
                getOptionValue={options => {
                  return options['value'];
                }}
                value={selectedType}
                onChange={item => {
                  setSelectedType(item);
                }}
                className={'mt-2 mb-3 col-sm'}
                placeholder="Introduzca tipo de comida"
              />
            </Col>

            <Col className="col-3">
              <Select
                name="country"
                className={'mt-2 mb-3 col-sm'}
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
                  setSelectedCity(null);
                }}
                required
                data-cy="country"
              />
            </Col>
            <Col className="col-3">
              <Select
                name="city"
                className={'mt-2 mb-3 col-sm'}
                noOptionsMessage={() => 'No hay opciones'}
                placeholder={'Seleccione la ciudad'}
                options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
                getOptionLabel={options => {
                  return options['name'];
                }}
                getOptionValue={options => {
                  return options['name'];
                }}
                value={selectedCity}
                onChange={item => {
                  setSelectedCity(item);
                }}
                data-cy="city"
              />
            </Col>
          </Row>
        </Col>
        <Col className="col-1 mt-2">
          <Button type="button" color="secondary" onClick={clearFilter}>
            Limpiar
          </Button>
        </Col>
        <Row>
          <Col className="text-align-center">
            <Button className="w-25" type="button" color="primary" onClick={applyFilter}>
              Buscar
            </Button>
          </Col>
        </Row>
      </Row>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 3,
        }}
        loading={loading}
        split={false}
        dataSource={tastingList}
        renderItem={item => (
          <List.Item>
            <TastingElement item={item}></TastingElement>
          </List.Item>
        )}
      />
    </div>
  );
};

export default BestValorated;
