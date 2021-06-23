import api from '../../Services/api'

export default class ClienteService {

    getClientes() {
        return api.get('/cliente').then(res => res.data);
    }

    postClientes(cliente){
        return api.post('/cliente', cliente).then(res => res.data);
    }

    putClientes(cliente){
        return api.put(`/cliente/${cliente.id}`, cliente).then(res => res.data);
    }

    deleteClientes(id) {
        return api.delete(`/cliente/${id}`).then(res => res.data);
    }
}