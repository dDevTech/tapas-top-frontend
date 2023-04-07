import { Button, Col, Row, UncontrolledCarousel, Alert } from 'reactstrap';
import { Avatar, Descriptions, Divider, Table, Tabs, Timeline, Empty, Card, Image, Rate } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Favorite from 'app/modules/home/favorites';
import Carrousel from 'app/modules/home/carrousel';
import Profile from 'app/modules/home/profile';
import Statistics from 'app/modules/home/statistics';

export const AuthenticationHome = () => {
  return (
    <>
      <Col md="12">
        <Row className="div-padding-left">
          <Col md="6">
            <Profile />
          </Col>
          <Col md="6">
            <Row id="carrousel-home">
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

export default AuthenticationHome;
