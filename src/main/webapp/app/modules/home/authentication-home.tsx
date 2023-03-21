import { Button, Col, Row, UncontrolledCarousel, Alert } from 'reactstrap';
import { Avatar, Descriptions, Divider, Table, Tabs, Timeline, Empty, Card, Image, Rate } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const AuthenticationHome = () => {
  return (
    <>
      <Col md="12">
        <Row className="div-padding-left">
          <Col md="3">
            <Profile />
          </Col>
          <Col md="9">
            <Row>
              <Carrousel />
            </Row>
          </Col>
          <Favorite />
          <Statistics />
        </Row>
      </Col>
    </>
  );
};

function Profile() {
  const imgUrl = 'content/images/foto-tapa.avif';
  return (
    <div className="shadow-box height-100">
      <Divider className="no-margin-top">Mis Datos</Divider>
      <div className="text-align-center">
        <Avatar src={<img src={imgUrl} alt="avatar" />} size={{ xs: 48, sm: 64, md: 80, lg: 128, xl: 100, xxl: 200 }} />
      </div>
      <div className="margin-top-20">
        <Descriptions size="default" column={1} layout="horizontal">
          <Descriptions.Item label="Usuario">Zhou Maomao</Descriptions.Item>
          <Descriptions.Item label="Correo">holaquetal@gmail.com</Descriptions.Item>
          <Descriptions.Item label="Nombre">Pepito Apellido1 Apellido2</Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  );
}

function Statistics() {
  const tabs = ['Últimas tapas degustadas', 'Últimos locales visitados'];
  const sampleList = [
    {
      children: 'Create a services site 2015-09-01',
    },
    {
      children: 'Solve initial network problems 2015-09-01',
    },
    {
      children: 'Technical testing 2015-09-01',
    },
    {
      children: 'Network problems being solved 2015-09-01',
    },
  ];
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
}

function LastSample({ list }) {
  return (
    <Col>
      {list.length ? (
        <Row>
          <Col md="9">
            {list.map(sample => (
              <Row key={sample}>
                <Sample size={'12'} />
              </Row>
            ))}
          </Col>
          <Col md="3">
            <Divider className="no-margin-top">Últimas tapas degustadas</Divider>
            <Timeline items={list} />
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
              <Link to="/login">
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

function Sample({ size }) {
  return (
    <Col className="sample-div" md={size}>
      <Row className="sample-card">
        <Col md="12">
          <Row className="card-head">
            <span>Nombre de la tapa</span>
          </Row>
          <Row>
            <Col className="card-left-img" md="3">
              <Image src={'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'} rootClassName="width-100" />
            </Col>
            <Col className="card-content" md="9">
              <Descriptions size="small" column={2} layout="horizontal">
                <Descriptions.Item label="Valoración">
                  <Rate className="card-rate" allowHalf disabled defaultValue={2.5} />
                </Descriptions.Item>
                <Descriptions.Item className="card-date" label="Fecha">
                  01/02/2028
                </Descriptions.Item>
              </Descriptions>
              <Descriptions size="small" column={1} layout="horizontal">
                <Descriptions.Item label="Descripción">
                  Esto es la descirpdavasdf daefae lafdsfas fasdfasdfa fasdfasdf safasdfa dfa
                </Descriptions.Item>
              </Descriptions>
              <Descriptions size="small" column={2} layout="horizontal">
                <Descriptions.Item label="Local">Zhou Maomao</Descriptions.Item>
                <Descriptions.Item label="Tipo">holaquetal@gmail.com</Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
}
function Carrousel() {
  return (
    <Row>
      <UncontrolledCarousel
        className="width-100"
        items={[
          {
            altText: 'Slide 1',
            caption: 'Slide 1',
            key: 1,
            src: 'https://picsum.photos/id/123/1200/600',
          },
          {
            altText: 'Slide 2',
            caption: 'Slide 2',
            key: 2,
            src: 'https://picsum.photos/id/456/1200/600',
          },
          {
            altText: 'Slide 3',
            caption: 'Slide 3',
            key: 3,
            src: 'https://picsum.photos/id/678/1200/600',
          },
        ]}
      />
    </Row>
  );
}

function Favorite() {
  const [sortSampleList, hola] = useState([1, 2, 3, 4]);
  const [largeSampleList, hola1] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [visible, setVisible] = useState(true);
  const [sampleList, setSampleList] = useState([]);
  const [seeingAll, setSeeingAll] = useState(false);
  useEffect(() => {
    setSampleList(sortSampleList);
  }, [sortSampleList]);
  const onDismiss = () => setVisible(false);
  const onChangeSee = () => {
    if (seeingAll) setSampleList(sortSampleList);
    else setSampleList(largeSampleList);
    setSeeingAll(!seeingAll);
  };

  return (
    <Row>
      <Divider>Degustaciones favoritas</Divider>
      <Col>
        <Row>
          <Col md="2">
            <Button className="favorite-button" color="primary" type="submit" data-cy="submit" onClick={onChangeSee}>
              {seeingAll ? <span>&nbsp;Mostrar menos</span> : <span>&nbsp;Mostrar todo</span>}
            </Button>
          </Col>
          <Col md="10">
            <Alert color="info" isOpen={visible} toggle={onDismiss}>
              Aquí se muestran algunas de tus degustaciones favoritas. Si quieres ver más, haz click en el botón de la izquierda.
            </Alert>
          </Col>
        </Row>
        <Row>
          {sampleList.map(sample => (
            <Sample key={sample} size={'6'} />
          ))}
        </Row>
      </Col>
    </Row>
  );
}

export default AuthenticationHome;
