import apiModule, { axiosInstance as API } from './api'
// usamos API central (base: /api) y las rutas aquí añaden el prefijo 'list' cuando sea necesario

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
    const response = await API.post("/list", newList);
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }
  async function updateList (newData) {
    const store = useAuthStore()
    try {
  const response = await API.put('/list', newData)
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