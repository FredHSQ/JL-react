import React from 'react';
import PropTypes from 'prop-types';
import styles from './Portal.module.css';
import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';

const Portal = () => (
  <>
    <Header/>
    <NavBar/>
  </>
);

Portal.propTypes = {};

Portal.defaultProps = {};

export default Portal;
