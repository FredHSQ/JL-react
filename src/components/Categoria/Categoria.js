// import CategoriaService from './CategoriaService';
// import styles from './Categoria.module.css';
// import CategoriaService from './CategoriaService';
// import { useEffect, useState } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';


// const Categoria = () => {
//     const [categoria, setCategoria] = useState([]);
//     const categoriaService = new CategoriaService();

//     const columns = [
//         {field: 'id', header: 'Código'},
//         {field: 'nome', header: 'Nome'},
//         {field: 'descricao', header: 'Descrição'},
//     ];

//     useEffect(() => {
//         categoriaService.getCategorias().then(data => setCategoria(data));
//     }, []);

//     const dynamicColumns = columns.map((col,i) => {
//         return <Column key={col.field} field={col.field} header={col.header} />;
//     });

//     return ( 
//     <div>
//         <div className="card">
//             <DataTable value={categoria}>
//                 {dynamicColumns}
//             </DataTable>
//         </div>
//     </div> 
//     );
// }

// export default Categoria;

import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import CategoriaService from './CategoriaService'
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import DataTableDemo from './DataTableDemo.css';
import { styles } from 'ansi-colors';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
// import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
// import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'
// import 'primereact/resources/themes/bootstrap4-light-purple/theme.css'
// import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css'
// import 'primereact/resources/themes/bootstrap4-dark-purple/theme.css'
// import 'primereact/resources/themes/md-light-indigo/theme.css'
// import 'primereact/resources/themes/md-light-deeppurple/theme.css'
// import 'primereact/resources/themes/md-dark-indigo/theme.css'
// import 'primereact/resources/themes/md-dark-deeppurple/theme.css'
// import 'primereact/resources/themes/mdc-light-indigo/theme.css'
// import 'primereact/resources/themes/mdc-light-deeppurple/theme.css'
// import 'primereact/resources/themes/mdc-dark-indigo/theme.css'
// import 'primereact/resources/themes/mdc-dark-deeppurple/theme.css'
// import 'primereact/resources/themes/fluent-light/theme.css'
// import 'primereact/resources/themes/saga-blue/theme.css'
// import 'primereact/resources/themes/saga-green/theme.css'
// import 'primereact/resources/themes/saga-orange/theme.css'
// import 'primereact/resources/themes/saga-purple/theme.css'
// import 'primereact/resources/themes/vela-blue/theme.css'
// import 'primereact/resources/themes/vela-green/theme.css'
// import 'primereact/resources/themes/vela-orange/theme.css'
// import 'primereact/resources/themes/vela-purple/theme.css'
// import 'primereact/resources/themes/arya-blue/theme.css'
// import 'primereact/resources/themes/arya-green/theme.css'
// import 'primereact/resources/themes/arya-orange/theme.css'
// import 'primereact/resources/themes/arya-purple/theme.css'
// import 'primereact/resources/themes/nova/theme.css'
// import 'primereact/resources/themes/nova-alt/theme.css'
// import 'primereact/resources/themes/nova-accent/theme.css'
// import 'primereact/resources/themes/luna-amber/theme.css'
// import 'primereact/resources/themes/luna-blue/theme.css'
// import 'primereact/resources/themes/luna-green/theme.css'
// import 'primereact/resources/themes/luna-pink/theme.css'
// import 'primereact/resources/themes/rhea/theme.css'



