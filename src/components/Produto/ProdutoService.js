import api from '../../Services/api'
import Produto from './Produto';

export default class ProdutoService {

    getProdutosSmall() {
        return api.get('/produto').then(res => res.data);
    }

    getProdutos() {
        return api.get('/produto').then(res => res.data);
    }

    getProdutosWithOrdersSmall() {
        return api.get('data/produto-orders-small.json').then(res => res.data);
    }

    // postCategoriasSmall(){
    //     return api.post('./categoria', categoria).then(res => res.data)
    // }

    postProdutos(produto){
        return api.post('/produto', produto).then(res => res.data);
    }

    // postCategoriasWithOrderSmalll(){
    //     return api.post('data/products-orders-small.json').then(res => res.data)
    // }
    
    deleteProdutos(id){
        return api.delete(`/produto/${id}`).then(res => res.data)
    }


    putProdutos(produto){
        return api.put(`/produto/${produto.id}`, produto).then(res => res.data)
    }
}