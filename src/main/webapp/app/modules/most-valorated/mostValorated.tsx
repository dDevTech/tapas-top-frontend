import { Breadcrumb, BreadcrumbItem, Button, Col, Row } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import { List } from 'antd';
import { getRestaurants } from 'app/shared/reducers/establishment.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { optionsProcedencia, optionsTipo } from 'app/shared/util/Selectores';
import Select from 'react-select';
import { getMyTastings } from 'app/shared/reducers/user-info.reducer';
import { TastingElement } from 'app/modules/tasting/tastingElement';
import { Country, State } from 'country-state-city';

export const MostValorated = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.authentication.account);
  const tastingList = useAppSelector(state => state.userInfo.myTastings);
  const loading = useAppSelector(state => state.userInfo.loading);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    dispatch(getMyTastings(account?.login));
  }, []);

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
          <h1 id="most-valorated" data-cy="most-valorated" className="mb-4">
            Tapas más valoradas
          </h1>
        </Col>
      </Row>

      <Row className="selectors">
        <Col className="col-11">
          <Row className="selectors">
            <Col className="col-6">
              <label> Seleccione la procedencia: </label>
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
                className={'mt-2 mb-3 col-sm'}
                placeholder="Introduzca procedencia"
              />
            </Col>
            <Col className="col-6">
              <label>Tipo:</label>
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
                className={'mt-2 mb-3 col-sm'}
                placeholder="Introduzca tipo de comida"
              />
            </Col>
          </Row>
          <Row>
            <label> Ubicación: </label>
            <Col className="col-6">
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
                onChange={item => {
                  setSelectedCountry(item);
                  setSelectedState(null);
                }}
                required
                data-cy="country"
              />
            </Col>
            <Col className="col-6">
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
                value={selectedState}
                onChange={item => {
                  setSelectedState(item);
                }}
                data-cy="city"
              />
            </Col>
          </Row>
        </Col>
        <Col className="col-1 align-self-end mb-3">
          <Button type="button" color="secondary">
            Buscar
          </Button>
        </Col>
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

export default MostValorated;
