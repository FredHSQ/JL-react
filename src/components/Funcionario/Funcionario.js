// import React, { useState, useEffect } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import FuncionarioService from './FuncionarioService';

// const DataTableStripedDemo = () => {
//     const [funcionario, setFuncionario] = useState(null);
//     const funcionarioService = new FuncionarioService();

//     useEffect(() => {
//         funcionarioService.getFuncionario().then(data => setFuncionario(data));
//     }, []); // eslint-disable-line react-hooks/exhaustive-deps

//     return (
//         <div>
//             <div className="card">
//                 <DataTable value={funcionario} stripedRows>
//                     <Column field="id" header="ID"></Column>
//                     <Column field="nome" header="Nome"></Column>
//                     <Column field="cpf" header="CPF"></Column>
//                 </DataTable>
//             </div>
//         </div>
//     );
// }

// export default DataTableStripedDemo;


import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import FuncionarioService from './FuncionarioService'
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



const Funcionario = () => {

    let emptyFuncionario = {
        // id: null,
        nome: '',
        // image: null,
        cpf: '',
        // category: null,
        // price: 0,
        // quantity: 0,
        // rating: 0,
        // inventoryStatus: 'INSTOCK'
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
    // const dt = useRef(null); //exportar csv
    const funcionarioService = new FuncionarioService();

    useEffect(() => {
        funcionarioService.getFuncionario().then(data => setFuncionarios(data));
    }, []);

    // const formatCurrency = (value) => {
    //     return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    // }

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

    const saveFuncionario = () => {
        setSubmitted(true);

        if (funcionario.nome.trim()) {
            let _funcionarios = [...funcionarios];
            let _funcionario = {...funcionario};
            if (funcionario.id) {
                const index = findIndexById(funcionario.id);

                _funcionarios[index] = _funcionario;
                console.log(_funcionario);
                funcionarioService.putFuncionarios(_funcionario)
                toast.current.show({ severity: 'Sucesso', summary: 'Com Sucesso', detail: 'Funcionario Atualizado', life: 3000 });
            }
            else {
                // _funcionario.id = createId();
                // _product.image = 'product-placeholder.svg';
                _funcionarios.push(_funcionario);
                funcionarioService.postFuncionario(funcionario);
                // console.log(JSON.stringify(_funcionario));
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

    const confirmDeleteFuncionario = (funcionario) => {
        setFuncionario(funcionario);
        setDeleteFuncionarioDialog(true);
    }

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
        setDeleteFuncionariosDialog(true);
    }
    
    const deleteSelectedFuncionarios = () => {
        let _funcionarios = funcionarios.filter(val => !selectedFuncionarios.includes(val));
        setFuncionarios(_funcionarios);
        setDeleteFuncionariosDialog(false);
        setSelectedFuncionarios(null);

        for(let i = selectedFuncionarios.length - 1; i>= 0; i--){ 
            
            let obj = selectedFuncionarios[i];
            
            console.log(obj.id);

            funcionarioService.deleteFuncionarios(obj.id);
        }

        toast.current.show({ severity: 'Sucesso', summary: 'Com Sucesso', detail: 'Funcionarios Deletadas', life: 3000 });
    }

    //Não vamos usar funcionario
    // const onCategoryChange = (e) => {
    //     let _funcionario = {...funcionario};
    //     _product['category'] = e.value;
    //     setProduct(_product);
    // }

    const onInputChange = (e, nome) => {
        const val = (e.target && e.target.value) || '';
        let _funcionario = {...funcionario};
        _funcionario[`${nome}`] = val;

        setFuncionario(_funcionario);
    }

    const onInputNumberChange = (e, nome) => {
        const val = e.value || 0;
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
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editFuncionario(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteFuncionario(rowData)} />
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
        // <div className={DataTableDemo}>
         <div className="datatable-crud-demo"> 
            <Toast ref={toast} />

            <div className="card">
                <Toolbar className="p-mb-4" left={leftToolbarTemplate} ></Toolbar>
                {/* <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar> */}

                <DataTable value={funcionarios} selection={selectedFuncionarios} onSelectionChange={(e) => setSelectedFuncionarios(e.value)}
                // <DataTable ref={dt} value={funcionarios} selection={selectedFuncionarios} onSelectionChange={(e) => setSelectedFuncionarios(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Mostrando de {first} a {last} de um total de {totalRecords} Funcionarios"
                    globalFilter={globalFilter}
                    header={header}>

                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="id" header="ID" sortable></Column>
                    <Column field="nome" header="Nome" sortable></Column>
                    {/* <Column header="Image" body={imageBodyTemplate}></Column> */}
                    {/* <Column field="price" header="Price" body={priceBodyTemplate} sortable></Column> */}
                    {/* <Column field="category" header="Category" sortable></Column> */}
                    <Column field="cpf" header="CPF" sortable></Column>
                    {/* <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable></Column> */}
                    {/* <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable></Column> */}
                    <Column body={actionBodyTemplate}></Column>
                </DataTable>
            </div>

            <Dialog visible={funcionarioDialog} style={{ width: '450px' }} header="Detalhes da Funcionario" modal className="p-fluid" footer={funcionarioDialogFooter} onHide={hideDialog}>
                {/* {product.image && <img src={`showcase/demo/images/product/${product.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.image} className="product-image" />} */}
                <div className="p-field">
                    <label htmlFor="nome">Nome</label>
                    <InputText id="nome" value={funcionario.nome} onChange={(e) => onInputChange(e, 'nome')} required autoFocus className={classNames({ 'p-invalid': submitted && !funcionario.nome })} />
                    {submitted && !funcionario.nome && <small className="p-error">Nome é obrigatório.</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="cpf">CPF</label>
                    <InputTextarea id="cpf" value={funcionario.cpf} onChange={(e) => onInputChange(e, 'cpf')} required rows={3} cols={20} />
                </div>


                {/* Faz parte da CPF */}
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

