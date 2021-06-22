import api from '../../Services/api'

export default class CategoriaService {

    getProductsSmall() {
        return api.get('/categoria').then(res => res.data);
    }

    getProducts() {
        return api.get('/categoria').then(res => res.data);
    }

    getProductsWithOrdersSmall() {
        return api.get('data/products-orders-small.json').then(res => res.data);
    }
}