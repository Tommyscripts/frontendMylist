import axios from "axios";

const API = axios.create({
  baseURL: "https://my-home-list.onrender.com/api",
});

// Añadir interceptor para inyectar el token desde localStorage en cada petición
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    if (!config.headers) config.headers = {};
    config.headers.token = token;
  }
  return config;
});

async function getUser() {
  try {
    const response = await API.get("/users/profile");
    return response.data;
  } catch (error) {
    return error;
  }
}

async function signup(newUser) {
  try {
    const response = await API.post("/auth/signup", newUser);
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
}

async function login(User) {
  try {
    const response = await API.post("/auth/login", User);
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
}

async function deleteUser(remove) {
  try {
    // axios.delete acepta un objeto config como segundo parámetro; si necesitamos enviar body usar { data: remove }
    const response = await API.delete("/users/profile", { data: remove });
    return response.data;
  } catch (error) {
    return error;
  }
}

async function updateUser(newData) {
  try {
    const response = await API.put("/users/profile", newData);
    return response.data;
  } catch (error) {
    return error;
  }
}

async function getLista() {
  try {
    const response = await API.get("/users/lista");
    return response.data;
  } catch (error) {
    return error;
  }
}

async function getListaProducto() {
  try {
    const response = await API.get("/users/lista/producto");
    return response.data;
  } catch (error) {
    return error;
  }
}

async function createListAdd(list, info) {
  try {
    const response = await API.patch("/users/lista/add", { id: list, producto: info });
    return response.data;
  } catch (error) {
    return error;
  }
}

async function updateListaRemoveCasa(lista, id, compra) {
  try {
    const response = await API.patch(`/users/lista/${lista}/remove/${id}/${compra}`);
    return response.data;
  } catch (error) {
    return error;
  }
}

async function updateListaRemoveCompra(lista, id) {
  try {
    const response = await API.patch(`/users/lista/${lista}/remove/compra/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
}

export default {
  signup,
  login,
  deleteUser,
  updateUser,
  getUser,
  getLista,
  getListaProducto,
  createListAdd,
  updateListaRemoveCompra,
  updateListaRemoveCasa,
};

// también exportamos la instancia de axios para usos directos en otros servicios
export { API as axiosInstance };
