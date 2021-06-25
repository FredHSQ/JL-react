import React, { useContext } from "react";
import PropTypes from "prop-types";
import "./Carrinho.css";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import api from "../../Services/api";

import { CartContext } from "../../Contexts/CartContext";

const Carrinho = () => {
  var valorTotal=0;
  const { cart, addItem, removeItem, clearCart } = useContext(CartContext);
  const ProdutoCarrinho = cart.map((produtoC,i) => {
    valorTotal = valorTotal+produtoC.valor;
    return (
    <div className="carrinhoInfo">
    <input type="checkbox" className="checkBox"></input>
    <img
      className="imgInfo"
      src={produtoC.fotoLink}
    ></img>
    <div className="infos">
      <h2 className="tituloInfo">{produtoC.nome}</h2>
      <p className="descricaoInfo">
        {produtoC.descricao}
      </p>
    </div>
    <div>
        {produtoC.valor}
    </div>
    <div>
        {produtoC.nomeCategoria}
    </div>
    <button className="deleteInfo" onClick={() => removeItem(produtoC.id)}>
      <img src="https://image.flaticon.com/icons/png/512/3159/3159662.png"></img>
    </button>
  </div>)})


  return (
    <>
      <Header />
      <NavBar />
      <div className="carrinhoBody">
        <div className="centro">
          <div className="carrinhoHeader">
            <h1>Seu carrinho</h1>
            <hr></hr>
          </div>

          {ProdutoCarrinho}
          <hr></hr>

          <div className="carrinhoFooter">
            <h2 className="tituloFooter">Total:</h2>
            <p className="total">R$ {valorTotal}</p>
            <button className="finalizarFooter">Finalizar compra</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Carrinho;
