import axios from "axios";
import { useAuthStore } from "../stores/store";

const API = axios.create({
  baseURL: "https://my-home-list.onrender.com/api",
  headers: { token: localStorage.getItem("token") },
});

async function getUser() {
  const store = useAuthStore();
  
  try {
    const response = await API.get("/users/profile", {
      headers: {
        token: store.token,
      },
    });
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
  const store = useAuthStore();
  try {
    const response = await API.delete("/users/profile", remove, {
      headers: {
        token: store.token,
      },
    });
    store.logout();
    return response.data;
  } catch (error) {
    return error;
  }
}

async function updateUser(newData) {
  const store = useAuthStore();
  try {
    const response = await API.put("/users/profile", newData, {
      headers: {
        token: store.token,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

async function getLista() {
  const store = useAuthStore();
  try {
    const response = await API.get("/users/lista", {
      headers: {
        token: store.token,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

async function getListaProducto() {
  const store = useAuthStore();
  try {
    const response = await API.get("/users/lista/producto", {
      headers: {
        token: store.token,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

async function createListAdd(list, info) {
  const store = useAuthStore();
  try {
    const response = await API.patch(
      "/users/lista/add",
      { id: list, producto: info },
      {
        headers: {
          token: store.token,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
}

async function updateListaRemoveCasa(lista, id, compra) {
  const store = useAuthStore();
  try {
    const response = await API.patch(`/users/lista/${lista}/remove/${id}/${compra}`, {
      headers: {
        token: store.token,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

async function updateListaRemoveCompra(lista, id) {
  const store = useAuthStore();
  try {
    const response = await API.patch(`/users/lista/${lista}/remove/compra/${id}`, {
      headers: {
        token: store.token,
      },
    });
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
