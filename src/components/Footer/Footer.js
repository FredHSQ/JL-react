import React from 'react';
import PropTypes from 'prop-types';
import styles from './Footer.module.css';
import Logo from '../../Assets/liga.svg';
import styled from 'styled-components';

const imagemFooter = ({className, children}) => (
  <img className={className} src={Logo} alt="Logo" id="img-funko">
    {children}
  </img>
)
const Imagem = styled(imagemFooter)`
width: 80vw;`


const Footer = () => (
  <footer className={styles.Footer}>
    <Imagem />
  </footer>
);

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;
