import { Breadcrumb, BreadcrumbItem, Button, Col, Row } from 'reactstrap';
import React, { useCallback, useEffect, useState } from 'react';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { Descriptions, Image, List, Rate } from 'antd';
import { getSearchCoincidences } from 'app/shared/reducers/tapa.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { TastingElement } from 'app/modules/tasting/tastingElement';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const TastingPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [searchValue, setSearch] = useState(location.state != null ? location.state.toString() : '');
  const coincidences = useAppSelector(state => state.tapas.searchCoincidence);
  const loading = useAppSelector(state => state.tapas.loading);
  const [wait, setWait] = useState(false);

  function onValidatedFormSubmit() {
    dispatch(getSearchCoincidences(searchValue));
    setWait(true);
  }

  useEffect(() => {
    if (searchValue !== '') {
      onValidatedFormSubmit();
    }
  }, []);

  useEffect(() => {
    if (coincidences.length === 0 && searchValue !== '' && wait === true) {
      toast.info('No se han encontrado tapas que coincidan con la búsqueda. Crea una nueva tapa ');
    }
  }, [coincidences]);

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem active>
          <FontAwesomeIcon icon="utensils" />
          <span>&nbsp;Degustaciones</span>
        </BreadcrumbItem>
      </Breadcrumb>
      <Row className="justify-content-center mb-3">
        <Col>
          <h1 id="tastingTitle">Degustaciones</h1>
        </Col>
      </Row>
      <Row className="mx-auto w-50">
        <ValidatedForm id="register-form" onSubmit={onValidatedFormSubmit}>
          <Row className="col-md-auto mx-auto ">
            <Col>
              <ValidatedField
                name="find"
                placeholder="Buscar tapa"
                value={searchValue}
                validate={{
                  required: { value: true, message: 'Escribe para buscar una tapa.' },
                  minLength: { value: 2, message: 'Mínimo 2 carácteres para buscar.' },
                  maxLength: { value: 50, message: 'Máximo 50 carácteres.' },
                }}
                onChange={v => {
                  setSearch(v.target.value);
                }}
              />
            </Col>
            <Col className="col-md-auto">
              <Button disabled={loading} id="tasting-search" color="primary" type="submit" data-cy="submit">
                Buscar
              </Button>
            </Col>
          </Row>
        </ValidatedForm>
      </Row>

      <List
        itemLayout="vertical"
        size="large"
        footer={
          !loading &&
          coincidences.length === 0 && (
            <div className="text-center">
              <a href="/newDish">
                <Button color="primary">Crear una tapa</Button>
              </a>
            </div>
          )
        }
        pagination={{
          pageSize: 3,
        }}
        loading={loading}
        dataSource={coincidences}
        renderItem={item => (
          <List.Item>
            <TastingElement item={item}></TastingElement>
          </List.Item>
        )}
      />
    </div>
  );
};
