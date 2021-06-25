import React from 'react';
import Categoria from '../Categoria/Categoria'
import Cliente from '../Cliente/Cliente';
import Funcionario from '../Funcionario/Funcionario'
import Produto from '../Produto/Produto'
import './Crud.css';
import styled from 'styled-components';

const { useState } = React;

const tabItems = [
  {
    id: 1,
    title: 'Produto',
    content: <Produto/>,
  },
  {
    id: 2,
    title: 'Funcionário',
    content: <Funcionario/>,
  },
  {
    id: 3,
    title: 'Categoria',
    content: <Categoria/>,
  },
  {
    id: 4,
    title: 'Cliente',
    content: <Cliente/>,
  },
];

const deslogar = () => (
    localStorage.removeItem('TOKEN')
);

const botaoDeslogar = ({className, children}) => (
  <a className={className} href="/" onClick={deslogar} >
    {children}
  </a>
)

const Button = styled(botaoDeslogar)`
background-color: #DC143C;
  border: none;
  color: white;
  text-align: center;
  height: 7vh;
  width: 7vw;
  margin-left:30vw;
  vertical-align: middle;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1vw;
  border-radius: 0.5vw;
`;

const Crud = () => {
  const [active, setActive] = useState(1);
  return (
  <div className='Crud'>
    
    <div className="wrapper">
      <div className="tabs">
        {tabItems.map(({ id, title }) =><TabItemComponent
           key={title}
           title={title}
           onItemClicked={() => setActive(id) }
           isActive={active === id}
         />
      )}
      <div className="deslogar">
        <Button>Deslogar</Button>
      </div>
      </div>
      <div className="contentC">
        {tabItems.map(({ id, content }) => {
          return active === id ? content : ''
        })}
      </div>
     </div>
  </div>
  )
}

const TabItemComponent = ({
  title = '',
  onItemClicked = () => console.error('You passed no action to the component'),
  isActive = false,
}) => {
  return (
    <div className={isActive ? 'tabitem' : 'tabitem tabitem--inactive'} onClick={onItemClicked}>
      <p className="tabitem__title">{title}</p>
    </div>
  )
};



// const Crud = () => (
//   <div className={styles.Crud}>
//     <Button className={styles.Button} value='Cliente' selected={true}></Button>
//     <Button className={styles.Button} value='Categoria' selected={false}></Button>
//     <Button className={styles.Button} value='Funcionário' selected={false}></Button>
//     <Button className={styles.Button} value='Produto' selected={false}></Button>

//     <Cliente/>
//     <Categoria/>
//     <Funcionario/>
//     <Produto/>
//   </div>
// );

export default Crud;