const DataTableCrudDemo = () => {

    let emptyCategoria = {
        // id: null,
        nome: '',
        // image: null,
        descricao: '',
        // category: null,
        // price: 0,
        // quantity: 0,
        // rating: 0,
        // inventoryStatus: 'INSTOCK'
    };

    const [categorias, setCategorias] = useState(null);
    const [categoriaDialog, setCategoriaDialog] = useState(false);
    const [deleteCategoriaDialog, setDeleteCategoriaDialog] = useState(false);
    const [deleteCategoriasDialog, setDeleteCategoriasDialog] = useState(false);
    const [categoria, setCategoria] = useState(emptyCategoria);
    const [selectedCategorias, setSelectedCategorias] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    // const dt = useRef(null); //exportar csv
    const categoriaService = new CategoriaService();

    useEffect(() => {
        categoriaService.getCategorias().then(data => setCategorias(data));
    }, []);

    // const formatCurrency = (value) => {
    //     return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    // }

    const openNew = () => {
        setCategoria(emptyCategoria);
        setSubmitted(false);
        setCategoriaDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setCategoriaDialog(false);
    }

    const hideDeleteCategoriaDialog = () => {
        setDeleteCategoriaDialog(false);
    }

    const hideDeleteCategoriasDialog = () => {
        setDeleteCategoriasDialog(false);
    }

    const saveCategoria = () => {
        setSubmitted(true);

        if (categoria.nome.trim()) {
            let _categorias = [...categorias];
            let _categoria = {...categoria};
            if (categoria.id) {
                const index = findIndexById(categoria.id);

                _categorias[index] = _categoria;
                console.log(_categoria);
                categoriaService.putCategorias(_categoria)
                toast.current.show({ severity: 'Sucesso', summary: 'Com Sucesso', detail: 'Categoria Atualizada', life: 3000 });
            }
            else {
                // _categoria.id = createId();
                // _product.image = 'product-placeholder.svg';
                _categorias.push(_categoria);
                categoriaService.postCategorias(_categoria);
                console.log(JSON.stringify(_categoria));
                toast.current.show({ severity: 'Sucesso', summary: 'Com Sucesso', detail: 'Categoria Criada', life: 3000 });
            }

            setCategorias(_categorias);
            setCategoriaDialog(false);
            setCategoria(emptyCategoria);
        }
    }

    const editCategoria = (categoria) => {
        setCategoria({...categoria});
        setCategoriaDialog(true);
    }

    const confirmDeleteCategoria = (categoria) => {
        setCategoria(categoria);
        setDeleteCategoriaDialog(true);
    }

    const deleteCategoria = () => {
        let _categorias = categorias.filter(val => val.id !== categoria.id);
        setCategoria(_categorias);
        setDeleteCategoriaDialog(false);
        setCategoria(emptyCategoria);
        categoriaService.deleteCategorias(categoria.id)
        toast.current.show({ severity: 'Sucesso', summary: 'Com Sucesso', detail: 'Product Deletado', life: 3000 });
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < categorias.length; i++) {
            if (categorias[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    //VEFIRICAR
    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    //exportar
    // const exportCSV = () => {
    //     dt.current.exportCSV();
    // }

    const confirmDeleteSelected = () => {
        setDeleteCategoriasDialog(true);
    }
    
    const deleteSelectedCategorias = () => {
        let _categorias = categorias.filter(val => !selectedCategorias.includes(val));
        setCategorias(_categorias);
        setDeleteCategoriasDialog(false);
        setSelectedCategorias(null);

        for(let i = selectedCategorias.length - 1; i>= 0; i--){ 
            
            let obj = selectedCategorias[i];
            
            console.log(obj.id);

            categoriaService.deleteCategorias(obj.id);
        }

        toast.current.show({ severity: 'Sucesso', summary: 'Com Sucesso', detail: 'Produtos Deletados', life: 3000 });
    }

    //Não vamos usar categoria
    // const onCategoryChange = (e) => {
    //     let _categoria = {...categoria};
    //     _product['category'] = e.value;
    //     setProduct(_product);
    // }

    const onInputChange = (e, nome) => {
        const val = (e.target && e.target.value) || '';
        let _categoria = {...categoria};
        _categoria[`${nome}`] = val;

        setCategoria(_categoria);
    }

    const onInputNumberChange = (e, nome) => {
        const val = e.value || 0;
        let _categoria = {...categoria};
        _categoria[`${nome}`] = val;

        setCategoria(_categoria);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Novo" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
                <Button label="Deletar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedCategorias || !selectedCategorias.length} />
            </React.Fragment>
        )
    }

    //Export, Import
    // const rightToolbarTemplate = () => {
    //     return (
    //         <React.Fragment>
    //             <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" />
    //             <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
    //         </React.Fragment>
    //     )
    // }

    //Não usaremos imagem
    // const imageBodyTemplate = (rowData) => {
    //     return <img src={`showcase/demo/images/product/${rowData.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />
    // }

    //Preço
    // const priceBodyTemplate = (rowData) => {
    //     return formatCurrency(rowData.price);
    // }

    //Avaliação
    // const ratingBodyTemplate = (rowData) => {
    //     return <Rating value={rowData.rating} readOnly cancel={false} />;
    // }

    //Status produto
    // const statusBodyTemplate = (rowData) => {
    //     return <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
    // }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editCategoria(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteCategoria(rowData)} />
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Gerenciamento de Categorias</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Procure..." />
            </span>
        </div>
    );

    const categoriaDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" className="p-button-text" onClick={saveCategoria} />
        </React.Fragment>
    );
    const deleteCategoriaDialogFooter = (
        <React.Fragment>
            <Button label="Não" icon="pi pi-times" className="p-button-text" onClick={hideDeleteCategoriaDialog} />
            <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={deleteCategoria} />
        </React.Fragment>
    );
    const deleteCategoriasDialogFooter = (
        <React.Fragment>
            <Button label="Não" icon="pi pi-times" className="p-button-text" onClick={hideDeleteCategoriasDialog} />
            <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedCategorias} />
        </React.Fragment>
    );

    return (
        // <div className={DataTableDemo}>
         <div className="datatable-crud-demo"> 
            <Toast ref={toast} />

            <div className="card">
                <Toolbar className="p-mb-4" left={leftToolbarTemplate} ></Toolbar>
                {/* <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar> */}

                <DataTable value={categorias} selection={selectedCategorias} onSelectionChange={(e) => setSelectedCategorias(e.value)}
                // <DataTable ref={dt} value={categorias} selection={selectedCategorias} onSelectionChange={(e) => setSelectedCategorias(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Mostrando de {first} a {last} de um total de {totalRecords} Categorias"
                    globalFilter={globalFilter}
                    header={header}>

                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="id" header="ID" sortable></Column>
                    <Column field="nome" header="Nome" sortable></Column>
                    {/* <Column header="Image" body={imageBodyTemplate}></Column> */}
                    {/* <Column field="price" header="Price" body={priceBodyTemplate} sortable></Column> */}
                    {/* <Column field="category" header="Category" sortable></Column> */}
                    <Column field="descricao" header="Descrição" sortable></Column>
                    {/* <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable></Column> */}
                    {/* <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable></Column> */}
                    <Column body={actionBodyTemplate}></Column>
                </DataTable>
            </div>

            <Dialog visible={categoriaDialog} style={{ width: '450px' }} header="Detalhes da Categoria" modal className="p-fluid" footer={categoriaDialogFooter} onHide={hideDialog}>
                {/* {product.image && <img src={`showcase/demo/images/product/${product.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.image} className="product-image" />} */}
                <div className="p-field">
                    <label htmlFor="nome">Nome</label>
                    <InputText id="nome" value={categoria.nome} onChange={(e) => onInputChange(e, 'nome')} required autoFocus className={classNames({ 'p-invalid': submitted && !categoria.nome })} />
                    {submitted && !categoria.nome && <small className="p-error">Nome é obrigatório.</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="descricao">Descrição</label>
                    <InputTextarea id="descricao" value={categoria.descricao} onChange={(e) => onInputChange(e, 'descricao')} required rows={3} cols={20} />
                </div>


                {/* Faz parte da Descrição */}
                {/* <div className="p-field">
                    <label className="p-mb-3">Category</label>
                    <div className="p-formgrid p-grid">
                        <div className="p-field-radiobutton p-col-6">
                            <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={product.category === 'Accessories'} />
                            <label htmlFor="category1">Accessories</label>
                        </div>
                        <div className="p-field-radiobutton p-col-6">
                            <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={product.category === 'Clothing'} />
                            <label htmlFor="category2">Clothing</label>
                        </div>
                        <div className="p-field-radiobutton p-col-6">
                            <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={product.category === 'Electronics'} />
                            <label htmlFor="category3">Electronics</label>
                        </div>
                        <div className="p-field-radiobutton p-col-6">
                            <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={product.category === 'Fitness'} />
                            <label htmlFor="category4">Fitness</label>
                        </div>
                    </div>
                </div> */}

                    {/* <div className="p-formgrid p-grid">
                            <div className="p-field p-col">
                                <label htmlFor="price">Price</label>
                                <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                            </div>
                            <div className="p-field p-col">
                                <label htmlFor="quantity">Quantity</label>
                                <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly />
                            </div>
                        </div> */}
                    </Dialog>
                    <Dialog visible={deleteCategoriaDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteCategoriaDialogFooter} onHide={hideDeleteCategoriaDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {categoria && <span>Você está certo que você quer excluir? <b>{categoria.nome}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteCategoriasDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteCategoriasDialogFooter} onHide={hideDeleteCategoriasDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {categoria && <span>Você está certo que você quer excluir essa categoria?</span>}
                </div>
            </Dialog>
        </div>
    );
}




export default DataTableCrudDemo;