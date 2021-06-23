import api from '../../Services/api'

export default class CategoriaService {

    getCategoriasSmall() {
        return api.get('/categoria').then(res => res.data);
    }

    getCategorias() {
        return api.get('/categoria').then(res => res.data);
    }

    // getCategoriasWithOrdersSmall() {
    //     return api.get('data/products-orders-small.json').then(res => res.data);
    // }

    // postCategoriasSmall(){
    //     return api.post('./categoria', categoria).then(res => res.data)
    // }

    postCategorias(categoria){
        return api.post('/categoria', categoria).then(res => res.data);
    }

    // postCategoriasWithOrderSmalll(){
    //     return api.post('data/products-orders-small.json').then(res => res.data)
    // }
    
    deleteCategorias(id){
        return api.delete(`/categoria/${id}`).then(res => res.data)
    }


    putCategorias(categoria){
        return api.put(`/categoria/${categoria.id}`, categoria).then(res => res.data)
    }
}