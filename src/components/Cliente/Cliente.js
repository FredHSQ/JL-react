import React from 'react';
import PropTypes from 'prop-types';
import styles from './Cliente.module.css';

import { useState, useEffect } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';

import ClienteService from './ClienteService';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';

const Cliente = () => {
  const [cliente, setCliente] = useState();
  
  const clienteService = new ClienteService();

  const dataTemplate = (rawData) => {
    return new Date(rawData.dataNascimento).toLocaleDateString([],{year: 'numeric', month: 'numeric',day: 'numeric'});
  }

  const cpfTemplate = (rawData) => {
    return rawData.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/,'$1.$2.$3-$4');
  }

  const cepTemplate = (rawData) => {
    return rawData.endereco.cep.replace(/^(\d{5})(\d{3}).*/,'$1-$2');
  }
  
  useEffect(() => {
    clienteService.getCliente().then(data => setCliente(data));
  }, []);

  const header = (
    <div className="table-header">
      Cliente
    </div>
  );

  const footer = `Temos ${cliente ? cliente.length : 0} clientes no total.`

  return (
    <div className="Cliente">
        <div className="card">
            <DataTable value={cliente} header={header} footer={footer} stripedRows showGridlines={true} autoLayout={true}>
              <Column field = 'nome' header = 'Nome'></Column>
              <Column field = 'cpf' header = 'CPF' body={cpfTemplate}></Column>
              <Column field = 'email' header = 'E-mail'></Column>
              <Column field = 'dataNascimento' header = 'Data de Nascimento' body = {dataTemplate}></Column>
              <Column field = 'endereco.cep' header = 'CEP' body={cepTemplate}></Column>
              <Column field = 'endereco.numero' header = 'Número'></Column>
              <Column field = 'endereco.complemento' header = 'complemento'></Column>
            </DataTable>
        </div>
    </div>
  );

};

export default Cliente;
