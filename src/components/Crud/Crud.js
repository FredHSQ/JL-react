import React from 'react';
import Categoria from '../Categoria/Categoria'
import Cliente from '../Cliente/Cliente';
import Funcionario from '../Funcionario/Funcionario'
import Produto from '../Produto/Produto'
import { useHistory } from 'react-router-dom'

import './Crud.css';

const { useState } = React;

const tabItems = [
  {
    id: 1,
    title: 'Cliente',
    content: <Cliente/>,
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
    title: 'Produto',
    content: <Produto/>,
  },
];

const Crud = () => {
 const [active, setActive] = useState(1);
  
  return (
  <div className='Crud'>
    <div className="wrapper">
      <div className="tabs">
        {tabItems.map(({ id, title }) =><TabItemComponent
           key={title}
           title={title}
           onItemClicked={() => setActive(id)}
           isActive={active === id}
         />
      )}
      </div>
      <div className="content">
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
      <p className={isActive ? "tabitem__title" : "tabitem__title tabitem--inactive__title"}>{title}</p>
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
