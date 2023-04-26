import { Breadcrumb, BreadcrumbItem, Button, Col, Row } from 'reactstrap';
import React, { useCallback, useEffect, useState } from 'react';
import { FloatButton, List } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { TastingElement } from 'app/modules/tasting/tastingElement';
import { getMyTastings } from 'app/shared/reducers/user-info.reducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
export const MyTastings = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.userInfo.loading);
  const account = useAppSelector(state => state.authentication.account);
  const tastingList = useAppSelector(state => state.userInfo.myTastings);
  const navigate = useNavigate();
  useEffect(() => {
    if (dispatch && account) {
      dispatch(getMyTastings(account.login));
    }
  }, [dispatch, account]);

  return (
    <div>
      <FloatButton
        shape="circle"
        type="primary"
        style={{ right: 30, top: 85, width: 50, height: 50 }}
        icon={<PlusOutlined />}
        onClick={() => navigate('/newDish')}
        tooltip="Nueva tapa"
      />
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
        loading={loading}
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
