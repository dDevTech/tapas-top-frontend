import { Button, Col, Row, UncontrolledCarousel, Alert } from 'reactstrap';
import { Avatar, Descriptions, Divider, Table, Tabs, Timeline, Empty, Card, Image, Rate } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLast, getLastEstablisment } from 'app/shared/reducers/user-info.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import Sample from 'app/modules/home/sample';

export const Statistics = () => {
  const tabs = ['Tapas degustadas en los últimos 7 días', 'Locales visitados en los últimos 7 días'];
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.authentication.account);
  const sampleList = useAppSelector(state => state.userInfo.last);
  const establishmentList = useAppSelector(state => state.userInfo.lastRestaurants);

  useEffect(() => {
    if (dispatch && account) {
      dispatch(getLast(account.login));
      dispatch(getLastEstablisment(account.login));
    }
  }, [dispatch, account]);

  return (
    <Col>
      <Tabs
        className="height-100"
        defaultActiveKey="1"
        type="card"
        items={tabs.map(title => {
          const index = tabs.indexOf(title);
          return {
            label: title,
            key: title,
            children: index === 0 ? <LastSample list={sampleList} /> : <LastEstablishment list={establishmentList} />,
          };
        })}
      />
    </Col>
  );
};

function LastSample({ list }) {
  const timelineList = [];
  list.forEach(sample => {
    timelineList.push({ children: new Date(sample?.createdDate).toLocaleDateString() + ' ' + sample.name });
  });
  return (
    <Col>
      {list.length ? (
        <Row>
          <Col md="9">
            <Row>
              {list.map(sample => (
                <Sample key={sample} tapa={sample} id_image={'sample-statistics-image'} />
              ))}
            </Row>
          </Col>
          <Col md="3">
            <Divider className="no-margin-top">
              <span>Últimas tapas degustadas (</span>
              {list.length}
              <span>)</span>
            </Divider>
            <Timeline items={timelineList} />
            <Row>
              <Link to="/login">
                <Button color="primary" type="submit" data-cy="submit" className="width-100">
                  Ver todas mis degustaciones
                </Button>
              </Link>
            </Row>
          </Col>
        </Row>
      ) : (
        <div className="text-align-center margin-top ">
          <div>
            <Row>
              <Empty description={'No has introducido ningúna degustación en los últimos 7 días'} />
            </Row>
            <Row className="empty-div margin-top-20">
              <Link to="/home">
                <Button color="primary" type="submit" data-cy="submit">
                  Introduce una nueva degustación ahora
                </Button>
              </Link>
            </Row>
          </div>
        </div>
      )}
    </Col>
  );
}

function LastEstablishment({ list }) {
  const timelineList = [];
  list.forEach(sample => {
    timelineList.push({ children: new Date(sample?.createdDate).toLocaleDateString() + ' ' + sample.name });
  });
  return (
    <Col>
      {list.length ? (
        <Row>
          <Col md="9">
            <Row>
              {list.map(sample => (
                <Col key={sample} className="sample-div" md="6">
                  <Row className="sample-card">
                    <Col md="12">
                      <Row className="card-head">
                        <div className="card-head-wrapper">
                          <div className="card-head-title">{sample?.name}</div>
                          <div className="card-extra">
                            <Descriptions className="login-col" size="small" column={1} layout="horizontal">
                              <Descriptions.Item className="card-date" label="Fecha">
                                {new Date(sample?.createdDate).toLocaleDateString()}
                              </Descriptions.Item>
                            </Descriptions>
                          </div>
                        </div>
                      </Row>
                      <Row>
                        <Col className="card-content" md="12">
                          <Descriptions size="small" column={2} layout="horizontal">
                            <Descriptions.Item label="País">{sample?.address?.country}</Descriptions.Item>
                            <Descriptions.Item label="Tipo de establecimiento">{sample?.type}</Descriptions.Item>
                          </Descriptions>
                          <Descriptions column={1} layout="horizontal">
                            <Descriptions.Item label="Ciudad">{sample?.address?.city}</Descriptions.Item>
                            <Descriptions.Item label="Dirección">{sample?.address?.address}</Descriptions.Item>
                          </Descriptions>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>
          </Col>
          <Col md="3">
            <Divider className="no-margin-top">
              <span>Últimos restaurantes introducidos (</span>
              {list.length}
              <span>)</span>
            </Divider>
            <Timeline items={timelineList} />
          </Col>
        </Row>
      ) : (
        <div className="text-align-center margin-top ">
          <div>
            <Row>
              <Empty description={'No has introducido ningún establecimiento en los últimos 7 días'} />
            </Row>
          </div>
        </div>
      )}
    </Col>
  );
}

export default Statistics;
