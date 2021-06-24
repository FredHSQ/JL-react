

import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import React, { useState, useEffect } from 'react';
import ProdutoInicioService from './ProdutoInicioService';
import './DataScrollerDemo.css';
import { DataScroller } from 'primereact/datascroller';

const loadData = (event) => {
  //event.first = First row offset
  //event.rows = Number of rows per page
  //add more records to the cars array
}


const ProdutoInicio = () => {
  const [produto, setProdutos] = useState([]);
  const produtoInicioService = new ProdutoInicioService();

  useEffect(() => {
    produtoInicioService.getProdutos().then(data => setProdutos(data));
}, []); // eslint-disable-line react-hooks/exhaustive-deps

const itemTemplate = (data) => {
    return (
        <div className="product-item">
            <img src={`${data.fotoLink}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.nome} />
            <div className="product-detail">
                <div className="product-name">{data.nome}</div>
                <div className="product-description">{data.descricao}</div>
                <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.nomeCategoria}</span>
            </div>
            <div className="product-action">
                <span className="product-price">${data.valor}</span>
                <Button icon="pi pi-shopping-cart" label="Add to Cart"></Button>
            </div>
        </div>
    );
}

return (
    <div className="datascroller-demo">
        <div className="card">
            <DataScroller value={produto} itemTemplate={itemTemplate} rows={5} inline scrollHeight="500px" header="Bem vindo ao Ecommerce Justice League" lazy onLazyLoad={loadData}  />
        </div>
    </div>
);
}


export default ProdutoInicio;