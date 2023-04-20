import { Breadcrumb, BreadcrumbItem, Button, Col, Row } from 'reactstrap';
import React, { useCallback, useEffect, useState } from 'react';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { Descriptions, Image, List, Rate } from 'antd';
import { getSearchCoincidences } from 'app/shared/reducers/tapa.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TastingElement } from 'app/modules/tasting/tastingElement';

export const TastingPage = () => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearch] = useState('');
  const coincidences = useAppSelector(state => state.tapas.searchCoincidence);
  const loading = useAppSelector(state => state.tapas.loading);

  function onValidatedFormSubmit() {
    dispatch(getSearchCoincidences(searchValue));
  }
  useEffect(() => {
    if (coincidences.length === 0 && searchValue !== '') {
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
        <ValidatedForm className="row " onSubmit={onValidatedFormSubmit}>
          <ValidatedField
            name="find"
            className="col"
            placeholder="Buscar tapa"
            validate={{
              required: { value: true, message: 'Escribe para buscar una tapa.' },
              minLength: { value: 2, message: 'Mínimo 2 carácteres para buscar.' },
              maxLength: { value: 50, message: 'Máximo 50 carácteres.' },
            }}
            onChange={v => {
              setSearch(v.target.value);
            }}
          />
          <Col md="auto">
            <Button disabled={loading} id="tasting-search" color="primary" type="submit" data-cy="submit">
              Buscar
            </Button>
          </Col>
          <Col md="auto">
            {loading && (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </Col>
        </ValidatedForm>
      </Row>
      <div className="text-center">
        <a href="/newDish">
          <Button color="secondary">Crear una tapa</Button>
        </a>
      </div>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 3,
        }}
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
