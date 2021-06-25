import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { classNames } from "primereact/utils";
import React, { useEffect, useRef, useState } from "react";
import categoriaService from "../Categoria/CategoriaService";
import ProdutoService from "./ProdutoService";
import funcionarioService from "../Funcionario/FuncionarioService";
import { Calendar } from "primereact/calendar";
import { Dropdown } from 'primereact/dropdown';

const Produto = () => {
  let emptyProduto = {
    nome: "",
    descricao: "",
    qtdEstoque: 0,
    valor: 0,
    idCategoria: "",
    nomeCategoria: "",
    idFuncionario: "",
    nomeFuncionario: "",
    dataFabricacao: "",
  };

  const [produtos, setProdutos] = useState(null);
  const [produtoDialog, setProdutoDialog] = useState(false);
  const [deleteProdutoDialog, setDeleteProdutoDialog] = useState(false);
  const [deleteProdutosDialog, setDeleteProdutosDialog] = useState(false);
  const [produto, setProduto] = useState(emptyProduto);
  const [selectedProdutos, setSelectedProdutos] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const produtoService = new ProdutoService();

  useEffect(() => {
    produtoService.getProdutos().then((data) => setProdutos(data));
  }, []);

  const formatCurrency = (value) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const openNew = () => {
    setProduto(emptyProduto);
    setSubmitted(false);
    setProdutoDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProdutoDialog(false);
  };

  const hideDeleteProdutoDialog = () => {
    setDeleteProdutoDialog(false);
  };

  const hideDeleteProdutosDialog = () => {
    setDeleteProdutosDialog(false);
  };

  const saveProduto = async () => {
    setSubmitted(true);

    if (produto.nome.trim()) {
      let _produtos = [...produtos];
      let _produto = { ...produto };
      if (produto.id) {
        const index = findIndexById(produto.id);

        _produtos[index] = _produto;
        let teste = produtoService.putProdutos(_produto);
        console.log(teste);
        toast.current.show({
          severity: "Sucesso",
          summary: "Com Sucesso",
          detail: "Produto Atualizada",
          life: 3000,
        });
      } else {
        console.log(_produto);
        const response = await produtoService.postProdutos(_produto);
        console.log(_produto);
        console.log(response);
        _produtos.push(response);

        toast.current.show({
          severity: "Sucesso",
          summary: "Com Sucesso",
          detail: "Produto Criada",
          life: 3000,
        });
      }

      setProdutos(_produtos);
      setProdutoDialog(false);
      setProduto(emptyProduto);
    }
  };

  const editProduto = (produto) => {
    setProduto({ ...produto });
    setProdutoDialog(true);
  };

  // const confirmDeleteProduto = (produto) => {
  //   setProduto(produto);
  //   setDeleteProdutoDialog(true);
  // }

  const deleteProduto = () => {
    let _produtos = produtos.filter((val) => val.id !== produto.id);
    setProduto(_produtos);
    setDeleteProdutoDialog(false);
    setProduto(emptyProduto);
    produtoService.deleteProdutos(produto.id);
    toast.current.show({
      severity: "Sucesso",
      summary: "Com Sucesso",
      detail: "Produto Deletado",
      life: 3000,
    });
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < produtos.length; i++) {
      if (produtos[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const confirmDeleteSelected = () => {
    setDeleteProdutosDialog(true);
  };

  const deleteSelectedProdutos = () => {
    let _produtos = produtos.filter((val) => !selectedProdutos.includes(val));
    setProdutos(_produtos);
    setDeleteProdutosDialog(false);
    setSelectedProdutos(null);

    for (let i = selectedProdutos.length - 1; i >= 0; i--) {
      let obj = selectedProdutos[i];

      produtoService.deleteProdutos(obj.id);
    }

    toast.current.show({
      severity: "Sucesso",
      summary: "Com Sucesso",
      detail: "Produtos Deletados",
      life: 3000,
    });
  };

  //Não vamos usar produto
  const onCategoriaChange = (e) => {
    let _produto = { ...produto };
    _produto["nomeCategoria"] = e.value.nome;
    _produto["idCategoria"] = e.value.id;
    setProduto(_produto);
  };

  const onFuncionarioChange = (e) => {
    let _produto = { ...produto };
    _produto["nomeFuncionario"] = e.value.nome;
    _produto["idFuncionario"] = e.value.id;
    setProduto(_produto);
  };

  const onInputChange = (e, nome) => {
    const val = (e.target && e.target.value) || "";
    let _produto = { ...produto };
    _produto[`${nome}`] = val;

    setProduto(_produto);
  };

  const onInputChangeData = (e, nome) => {
    const val = (e.target && e.target.value) || "";
    let _produto = { ...produto };
    _produto[`${nome}`] = val;

    setProduto(_produto);
  };

  const onInputNumberChange = (e, nome) => {
    const val = e.value || 0;
    let _produto = { ...produto };
    _produto[`${nome}`] = val;

    setProduto(_produto);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Toast ref={toast} />
        <Button
          label="Novo"
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={openNew}
        />
        <Button
          label="Deletar"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedProdutos || !selectedProdutos.length}
        />
      </React.Fragment>
    );
  };

  //Preço
  const valorBodyTemplate = (rowData) => {
    return formatCurrency(rowData.valor);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => editProduto(rowData)}
        />
        {/* <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduto(rowData)} /> */}
      </React.Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="p-m-0">Gerenciamento de Produtos</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Procure..."
        />
      </span>
    </div>
  );

  const produtoDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Salvar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveProduto}
      />
    </React.Fragment>
  );

  const deleteProdutoDialogFooter = (
    <React.Fragment>
      <Button
        label="Não"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProdutoDialog}
      />
      <Button
        label="Sim"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteProduto}
      />
    </React.Fragment>
  );

  const deleteProdutosDialogFooter = (
    <React.Fragment>
      <Button
        label="Não"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProdutosDialog}
      />
      <Button
        label="Sim"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedProdutos}
      />
    </React.Fragment>
  );

  const dataTemplate = (rawData) => {
    return new Date(rawData.dataFabricacao).toLocaleDateString([], {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  const categoriaService1 = new categoriaService();
  const [categoria, setCategoria] = useState([]);

  useEffect(() => {
    categoriaService1.getCategorias().then((data) => setCategoria(data));
  }, []);

  const mapCategoria = categoria.map((col, i) => {
    return (
      <div className="p-field-radiobutton p-col-6">
        <RadioButton
          inputId={`categoria${i}`}
          name="categoria"
          value={col}
          onChange={onCategoriaChange}
          checked={produto.nomeCategoria === col.nome}
        />
        <label htmlFor={`categoria1${i}`}>{col.nome}</label>
      </div>
    );
  });

  const funcionarioService1 = new funcionarioService();
  const [funcionario, setFuncionario] = useState([]);

  useEffect(() => {
    funcionarioService1.getFuncionario().then((data) => setFuncionario(data));
  }, []);

  const mapFuncionario = funcionario.map((col, i) => {
    return (
      <div className="p-field-radiobutton p-col-6 ">
        <RadioButton
          inputId={`funcionario${i}`}
          name="funcionario"
          value={col}
          onChange={onFuncionarioChange}
          checked={produto.nomeFuncionario === col.nome}
        />
        <label htmlFor={`funcionario1${i}`}>{col.nome}</label>
      </div>
    );
  });

  const monthNavigatorTemplate = (e) => {
    return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} style={{ lineHeight: 1 }} />;
  }

  const yearNavigatorTemplate = (e) => {
    return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} className="p-ml-2" style={{ lineHeight: 1 }} />;
  }

  return (
    <div className="datatable-crud-demo">
      <div className="card">
        <Toolbar className="p-mb-4" left={leftToolbarTemplate}></Toolbar>

        <DataTable
          value={produtos}
          showGridlines
          autoLayout
          stripedRows
          selection={selectedProdutos}
          onSelectionChange={(e) => setSelectedProdutos(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando de {first} a {last} de um total de {totalRecords} Produtos"
          globalFilter={globalFilter}
          header={header}
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column>
          <Column field="id" header="ID" sortable></Column>
          <Column field="nome" header="Nome" sortable></Column>
          <Column field="descricao" header="Descrição" sortable></Column>
          <Column
            field="valor"
            header="Preco"
            body={valorBodyTemplate}
            sortable
          ></Column>
          <Column field="qtdEstoque" header="Estoque" sortable></Column>
          <Column field="idCategoria" header="Categoria Id" sortable></Column>
          <Column field="nomeCategoria" header="Categoria" sortable></Column>
          <Column
            field="nomeFuncionario"
            header="Funcionario"
            sortable
          ></Column>
          <Column
            field="idFuncionario"
            header="Funcionário Id"
            sortable
          ></Column>
          <Column
            field="dataFabricacao"
            header="Data de Fabricação"
            body={dataTemplate}
          ></Column>
          <Column body={actionBodyTemplate}></Column>
        </DataTable>
      </div>

      <Dialog
        visible={produtoDialog}
        style={{ width: "450px" }}
        header="Detalhes do Produto"
        modal
        className="p-fluid"
        footer={produtoDialogFooter}
        onHide={hideDialog}
      >
        <div className="p-field">
          <label htmlFor="nome">Nome</label>
          <InputText
            id="nome"
            value={produto.nome}
            onChange={(e) => onInputChange(e, "nome")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !produto.nome })}
          />
          {submitted && !produto.nome && (
            <small className="p-error">Nome é obrigatório.</small>
          )}
        </div>
        <div className="p-field">
          <label htmlFor="descricao">Descrição</label>
          <InputTextarea
            id="descricao"
            value={produto.descricao}
            onChange={(e) => onInputChange(e, "descricao")}
            required
            rows={3}
            cols={20}
          />
        </div>
        <div className="p-field">
          <label htmlFor="dataFabricacao">Data de Fabricação</label>
          <Calendar
            id="dataFabricacao"
            value={produto.dataFabricacao}
            timezone="utc"
            onChange={(e) => onInputChangeData(e, "dataFabricacao")}
            monthNavigator yearNavigator yearRange="1900:2030"
            monthNavigatorTemplate={monthNavigatorTemplate}
            yearNavigatorTemplate={yearNavigatorTemplate}
          />
        </div>

        <div className="p-field">
          <label className="p-mb-3">Categoria</label>
          <div className="p-formgrid p-grid">
            <div className="p-field-radiobutton p-col-6" value={categoria}>
              {mapCategoria}
            </div>
          </div>
        </div>

        <div className="p-field">
          <label className="p-mb-3">Funcionario</label>
          <div className="p-formgrid p-grid">
            <div className="p-field-radiobutton p-col-6" value={funcionario}>
              {mapFuncionario}
            </div>
          </div>
        </div>

        <div className="p-formgrid p-grid">
          <div className="p-field p-col">
            <label htmlFor="valor">Preço</label>
            <InputNumber
              id="valor"
              value={produto.valor}
              onValueChange={(e) => onInputNumberChange(e, "valor")}
              mode="currency"
              currency="BRL"
              locale="pt-BR"
            />
          </div>
          <div className="p-field p-col">
            <label htmlFor="qtdEstoque">Quantidade Estoque</label>
            <InputNumber
              id="qtdEstoque"
              value={produto.qtdEstoque}
              onValueChange={(e) => onInputNumberChange(e, "qtdEstoque")}
              integeronly
            />
          </div>
        </div>
      </Dialog>
      <Dialog
        visible={deleteProdutoDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteProdutoDialogFooter}
        onHide={hideDeleteProdutoDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {produto && (
            <span>
              Você está certo que você quer excluir <b>{produto.nome}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteProdutosDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteProdutosDialogFooter}
        onHide={hideDeleteProdutosDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {produto && (
            <span>Você está certo que você quer excluir esse produto?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default Produto;
