import { Button, Col, Row, Alert } from 'reactstrap';
import { Descriptions, Divider, Image, Rate } from 'antd';
import React, { useEffect, useState } from 'react';
import Sample from 'app/modules/home/sample';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getFavorites } from 'app/shared/reducers/tapa.reducer';

export const Favorite = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.tapas.favorites);
  const account = useAppSelector(state => state.authentication.account);
  const [visible, setVisible] = useState(true);
  const [sampleList, setSampleList] = useState([]);
  const [seeingAll, setSeeingAll] = useState(false);
  useEffect(() => {
    if (favorites.length) setSampleList(favorites.slice(0, 3));
    else setSampleList([]);
  }, [favorites]);

  useEffect(() => {
    dispatch(getFavorites(account.login));
  }, []);
  const onDismiss = () => setVisible(false);
  const onChangeSee = () => {
    if (seeingAll) setSampleList(favorites);
    else setSampleList(favorites.slice(0, 3));
    setSeeingAll(!seeingAll);
  };

  return (
    <Row>
      <Divider>Degustaciones favoritas</Divider>
      {sampleList.length ? (
        <Col>
          {sampleList.length > 4 ? (
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
          ) : null}
          <Row>
            {sampleList.map(sample => (
              <Sample key={sample} tapa={sample} />
            ))}
          </Row>
        </Col>
      ) : (
        <Alert color="info" isOpen={visible} toggle={onDismiss}>
          Todavía no has añadido ninguna tapa a tu lista de tapas favoritas
        </Alert>
      )}
    </Row>
  );
};

export default Favorite;
