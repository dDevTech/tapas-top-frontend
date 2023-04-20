import './header.scss';

import React, { useState } from 'react';

import { Navbar, Nav, NavbarToggler, Collapse, Button } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';

import { Home, Brand, Tasting, MostValorated, SearchBar } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu } from '../menus';
import { Link, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isOpenAPIEnabled: boolean;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleChange = text => {
    setSearch(text.target.value)
  }

  const handleClick = () => {
    navigate("/tasting", {state: search})
  }

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
    <div id="app-header">
      <LoadingBar className="loading-bar" />
      <Navbar data-cy="navbar" dark expand="md" fixed="top" className="bg-primary">
        <NavbarToggler aria-label="Menu" onClick={toggleMenu} />
        <Brand />
        <Collapse isOpen={menuOpen} navbar>
          <Nav id="header-tabs" className="ms-auto" navbar>
            {props.isAuthenticated && <Home />}
            {props.isAuthenticated && <Tasting />}
            {props.isAuthenticated && <MostValorated />}
            {/*{props.isAuthenticated && <SearchBar />}*/}
            {props.isAuthenticated && <div className='busquedaMenu'>
              <input className='inputMenu' type='text' value={search} onChange={handleChange} /> 
              <button className='botonBuscarMenu' onClick={handleClick}>
                Buscar
              </button>
              </div>}
            {props.isAuthenticated && props.isAdmin && <EntitiesMenu />}
            {props.isAuthenticated && props.isAdmin && <AdminMenu showOpenAPI={props.isOpenAPIEnabled} />}
            {<AccountMenu isAuthenticated={props.isAuthenticated} />}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
