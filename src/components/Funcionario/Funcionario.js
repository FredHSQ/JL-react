import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import FuncionarioService from './FuncionarioService'
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';


import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const Funcionario = () => {

    let emptyFuncionario = {
        nome: '',
        cpf: '',
    };

    const [funcionarios, setFuncionarios] = useState(null);
    const [funcionarioDialog, setFuncionarioDialog] = useState(false);
    const [deleteFuncionarioDialog, setDeleteFuncionarioDialog] = useState(false);
    const [deleteFuncionariosDialog, setDeleteFuncionariosDialog] = useState(false);
    const [funcionario, setFuncionario] = useState(emptyFuncionario);
    const [selectedFuncionarios, setSelectedFuncionarios] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const funcionarioService = new FuncionarioService();

    useEffect(() => {
        funcionarioService.getFuncionario().then(data => setFuncionarios(data));
    }, []);

    const openNew = () => {
        setFuncionario(emptyFuncionario);
        setSubmitted(false);
        setFuncionarioDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setFuncionarioDialog(false);
    }

    const hideDeleteFuncionarioDialog = () => {
        setDeleteFuncionarioDialog(false);
    }

    const hideDeleteFuncionariosDialog = () => {
        setDeleteFuncionariosDialog(false);
    }

    const saveFuncionario = async () => {
        setSubmitted(true);

        if (funcionario.nome.trim()) {
            let _funcionarios = [...funcionarios];
            let _funcionario = {...funcionario};
            if (funcionario.id) {
                const index = findIndexById(funcionario.id);

                _funcionarios[index] = _funcionario;
                funcionarioService.putFuncionarios(_funcionario)
                toast.current.show({ severity: 'Sucesso', summary: 'Com Sucesso', detail: 'Funcionario Atualizado', life: 3000 });
            }
            else {
 
                const response = await funcionarioService.postFuncionario(funcionario);
                _funcionarios.push(response);
                toast.current.show({ severity: 'Sucesso', summary: 'Com Sucesso', detail: 'Funcionario Criado', life: 3000 });
            }

            setFuncionarios(_funcionarios);
            setFuncionarioDialog(false);
            setFuncionario(emptyFuncionario);
        }
    }

    const editFuncionario = (funcionario) => {
        setFuncionario({...funcionario});
        setFuncionarioDialog(true);
    }

    // const confirmDeleteFuncionario = (funcionario) => {
    //     setFuncionario(funcionario);
    //     setDeleteFuncionarioDialog(true);
    // }

    const deleteFuncionario = () => {
        let _funcionarios = funcionarios.filter(val => val.id !== funcionario.id);
        setFuncionario(_funcionarios);
        setDeleteFuncionarioDialog(false);
        setFuncionario(emptyFuncionario);
        funcionarioService.deleteFuncionarios(funcionario.id)
        toast.current.show({ severity: 'Sucesso', summary: 'Com Sucesso', detail: 'Funcionario Deletada', life: 3000 });
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < funcionarios.length; i++) {
            if (funcionarios[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }


    const confirmDeleteSelected = () => {
        setDeleteFuncionariosDialog(true);
    }
    
    const deleteSelectedFuncionarios = () => {
        let _funcionarios = funcionarios.filter(val => !selectedFuncionarios.includes(val));
        setFuncionarios(_funcionarios);
        setDeleteFuncionariosDialog(false);
        setSelectedFuncionarios(null);

        for(let i = selectedFuncionarios.length - 1; i>= 0; i--){ 
            
            let obj = selectedFuncionarios[i];
            
            funcionarioService.deleteFuncionarios(obj.id);
        }

        toast.current.show({ severity: 'Sucesso', summary: 'Com Sucesso', detail: 'Funcionarios Deletadas', life: 3000 });
    }

    const onInputChange = (e, nome) => {
        const val = (e.target && e.target.value) || '';
        let _funcionario = {...funcionario};
        _funcionario[`${nome}`] = val;

        setFuncionario(_funcionario);
    }


    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Novo" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
                <Button label="Deletar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedFuncionarios || !selectedFuncionarios.length} />
            </React.Fragment>
        )
    }

 
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editFuncionario(rowData)} />
                {/* <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteFuncionario(rowData)} /> */}
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Gerenciamento de Funcionarios</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Procure..." />
            </span>
        </div>
    );

    const funcionarioDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" className="p-button-text" onClick={saveFuncionario} />
        </React.Fragment>
    );
    const deleteFuncionarioDialogFooter = (
        <React.Fragment>
            <Button label="Não" icon="pi pi-times" className="p-button-text" onClick={hideDeleteFuncionarioDialog} />
            <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={deleteFuncionario} />
        </React.Fragment>
    );
    const deleteFuncionariosDialogFooter = (
        <React.Fragment>
            <Button label="Não" icon="pi pi-times" className="p-button-text" onClick={hideDeleteFuncionariosDialog} />
            <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedFuncionarios} />
        </React.Fragment>
    );

    return (
         <div className="datatable-crud-demo"> 
            <Toast ref={toast} />

            <div className="card">
                <Toolbar className="p-mb-4" left={leftToolbarTemplate} ></Toolbar>

                <DataTable value={funcionarios} showGridlines autoLayout stripedRows selection={selectedFuncionarios} onSelectionChange={(e) => setSelectedFuncionarios(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Mostrando de {first} a {last} de um total de {totalRecords} Funcionarios"
                    globalFilter={globalFilter}
                    header={header}>

                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="id" header="ID" sortable></Column>
                    <Column field="nome" header="Nome" sortable></Column>
                    <Column field="cpf" header="CPF" sortable></Column>
                    <Column body={actionBodyTemplate}></Column>
                </DataTable>
            </div>

            <Dialog visible={funcionarioDialog} style={{ width: '450px' }} header="Detalhes da Funcionario" modal className="p-fluid" footer={funcionarioDialogFooter} onHide={hideDialog}>
                <div className="p-field">
                    <label htmlFor="nome">Nome</label>
                    <InputText id="nome" value={funcionario.nome} onChange={(e) => onInputChange(e, 'nome')} required autoFocus className={classNames({ 'p-invalid': submitted && !funcionario.nome })} />
                    {submitted && !funcionario.nome && <small className="p-error">Nome é obrigatório.</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="cpf">CPF</label>
                    <InputText id="cpf" value={funcionario.cpf} onChange={(e) => onInputChange(e, 'cpf')} required />
                </div>
                    </Dialog>
                    <Dialog visible={deleteFuncionarioDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteFuncionarioDialogFooter} onHide={hideDeleteFuncionarioDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {funcionario && <span>Você está certo que você quer excluir? <b>{funcionario.nome}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteFuncionariosDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteFuncionariosDialogFooter} onHide={hideDeleteFuncionariosDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {funcionario && <span>Você está certo que você quer excluir essa funcionario?</span>}
                </div>
            </Dialog>
        </div>
    );
}




export default Funcionario;

