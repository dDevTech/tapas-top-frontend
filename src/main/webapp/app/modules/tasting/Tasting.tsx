import { Button, Col, Row } from 'reactstrap';
import React, { useCallback, useEffect, useState } from 'react';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { Descriptions, Image, List, Rate } from 'antd';
import { getSearchCoincidences } from 'app/shared/reducers/tapa.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

export const TastingPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [searchValue, setSearch] = useState(location.state != null ? location.state.toString() : "");
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

  useEffect(() => {
    if(searchValue != ""){
      onValidatedFormSubmit()
    }
  }, [])

  return (
    <div>
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
            <Col className="col-md-auto">
              {loading && (
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </Col>
          </Row>
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
//Usando antd list
export const TastingElement = item => {
  return (
    <div className="">
      <Row>
        <Col className="card-left-img" md="3">
          <Image
            src={item.item.imageUrl}
            rootClassName="width-100"
            fallback="data:image/png;base64,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"
          />
        </Col>
        <Col className="card-content" md="9">
          <Descriptions size="small" column={1} layout="horizontal">
            <Descriptions.Item label="Valoración">
              <Rate className="card-rate" allowHalf disabled defaultValue={item.item.average} />
            </Descriptions.Item>
          </Descriptions>
          <Descriptions size="small" column={1} layout="horizontal">
            <Descriptions.Item label="Descripción">{item.item?.description}</Descriptions.Item>
          </Descriptions>
          <Descriptions size="small" column={1} layout="horizontal">
            <Descriptions.Item label="Tipo">{item.item?.type}</Descriptions.Item>
          </Descriptions>
          <Descriptions size="small" column={2} layout="horizontal">
            <Descriptions.Item label="Local">{item.item?.establishment?.name}</Descriptions.Item>
            <Descriptions.Item label="Address">
              {item.item?.establishment?.address?.address +
                '    ' +
                item.item?.establishment?.address?.city +
                ', ' +
                item.item?.establishment?.address?.country}
            </Descriptions.Item>
          </Descriptions>
          <Row>
            <Button>Valorar</Button>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
