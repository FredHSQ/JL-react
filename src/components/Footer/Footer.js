import React from 'react';
import styles from './Footer.module.css';
import Logo from '../../Assets/liga.svg';
import styled from 'styled-components';

const imagemFooter = ({ className, children }) => (
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


export default Footer;
