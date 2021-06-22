import React from 'react';
import PropTypes from 'prop-types';
import styles from './Crud.module.css';
import Categoria from '../Categoria/Categoria'
import Cliente from '../Cliente/Cliente';

const Crud = () => (
  <div className={styles.Crud}>
    <Cliente/>
    <Categoria/>
  </div>
);

Crud.propTypes = {};

Crud.defaultProps = {};

export default Crud;
