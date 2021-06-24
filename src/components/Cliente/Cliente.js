import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ClienteService from './ClienteService'
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
import { Calendar } from 'primereact/calendar';

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

    let emptyCliente = {
        id: '',
        nome: '',
        cpf: '',
        email: '',
        dataNascimento: '',
        endereco:{
           rua:'ahhaha',
           estado:'rj',
            cidade:'wdadwad',
        },
        usuario:'dwadawdwadwa'
    };

    const [clientes, setClientes] = useState(null);
    const [clienteDialog, setClienteDialog] = useState(false);
    const [deleteClienteDialog, setDeleteClienteDialog] = useState(false);
    const [deleteClientesDialog, setDeleteClientesDialog] = useState(false);
    const [cliente, setCliente] = useState(emptyCliente);
    const [selectedClientes, setSelectedClientes] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    // const dt = useRef(null); //exportar csv
    const clienteService = new ClienteService();

    useEffect(() => {
        clienteService.getClientes().then(data => setClientes(data));
    }, []);

    // const formatCurrency = (value) => {
    //     return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    // }

    const openNew = () => {
        setCliente(emptyCliente);
        setSubmitted(false);
        setClienteDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setClienteDialog(false);
    }

    const hideDeleteClienteDialog = () => {
        setDeleteClienteDialog(false);
    }

    const hideDeleteClientesDialog = () => {
        setDeleteClientesDialog(false);
    }

    const dataTemplate = (rawData) => {
        return new Date(rawData.dataNascimento).toLocaleDateString([],{year: 'numeric', month: 'numeric',day: 'numeric'});
      }
    
    const cpfTemplate = (rawData) => {
        return rawData.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/,'$1.$2.$3-$4');
      }
    
    const cepTemplate = (rawData) => {
        return rawData.endereco.cep.replace(/^(\d{5})(\d{3}).*/,'$1-$2');
      }

    const saveCliente = () => {
        setSubmitted(true);

        if (cliente.nome.trim()) {
            let _clientes = [...clientes];
            let _cliente = {...cliente};
            if (cliente.id) {
                const index = findIndexById(cliente.id);

                _clientes[index] = _cliente;
                console.log(_cliente);
                clienteService.putClientes(_cliente)
                toast.current.show({ severity: 'Sucesso', summary: 'Com Sucesso', detail: 'Cliente Atualizada', life: 3000 });
            }
            else {
                // _cliente.id = createId();
                // _product.image = 'product-placeholder.svg';
                _clientes.push(_cliente);
                clienteService.postClientes(_cliente);
                console.log(JSON.stringify(_cliente));
                toast.current.show({ severity: 'Sucesso', summary: 'Com Sucesso', detail: 'Cliente Criada', life: 3000 });
            }

            setClientes(_clientes);
            setClienteDialog(false);
            setCliente(emptyCliente);
        }
    }

    const editCliente = (cliente) => {
        setCliente({...cliente});
        setClienteDialog(true);
    }

    const confirmDeleteCliente = (cliente) => {
        setCliente(cliente);
        setDeleteClienteDialog(true);
    }

    const deleteCliente = () => {
        let _clientes = clientes.filter(val => val.id !== cliente.id);
        setCliente(_clientes);
        setDeleteClienteDialog(false);
        setCliente(emptyCliente);
        clienteService.deleteClientes(cliente.id)
        toast.current.show({ severity: 'Sucesso', summary: 'Com Sucesso', detail: 'Cliente Deletada', life: 3000 });
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < clientes.length; i++) {
            if (clientes[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    //VEFIRICAR
    // const createId = () => {
    //     let id = '';
    //     let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     for (let i = 0; i < 5; i++) {
    //         id += chars.charAt(Math.floor(Math.random() * chars.length));
    //     }
    //     return id;
    // }

    //exportar
    // const exportCSV = () => {
    //     dt.current.exportCSV();
    // }

    const confirmDeleteSelected = () => {
        setDeleteClientesDialog(true);
    }
    
    const deleteSelectedClientes = () => {
        let _clientes = clientes.filter(val => !selectedClientes.includes(val));
        setClientes(_clientes);
        setDeleteClientesDialog(false);
        setSelectedClientes(null);

        for(let i = selectedClientes.length - 1; i>= 0; i--){ 
            
            let obj = selectedClientes[i];
            
            console.log(obj.id);

            clienteService.deleteClientes(obj.id);
        }

        toast.current.show({ severity: 'Sucesso', summary: 'Com Sucesso', detail: 'Clientes Deletadas', life: 3000 });
    }

    //Não vamos usar cliente
    // const onCategoryChange = (e) => {
    //     let _cliente = {...cliente};
    //     _product['category'] = e.value;
    //     setProduct(_product);
    // }

    const onInputChange = (e, nome) => {
        const val = (e.target && e.target.value) || '';
        let _cliente = {...cliente};
        _cliente[`${nome}`] = val;

        setCliente(_cliente);
    }

    const onInputChangeData = (e, nome) => {
        const val = (e.target && e.target.value) || '';
        let _cliente = { ...cliente };
        _cliente[`${nome}`] = val;
    
        setCliente(_cliente);
      }

    const onInputAdressChange = (e, nome) => {
        const val = (e.target.value);
        let _cliente = {...cliente};
        _cliente.endereco[`${nome}`] = val;

        console.log(val);
        console.log(_cliente.endereco[`${nome}`]);
        console.log(nome);
        setCliente(_cliente);
    }

    const onFuncionarioChange = (e) => {
        let _cliente = { ...cliente };
        _cliente['cep'] = e.value.endereco.cep;
        console.log(e.value.endereco.cep);
        setCliente(_cliente);
      }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Novo" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
                <Button label="Deletar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedClientes || !selectedClientes.length} />
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
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editCliente(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteCliente(rowData)} />
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Gerenciamento de Clientes</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Procure..." />
            </span>
        </div>
    );

    const clienteDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" className="p-button-text" onClick={saveCliente} />
        </React.Fragment>
    );
    const deleteClienteDialogFooter = (
        <React.Fragment>
            <Button label="Não" icon="pi pi-times" className="p-button-text" onClick={hideDeleteClienteDialog} />
            <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={deleteCliente} />
        </React.Fragment>
    );
    const deleteClientesDialogFooter = (
        <React.Fragment>
            <Button label="Não" icon="pi pi-times" className="p-button-text" onClick={hideDeleteClientesDialog} />
            <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedClientes} />
        </React.Fragment>
    );

    return (
        // <div className={DataTableDemo}>
         <div className="datatable-crud-demo"> 
            <Toast ref={toast} />

            <div className="card">
                <Toolbar className="p-mb-4" left={leftToolbarTemplate} ></Toolbar>
                {/* <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar> */}

                <DataTable value={clientes} showGridlines autoLayout stripedRows selection={selectedClientes}  onSelectionChange={(e) => setSelectedClientes(e.value)}
                // <DataTable ref={dt} value={clientes} selection={selectedClientes} onSelectionChange={(e) => setSelectedClientes(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Mostrando de {first} a {last} de um total de {totalRecords} Clientes"
                    globalFilter={globalFilter}
                    header={header}>

                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="id" header="Código" sortable></Column>
                    <Column field="nome" header="Nome" sortable></Column>
                    <Column field="cpf" header="CPF" body={cpfTemplate} sortable></Column>
                    <Column field="email" header="E-mail" sortable></Column>
                    <Column field="dataNascimento" header="Data de nascimento" body={dataTemplate} sortable></Column>
                    <Column field="cliente.endereco.cep" header="CEP" body={cepTemplate} sortable></Column>
                    <Column field="cliente.endereco.numero" header="Número" sortable></Column>
                    <Column field="cliente.endereco.complemento" header="Complemento" sortable></Column>
                    <Column body={actionBodyTemplate}></Column>
                </DataTable>
            </div>

            <Dialog visible={clienteDialog} style={{ width: '450px' }} header="Detalhes da Cliente" modal className="p-fluid" footer={clienteDialogFooter} onHide={hideDialog}>
                {/* {product.image && <img src={`showcase/demo/images/product/${product.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.image} className="product-image" />} */}
                <div className="p-field">
                    <label htmlFor="nome">Nome</label>
                    <InputText id="nome" value={cliente.nome} onChange={(e) => onInputChange(e, 'nome')} required autoFocus className={classNames({ 'p-invalid': submitted && !cliente.nome })} />
                    {submitted && !cliente.nome && <small className="p-error">Nome é obrigatório.</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="cpf">CPF</label>
                    <InputText id="cpf" value={cliente.cpf} onChange={(e) => onInputChange(e, 'cpf')} required rows={3} cols={20} />
                </div>
                <div className="p-field">
                    <label htmlFor="email">E-mail</label>
                    <InputText id="email" value={cliente.email} onChange={(e) => onInputChange(e, 'email')} required rows={3} cols={20} />
                </div>
                <div className="p-field">
                    <label htmlFor="dataNascimento">Data de Nascimento</label>
                    <Calendar id="dataNascimento" value={cliente.dataNascimento} timezone="utc" onChange={(e) => onInputChangeData(e, 'dataNascimento')} />
                </div>
                <div className="p-field">
                    <label htmlFor="endereco.cep">CEP</label>
                    <InputText id="endereco.cep" value={cliente.cep} onChange={(e) => onInputAdressChange(e, 'cep')} required rows={3} cols={20} />
                </div>
                <div className="p-field">
                    <label htmlFor="endereco.numero">Número</label>
                    <InputText id="endereco.numero" value={cliente.numero} onChange={(e) => onInputAdressChange(e, 'numero')} required rows={3} cols={20} />
                </div>
                <div className="p-field">
                    <label htmlFor="endereco.complemento">Complemento</label>
                    <InputText id="endereco.complemento" value={cliente.complemento} onChange={(e) => onInputAdressChange(e, 'complemento')} required rows={3} cols={20} />
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
                    <Dialog visible={deleteClienteDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteClienteDialogFooter} onHide={hideDeleteClienteDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {cliente && <span>Você está certo que você quer excluir? <b>{cliente.nome}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteClientesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteClientesDialogFooter} onHide={hideDeleteClientesDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {cliente && <span>Você está certo que você quer excluir essa cliente?</span>}
                </div>
            </Dialog>
        </div>
    );
}




export default DataTableCrudDemo;