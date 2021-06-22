import React from 'react';
import PropTypes from 'prop-types';
import styles from './Login.module.css';
import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

const Login = () => (
  <>
    <Header/>
    <NavBar/>
    <Footer/>
  </>
);

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
