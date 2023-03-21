import './home.scss';

import React from 'react';
import { Row, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import NoAuthenticationHome from 'app/modules/home/no-authentication-home';
import AuthenticationHome from 'app/modules/home/authentication-home';
import { useAppSelector } from 'app/config/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);

  return (
    <Row>
      <Breadcrumb>
        <BreadcrumbItem active>
          <FontAwesomeIcon icon="home" />
          <span>&nbsp;Inicio</span>
        </BreadcrumbItem>
      </Breadcrumb>
      {!account?.login ? <NoAuthenticationHome /> : <AuthenticationHome />}
    </Row>
  );
};

export default Home;
