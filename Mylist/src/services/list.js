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
    // params: (productId, listId) — se llamaba con (id, this.casa._id)
    // ruta correcta en backend: /users/lista/{listId}/producto/{productId}
    const response = await API.delete(`/users/lista/${id}/producto/${list}`);
      return response.data;
    } catch (error) {
      // Si axios proporciona response, incluimos status y url para diagnóstico
      if (error && error.response) {
        return { error: error.response.data || error.message, status: error.response.status, url: error.config && (error.config.url || error.config.baseURL + error.config.url) }
      }
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