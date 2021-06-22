import api from '../../Services/api'

export default class CategoriaService {

    getCategoriasSmall() {
        return api.get('/categoria').then(res => res.data);
    }

    getCategorias() {
        return api.get('/categoria').then(res => res.data);
    }

    getCategoriasWithOrdersSmall() {
        return api.get('data/products-orders-small.json').then(res => res.data);
    }
}