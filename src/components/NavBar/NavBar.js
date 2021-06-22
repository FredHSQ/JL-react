import React from 'react';
import PropTypes from 'prop-types';
import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <nav id={styles.navHeader} className={styles.NavBar}>
    <ul>
      <li className={styles.navButtons}>
        <Link to="/"><a>Inicio</a></Link>
      </li>
      <li className={styles.navButtons}>
        <Link to="/Login"><a>Login</a></Link>
      </li>
      <li className={styles.navButtons}>
        <Link to="/Portal"><a>Portal Gerencial</a></Link>
      </li>
      <li className={styles.navButtons}>
        <Link to="/Carrinho"><a>Carrinho</a></Link>
      </li>
    </ul>
  </nav>
);

NavBar.propTypes = {};

NavBar.defaultProps = {};

export default NavBar;
