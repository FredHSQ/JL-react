import React from 'react';
import PropTypes from 'prop-types';
import styles from './Portal.module.css';
import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import Crud from '../Crud/Crud';

const Portal = () => (
  <>
    <Header/>
    <NavBar/>
    <Crud/>
    <Footer/>
  </>
);

Portal.propTypes = {};

Portal.defaultProps = {};

export default Portal;
