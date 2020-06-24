import axios from 'axios';
import { AsyncStorage } from 'react-native';

const api = axios.create({
  baseURL: 'https://jc-api-fake.herokuapp.com',
})


const salvarUsuario = (usuario) =>{
  return api.post('/users',usuario);
}
const login = (login, senha) =>{
  return api.get(`/users?login=${login}&senha=${senha}`);
}

const salvarDespesa = (despesa) =>{
  return api.post('/financas',despesa);
}

const buscarDespesas = (user_id,page) =>{
  return api.get(`/financas?user=${user_id}&_page=${page}&_limit=5`);
}

const setIdUsuario = async (id) => {
  try {
    
    await AsyncStorage.setItem('user', JSON.stringify(id));


  } catch {}
};

const getIdUsuario = async() => {
  try {
    const getAsyncStorageData = await AsyncStorage.getItem('user');
    return JSON.parse(getAsyncStorageData);
  } catch {}
}


export default {
  salvarUsuario,
  login,
  salvarDespesa,
  buscarDespesas,
  setIdUsuario,
  getIdUsuario
}