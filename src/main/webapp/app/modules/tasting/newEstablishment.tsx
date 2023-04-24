import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import { Country, State } from 'country-state-city';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { optionsEstablishmentType } from 'app/shared/util/Selectores';
import { useAppDispatch } from 'app/config/store';
import { createRestaurant } from 'app/shared/reducers/tapa.reducer';

export const NewEstablishment = ({ funct }) => {
  const [show, setShow] = useState(true);
  const dispatch = useAppDispatch();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const handleClose = () => {
    funct(false);
    setShow(false);
  };

  const handleSubmit = ({ name, address }) => {
    dispatch(
      createRestaurant({
        name,
        type: selectedType.value,
        address: { address, country: selectedCountry.name, city: selectedState?.name },
      })
    );
    funct(false);
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Nuevo establecimiento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ValidatedForm id="restaurant-form" onSubmit={handleSubmit}>
          <ValidatedField
            name="name"
            label="Nombre (*)"
            placeholder="Nombre del establecimiento"
            validate={{
              required: { value: true, message: 'El nombre del establecimiento es obligatorio.' },
              pattern: {
                value: /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/,
                message: 'El nombre del establecimient no es válido.',
              },
              minLength: { value: 1, message: 'El nombre del establecimient debe tener al menos 1 caracter.' },
              maxLength: { value: 50, message: 'El nombre del establecimient no puede tener más de 50 caracteres.' },
            }}
          />
          <label>Tipo de establecimiento (*)</label>
          <Select
            name="type"
            className={'mt-2 mb-3 col-sm'}
            placeholder={'Tipo establecimiento'}
            options={optionsEstablishmentType}
            onChange={item => {
              setSelectedType(item);
            }}
            required
          />
          <label>Ubicación (*)</label>
          <div className={'row'}>
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
          </div>
          <ValidatedField
            name="address"
            label="Dirección (*)"
            id="address"
            placeholder="Dirección del local"
            validate={{
              required: { value: true, message: 'La dirección es obligatoria.' },
            }}
            data-cy="address"
          />
          <div></div>
          <Button id="restaurant-submit" color="primary" type="submit" data-cy="submit">
            Crear establecimiento
          </Button>
        </ValidatedForm>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};
