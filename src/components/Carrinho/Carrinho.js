import React, { useContext } from "react";
import PropTypes from "prop-types";
import "./Carrinho.css";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import api from "../../Services/api";

import { CartContext } from "../../Contexts/CartContext";

const Carrinho = () => {
  const { cart, addItem, removeItem, clearCart } = useContext(CartContext);

  return (
    <>
      <Header />
      <NavBar />
      <button onClick={cart}>Adiciona produto</button>
      <button onClick={removeItem}>Remove produto</button>
      <div className="carrinhoBody">
        <div className="centro">
          <div className="carrinhoHeader">
            <h1>Seu carrinho</h1>
            <hr></hr>
          </div>

          <div className="carrinhoInfo">
            <input type="checkbox" className="checkBox"></input>
            <img
              className="imgInfo"
              src="https://cdn0.iconfinder.com/data/icons/geek-4/24/Justice_League_dc_comic_logo_movie_-512.png"
            ></img>
            <div className="infos">
              <h2 className="tituloInfo">Titulo Item</h2>
              <p className="descricaoInfo">
                Mussum Ipsum, cacilds vidis litro abertis. Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi. Atirei o pau no gatis, per gatis num morreus. Copo furadis é disculpa de bebadis, arcu quam euismod magna. Si num tem leite então bota uma pinga aí cumpadi!
              </p>
            </div>
            <button className="deleteInfo">
              <img src="https://image.flaticon.com/icons/png/512/3159/3159662.png"></img>
            </button>
          </div>
          <hr></hr>

          <div className="carrinhoFooter">
            <h2 className="tituloFooter">Total:</h2>
            <p className="total">R$ 10000000</p>
            <button className="finalizarFooter">Finalizar compra</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Carrinho;
