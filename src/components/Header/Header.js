import React from 'react';
import styles from './Header.module.css';
import Funko from '../../Assets/funko.png';

const Header = () => (
  <header className={styles.Header}>
    <img src={Funko} alt="funko" id="img-funko"></img>
  </header>
);


export default Header;
