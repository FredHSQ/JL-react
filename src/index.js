import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Pagina404 from './components/Pagina404/Pagina404';
import Login from './components/Login/Login';
import Carrinho from './components/Carrinho/Carrinho';
import Portal from './components/Portal/Portal';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={App} />
      <Route path="/Login" component={Login} />
      <Route path="/Carrinho" component={Carrinho} />
      <Route path="/Portal" component={Portal} />
      <Route path='*' component={Pagina404} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
