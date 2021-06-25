import React, { useContext } from "react";
import "./Carrinho.css";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import tag from "../../Assets/tag.png"
import trash from "../../Assets/trash.png"
import padrao from "../../Assets/padrao.jpg"
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { CartContext } from "../../Contexts/CartContext";

const Carrinho = () => {
  var valorTotal = 0;

  const botaoFinalizar = ({ className, children }) => (
    <Link className={className} onClick={clearCart} >
      {children}
    </Link>
  )



  const Button = styled(botaoFinalizar)`
    background-color: #fed000;
    cursor: pointer;
    border: none;
    color: black;
    text-align: center;
    height: 30px;
    width: 150px;
    margin-left: 47vw;
    vertical-align: middle;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    border-radius: 0.5vw;

    @media only screen and (max-width: 800px){
      font-size: 12px;
      height: 35px;
      width: 100px;
    }
    @media only screen and (max-width: 800px){
      font-size: 11px;
      height: 35px;
      width: 120px;
    }
  `;

  const { cart, removeItem, clearCart } = useContext(CartContext);
  const ProdutoCarrinho = cart.map((produtoC, i) => {
    valorTotal = valorTotal + produtoC.valor;

    return (
      <div className="carrinhoInfo">
        <img
          className="imgInfo"
          src={produtoC.fotoLink}
          onError={(e) =>
            (e.target.src = `${padrao}`)}
        ></img>
        <div className="infos">
          <h2 className="tituloInfo">{produtoC.nome}</h2>
          <p className="descricaoInfo">
            {produtoC.descricao}
          </p>
          <div className="categoria-content">
            <img src={tag} alt="" />
            <div className="categoria-content-nome">
              {produtoC.nomeCategoria}
            </div>
          </div>
        </div>
        <div className="valor-content">
          <p>Preço:</p>
          <div>
            {`R$ ${produtoC.valor}`}
          </div>
        </div>

        <button className="deleteInfo" onClick={() => removeItem(produtoC.id)}>
          <img src={trash}></img>
        </button>
        <hr />
      </div >)
  })


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
            <Button className="finalizarFooter">Finalizar compra</Button>
          </div>
        </div>
      </div>
      <Footer className="footer" />
    </>
  );
};

export default Carrinho;
