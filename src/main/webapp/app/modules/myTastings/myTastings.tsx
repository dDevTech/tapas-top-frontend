import { Breadcrumb, BreadcrumbItem, Button, Col, Row } from 'reactstrap';
import React, { useCallback, useEffect, useState } from 'react';
import { List } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { TastingElement } from 'app/modules/tasting/tastingElement';
import { getMyTastings } from 'app/shared/reducers/user-info.reducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export const MyTastings = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.userInfo.loading);
  const account = useAppSelector(state => state.authentication.account);
  const tastingList = useAppSelector(state => state.userInfo.myTastings);

  useEffect(() => {
    if (dispatch && account) {
      dispatch(getMyTastings(account.login));
    }
  }, [dispatch, account]);

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem active>
          <FontAwesomeIcon icon="utensils" />
          <span>&nbsp;Mis degustaciones</span>
        </BreadcrumbItem>
      </Breadcrumb>
      <Row className="justify-content-center mb-3">
        <Col>
          <h1 id="tastingTitle">Mis degustaciones</h1>
        </Col>
      </Row>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 3,
        }}
        split={false}
        dataSource={tastingList}
        renderItem={item => (
          <List.Item>
            <TastingElement item={item}></TastingElement>
          </List.Item>
        )}
      />
    </div>
  );
};

export default MyTastings;
