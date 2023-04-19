import { Button, Col, Row } from 'reactstrap';
import React, { useCallback, useEffect, useState } from 'react';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { Descriptions, Image, Divider, Rate, ConfigProvider } from 'antd';
import { getSearchCoincidences } from 'app/shared/reducers/tapa.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import esEs from 'antd/locale/es_ES';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
export const TastingElement = ({ item }) => {
  const [value, setValue] = useState(150);
  useEffect(() => {
    const containerWidth = document.getElementById('tapa-image')?.clientWidth;
    if (containerWidth) {
      setValue(containerWidth);
      document.getElementById('tasting-button-col' + item.id).style.minHeight = containerWidth - 40 + 'px';
    }
  }, [document.getElementById('tapa-image')?.clientWidth]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  const handleResize = () => {
    const containerWidth = document.getElementById('tapa-image')?.clientWidth;
    if (containerWidth) {
      setValue(containerWidth);
      document.getElementById('tasting-button-col' + item.id).style.minHeight = containerWidth - 40 + 'px';
    }
  };
  return (
    <ConfigProvider locale={esEs}>
      <Row className="tasting-card-container">
        <Col className="card-left-img" md="2">
          <Image
            id={'tapa-image'}
            height={value}
            src={item.imageUrl}
            rootClassName="width-100"
            fallback="data:image/png;base64,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"
          />
        </Col>
        <Col className="tasting-card-content" md="10">
          <Row className="tasting-card-head">
            <div className="tasting-card-head-wrapper">
              <div className="tasting-card-head-title">{item?.name}</div>
              <div className="card-extra">
                <Descriptions className="login-col" size="small" column={1} layout="horizontal">
                  <Descriptions.Item className="card-date" label="Fecha de subida">
                    {new Date(item?.createdDate).toLocaleDateString()}
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </div>
          </Row>
          <Row>
            <Col className="tasting-card-left" md="8">
              <Row>
                <Col md="10">
                  <Descriptions size="small" column={1} layout="horizontal">
                    <Descriptions.Item label="Tipo de tapa">{item?.type}</Descriptions.Item>
                  </Descriptions>
                </Col>
                <Col className="text-align-right" md="2">
                  <Descriptions size="small" column={1} layout="horizontal">
                    <Descriptions.Item label="Favorito">
                      <Rate className="card-rate-6" style={{ color: '#ff0000' }} character={<FontAwesomeIcon icon={faHeart} />} count={1} />
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
              <Descriptions size="small" column={1} layout="horizontal">
                <Descriptions.Item label="Descripción">{item?.description}</Descriptions.Item>
              </Descriptions>
              <Divider className="tasting-divider">Local</Divider>
              <Descriptions size="small" column={3} layout="horizontal">
                <Descriptions.Item label="Nombre">{item?.establishment?.name}</Descriptions.Item>
                {item.establishment?.address ? (
                  <Descriptions.Item label="Dirección">
                    {item?.establishment?.address?.address +
                      '    ' +
                      item?.establishment?.address?.city +
                      ', ' +
                      item?.establishment?.address?.country}
                  </Descriptions.Item>
                ) : null}
                <Descriptions.Item label="Tipo de local">{item?.establishment?.type}</Descriptions.Item>
              </Descriptions>
            </Col>
            <Col md="4" className="tasting-card-right" id={'tasting-button-col' + item.id}>
              <Descriptions size="small" column={1} layout="horizontal" className="tasting-card-valorations">
                <Descriptions.Item label="Valoración media" className="text-align-right">
                  <Rate className="card-rate" allowHalf disabled defaultValue={item.average} />
                </Descriptions.Item>
                {item.rating ? (
                  <Descriptions.Item label="Tú valoración">
                    <Rate className="card-rate" allowHalf disabled defaultValue={item.rating.rating} />
                  </Descriptions.Item>
                ) : null}
                <Descriptions.Item label="Nº de valoraciones">{item.ratings ? item.ratings.length : 0}</Descriptions.Item>
              </Descriptions>
              <Row className="tasting-card-button">
                <Col id="tasting-buttom-row" className="width-100 text-align-center">
                  <Button className="width-80">Valorar</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </ConfigProvider>
  );
};
