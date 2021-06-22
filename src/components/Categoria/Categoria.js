import ProductService from './CategoriaService';
import styles from './Categoria.module.css';
import CategoriaService from './CategoriaService';
import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


const Categoria = () => {
    const [categoria, setCategoria] = useState([]);
    const categoriaService = new CategoriaService();

    useEffect(() => {
        categoriaService.getProducts().then(data => setCategoria(data));
    }, []);

    return ( 
    <div>
        <div className="card">
            <DataTable value={categoria}>
                <Column field="id" header="Código"></Column>
                <Column field="nome" header="Nome"></Column>
                <Column field="descricao" header="Descrição"></Column>
            </DataTable>
        </div>
    </div> 
    );
}

export default Categoria;