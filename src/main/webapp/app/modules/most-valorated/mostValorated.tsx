import {Breadcrumb, BreadcrumbItem, Button, Col, Row} from 'reactstrap';
import React, { useCallback, useEffect, useState } from 'react';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { Descriptions, Image, List, Rate } from 'antd';
import {getRestaurants, getSearchCoincidences} from 'app/shared/reducers/tapa.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { toast } from 'react-toastify';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {optionsProcedencia, optionsTipo} from "app/shared/util/Selectores";
import Select from "react-select";

export const MostValorated = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.authentication.account);
  const restaurants = useAppSelector(state => state.tapas.restaurants);
  useEffect(() => {
    dispatch(getRestaurants());
  }, []);

  return (
    <div>
      <h1 id="most-valorated" data-cy="most-valorated" className='mb-4'>
        Tapas más valoradas
      </h1>
      <Row className='selectors'>
        <Col className='col-11'>
          <Row className='selectors'>
            <Col className='col-4'>
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
                className={'mt-3 mb-2 col-sm'}
                placeholder="Introduzca procedencia"
              />
            </Col>
            <Col className='col-4'>
              <label>Tipo</label>
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
                className={'mt-3 mb-2 col-sm'}
                placeholder="Introduzca tipo de comida"
              />
            </Col>
            <Col className='col-4'>
              <label>Restaurante:</label>
              <Select
                name="restaurantes"
                options={restaurants}
                getOptionLabel={options => {
                  return options['name'] + '   ' + options['address'].city + ', ' + options['address'].country;
                }}
                getOptionValue={options => {
                  return options['id'];
                }}
                className={'mt-3 mb-2 col-sm'}
                placeholder="Introduzca restaurante"
              />
            </Col>
          </Row>
        </Col>
        <Col className='col-1 align-self-end mb-2'>
          <Button type="button" color="secondary">
            Buscar
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default MostValorated;
