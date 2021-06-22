import React from 'react';
import PropTypes from 'prop-types';
import styles from './NavBar.module.css';

const NavBar = () => (
  <nav id={styles.navHeader} className={styles.NavBar}>
    <ul>
      <li className={styles.navButtons}>
        <a href="#">Inicio</a>
      </li>
      <li className={styles.navButtons}>
        <a href="#">Login</a>
      </li>
      <li className={styles.navButtons}>
        <a href="../Produtos/produtos.html">Portal Gerencial</a>
      </li>
      <li className={styles.navButtons}>
        <a href="../Carrinho/carrinho.html">Carrinho</a>
      </li>
    </ul>
  </nav>
);

NavBar.propTypes = {};

NavBar.defaultProps = {};

export default NavBar;
