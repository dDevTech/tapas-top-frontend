import { Button, Col, Row, UncontrolledCarousel, Alert } from 'reactstrap';
import { Avatar, Descriptions, Divider, Table, Tabs, Timeline, Empty, Card, Image, Rate } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLast } from 'app/shared/reducers/tapa.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import Sample from 'app/modules/home/sample';

export const Statistics = () => {
  const tabs = ['Últimas tapas degustadas', 'Últimos locales visitados'];
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.authentication.account);
  const sampleList = useAppSelector(state => state.tapas.last);
  useEffect(() => {
    dispatch(getLast(account.login));
  }, []);

  const establishmentList = [];
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
  return (
    <Col>
      {list.length ? (
        <Row>
          <Col md="9">hola</Col>
          <Col md="3">
            <Divider className="no-margin-top">Últimos locales visitados</Divider>
            <Timeline items={list} />
          </Col>
        </Row>
      ) : (
        <div className="text-align-center margin-top ">
          <div>
            <Row>
              <Empty description={'No has introducido ningún nuevo local en los últimos 7 días'} />
            </Row>
            <Row className="empty-div margin-top-20">
              <Link to="/login">
                <Button color="primary" type="submit" data-cy="submit">
                  Introduce un nuevo local ahora
                </Button>
              </Link>
            </Row>
          </div>
        </div>
      )}
    </Col>
  );
}

export default Statistics;
