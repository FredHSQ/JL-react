import React from 'react';
import PropTypes from 'prop-types';
import './Carrinho.css';
import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

const Carrinho = () => (
  <>
    <Header/>
    <NavBar/>
    <div className="carrinhoBody">
      <div className="centro">
        <div className="carrinhoHeader">
          <h1>Seu carrinho</h1>
          <hr></hr>
        </div>

        <div className="carrinhoInfo">
          <input type="checkbox" className="checkBox"></input>
          <img className="imgInfo" src='https://cdn0.iconfinder.com/data/icons/geek-4/24/Justice_League_dc_comic_logo_movie_-512.png'></img>
            <div className="infos">
              <h2 className="tituloInfo">Titulo Item</h2>
              <p className="descricaoInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
          <button className="deleteInfo"><img src="https://image.flaticon.com/icons/png/512/3159/3159662.png"></img></button>
        </div>
        <hr></hr>

        <div className="carrinhoFooter">
          <h2 className="tituloFooter">Total:</h2>
          <p className="total">R$ 10000000</p>
          <button className="finalizarFooter">Finalizar compra</button>
        </div>
      </div>
    </div>
    <Footer/>
  </>
);

export default Carrinho;
