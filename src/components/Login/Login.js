import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import LogoFooter from "../../Assets/logo-footer.png";

const Login = () => {
  return (
    <>
      <Header />
      <NavBar />
      <div className="content">
        <div className="modal-content">
          <div className="modal-header">
            <img src={LogoFooter} alt="Imagem logo justice league" />
            <h2>Tela de login</h2>
          </div>
          <input className="input-user" type="text" placeholder="usuario" />
          <input className="input-user" type="text" placeholder="senha" />
          <button>Logar</button>
          <p>É novo por aqui? clique aqui e cadastre-se</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
