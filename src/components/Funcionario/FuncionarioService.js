import api from '../../Services/api'

export default class FuncionarioService {

    getFuncionario() {
        return api.get('/funcionario').then(res => res.data);
    }

    postFuncionario(funcionario){
        return api.post('/funcionario', funcionario).then(res => res.data);
    }

    // postCategoriasWithOrderSmalll(){
    //     return api.post('data/products-orders-small.json').then(res => res.data)
    // }
    
    deleteFuncionarios(id){
        return api.delete(`/funcionario/${id}`).then(res => res.data)
    }


    putFuncionarios(funcionario){
        return api.put(`/funcionario/${funcionario.id}`, funcionario).then(res => res.data)
    }
}