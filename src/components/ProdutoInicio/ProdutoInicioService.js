import api from '../../Services/api'

export default class ProdutoInicioService {

    getProdutosSmall() {
        return api.get('/produto').then(res => res.data);
    }

    getProdutos() {
        return api.get('/produto').then(res => res.data);
    }

    getProdutosWithOrdersSmall() {
        return api.get('data/produto-orders-small.json').then(res => res.data);
    }
}