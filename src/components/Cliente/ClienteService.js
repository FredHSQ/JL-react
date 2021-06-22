import api from '../../Services/api'

export default class ClienteService {

    getCliente() {
        return api.get('/cliente').then(res => res.data);
    }
}