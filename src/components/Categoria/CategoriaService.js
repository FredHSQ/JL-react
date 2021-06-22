import axios from 'axios';

export default class CategoriaService {

    getProductsSmall() {
        return axios.get('/categoria').then(res => res.data.data);
    }

    getProducts() {
        return axios.get('data/products.json').then(res => res.data.data);
    }

    getProductsWithOrdersSmall() {
        return axios.get('data/products-orders-small.json').then(res => res.data.data);
    }
}