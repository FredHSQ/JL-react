import React from 'react';
import PropTypes from 'prop-types';
import styles from './Crud.module.css';
import Categoria from '../Categoria/Categoria'

const Crud = () => (
  <div className={styles.Crud}>
    <Categoria/>
  </div>
);

Crud.propTypes = {};

Crud.defaultProps = {};

export default Crud;
