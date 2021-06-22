import React from 'react';
import PropTypes from 'prop-types';
import styles from './Footer.module.css';

const Footer = () => (
  <footer>
    <div id={container-general-footer}>
      <section id={container-about}>
        <h3 class={info-loja}>Sobre a loja</h3>
        <p class={info-loja}>
          Melhor loja de todas para comprar coisas relacionadas a jogos. Bem vindos a
          <blockquote class={info-loja}> Justice League Jogos Eletrônicos</blockquote>
        </p>
      </section>
      <section id={container-contact}>
        <h3 class={contact-info}>Contatos</h3>
        <address>
          <a href={tel:+552499999999} class={contact-info}>Telefone: +552499999999</a>
          <a href={mailto:justice@league.com} class={contact-info}>Email de Contato: justice@league.com</a>
          <div id={midiaSocial}>
            <a href={facebook.com/JusticeLeague}><img src={../../Assets/face.png} alt={Logo facebook} class={media-logo} /></a>
            <a href={instagram.com/JusticeLeague}><img src={../../Assets/intagram.png} alt={Logo Inst} class={media-logo} /></a>
            <a href={twitter.com/JusticeLeague}><img src={../../Assets/twitter.png} alt={Logo twitter} class={media-logo} /></a>
          </div>
        </address>
      </section>
    </div>
    <address id={copyright}>
      <p>Danilo, Fred, João Paulo, José Vitor, Lilica, Lucas, Rodrigo @Copyright</p>
    </address>
  </footer>
);

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;
