import React from 'react';
import styles from './Header.module.css';
import Funko from '../../Assets/funko.png';
import styled from 'styled-components';


const imagemHeader = ({className, children}) => (
  <img className={className} src={Funko} alt="funko" id="img-funko">
    {children}
  </img>
)
const Imagem = styled(imagemHeader)`
width: 80vw;
`

const Header = () => (
  <header className={styles.Header}>
    <Imagem />
  </header>
);


export default Header;
