// @flow
import React from 'react';
import Link from 'react-router-dom/Link';
import {URL_HOME_PAGE} from "../../constants/urls";
import './Header.scss'

const Header = () => (
  <header className="header">
    <Link to={URL_HOME_PAGE}>Minesweeper</Link>
  </header>
);

export default Header;
