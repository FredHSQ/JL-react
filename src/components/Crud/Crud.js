import React from 'react';
import PropTypes from 'prop-types';
import styles from './Crud.module.css';
import Categoria from '../Categoria/Categoria'
import Cliente from '../Cliente/Cliente';
import Funcionario from '../Funcionario/Funcionario'
import Produto from '../Produto/Produto'

const Crud = () => (
  <div className={styles.Crud}>
    <Cliente/>
    <Categoria/>
    <Funcionario/>
    <Produto/>
  </div>
);

Crud.propTypes = {};

Crud.defaultProps = {};

export default Crud;
