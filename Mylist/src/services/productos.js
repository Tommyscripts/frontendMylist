import axios from 'axios'
import { useAuthStore } from '../stores/store'


const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {token: localStorage.getItem('token')}
})

async function addProduct() {
    try {
      const response = await API.get("/productos/products");
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }
  async function createProduct(newProducto) {
    const store = useAuthStore();
    try {
      const response = await API.post("/productos/products", newProducto, {
        headers: {
          token: store.token,
        },
      });
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }
  async function deleteProductById(id) {
    try {
      const response = await API.delete(`/productos/products/${id}`);
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }

export default{
    addProduct,
    createProduct,
    deleteProductById
}