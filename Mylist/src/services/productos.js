import apiModule, { axiosInstance as API } from './api'
// ahora usamos el API central que ya inyecta token desde localStorage via interceptor

async function addProduct() {
    try {
      const response = await API.get("/productos/products");
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }
  async function createProduct(newProducto) {
    try {
      const response = await API.post("/productos/products", newProducto);
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