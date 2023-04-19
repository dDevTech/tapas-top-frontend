import './header.scss';

import React, { useState } from 'react';

import { Navbar, Nav, NavbarToggler, Collapse, Button } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';

import { Home, Brand, Tasting, MostValorated, SearchBar } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu } from '../menus';
import { Link } from 'react-router-dom';

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

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleChange = text => {
    setSearch(text.target.value)
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
            <input type='text' value={search} onChange={handleChange} /> 
            <Link to="/tasting"> 
              <Button className='botonBuscarMenu' type='submit'>buscar</Button>
            </Link>
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
