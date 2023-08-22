import axios from "axios";

const api = axios.create({
  //baseURL: 'http://localhost:3333' precisa da rota 
  //prompt ipconfig IPV4 disponivel
  baseURL: 'http://192.168.56.1:3333'
});

export default api;

