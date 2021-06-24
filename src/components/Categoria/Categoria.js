import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import CategoriaService from './CategoriaService'
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const DataTableCrudDemo = () => {

    let emptyCategoria = {
        nome: '',
        descricao: '',
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
    const categoriaService = new CategoriaService();

    useEffect(() => {
        categoriaService.getCategorias().then(data => setCategorias(data));
    }, []);

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


    const saveCategoria = async () => {
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

                const response = await   categoriaService.postCategorias(_categoria) 
                
                _categorias.push(response);

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

    // const confirmDeleteCategoria = (categoria) => {
    //     setCategoria(categoria);
    //     setDeleteCategoriaDialog(true);
    // }

    const deleteCategoria = () => {
        let _categorias = categorias.filter(val => val.id !== categoria.id);
        setCategoria(_categorias);
        setDeleteCategoriaDialog(false);
        setCategoria(emptyCategoria);
        categoriaService.deleteCategorias(categoria.id)
        toast.current.show({ severity: 'Sucesso', summary: 'Com Sucesso', detail: 'Categoria Deletada', life: 3000 });
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

        toast.current.show({ severity: 'Sucesso', summary: 'Com Sucesso', detail: 'Categorias Deletadas', life: 3000 });
    }

    const onInputChange = (e, nome) => {
        const val = (e.target && e.target.value) || '';
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

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editCategoria(rowData)} />
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
         <div className="datatable-crud-demo"> 
            <Toast ref={toast} />

            <div className="card">
                <Toolbar className="p-mb-4" left={leftToolbarTemplate} ></Toolbar>


                <DataTable value={categorias} showGridlines autoLayout stripedRows selection={selectedCategorias} onSelectionChange={(e) => setSelectedCategorias(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Mostrando de {first} a {last} de um total de {totalRecords} Categorias"
                    globalFilter={globalFilter}
                    header={header}>

                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="id" header="ID" sortable></Column>
                    <Column field="nome" header="Nome" sortable></Column>
                    <Column field="descricao" header="Descrição" sortable></Column>
                    <Column body={actionBodyTemplate}></Column>
                </DataTable>
            </div>

            <Dialog visible={categoriaDialog} style={{ width: '450px' }} header="Detalhes da Categoria" modal className="p-fluid" footer={categoriaDialogFooter} onHide={hideDialog}>
                <div className="p-field">
                    <label htmlFor="nome">Nome</label>
                    <InputText id="nome" value={categoria.nome} onChange={(e) => onInputChange(e, 'nome')} required autoFocus className={classNames({ 'p-invalid': submitted && !categoria.nome })} />
                    {submitted && !categoria.nome && <small className="p-error">Nome é obrigatório.</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="descricao">Descrição</label>
                    <InputTextarea id="descricao" value={categoria.descricao} onChange={(e) => onInputChange(e, 'descricao')} required rows={3} cols={20} />
                </div>
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