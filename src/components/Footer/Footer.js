import React from 'react';
import PropTypes from 'prop-types';
import styles from './Footer.module.css';
import Logo from '../../Assets/liga.svg'

const Footer = () => (
  <footer className={styles.Footer}>
    <img src={Logo} alt="Logo" className={styles.mediaLogo} />
  </footer>
);

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;
