import React from 'react';

import { NavItem, NavLink, NavbarBrand, InputGroup, InputGroupText, Input } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="content/images/TapasTop-logos_white.png" alt="Logo" />
  </div>
);

export const Brand = () => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <BrandIcon />
    <span className="brand-title">TapasTop</span>
  </NavbarBrand>
);

export const Home = () => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center">
      <FontAwesomeIcon icon="home" />
      <span>&nbsp;Inicio</span>
    </NavLink>
  </NavItem>
);

export const Tasting = () => (
  <NavItem>
    <NavLink tag={Link} to="/myTastings" className="d-flex align-items-center">
      <FontAwesomeIcon icon="utensils" />
      <span>&nbsp;Mis degustaciones</span>
    </NavLink>
  </NavItem>
);

export const MostValorated = () => (
  // TODO: introducir enlace real cuando se cree la página
  <NavItem>
    <NavLink tag={Link} to="/most-valorated" className="d-flex align-items-center">
      <FontAwesomeIcon icon="award" />
      <span>&nbsp;Más valoradas</span>
    </NavLink>
  </NavItem>
);

export const SearchBar = () => (
  <NavItem>
    <InputGroup>
      <Input placeholder={'Búsqueda'} className="search-form" />
      <InputGroupText>
        <FontAwesomeIcon icon="search" size="sm" />
      </InputGroupText>
    </InputGroup>
  </NavItem>
);
