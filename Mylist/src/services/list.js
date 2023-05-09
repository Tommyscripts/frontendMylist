import axios from 'axios'
import { useAuthStore } from '../stores/store'


const API = axios.create({
  baseURL: 'https://my-home-list.onrender.com/api/list',
  headers: {token: localStorage.getItem('token')}
})

async function getList() {
    try {
      const response = await API.get("/list");
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }
  async function createList(newList) {
    const store = useAuthStore();
    try {
      const response = await API.post("/list", newList, {
        headers: {
          token: store.token,
        },
      });
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }
  async function updateList (newData) {
    const store = useAuthStore()
    try {
      const response = await API.put('/list', newData, {
        headers: {
          token: store.token,
        }
      })
      return response.data
    } catch (error) {
      return { error: error.message }
    }
  }

  async function deleteList(id) {
    try {
      const response = await API.delete(`/list/${id}`);
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }
  async function delteProductoById(list, id) {
    try {
      const response = await API.delete(`list/${id}/producto/${list}`);
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }

  export default{
    getList,
    createList,
    updateList,
    deleteList,
    delteProductoById

  }