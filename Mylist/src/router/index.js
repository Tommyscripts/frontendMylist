import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import SignUpView from "../views/SignUpView.vue";
import AdminView from "../views/AdminView.vue";
import UserProfile from "../views/ProfileUserView.vue";
import Soporte from "../views/Soporte.vue";
import Categorias from "../views/TodosLosProductosView.vue";
import Carnes from "../views/CarnesView.vue";
import Pescados from "../views/pescaderiaView.vue";
import Congelados from "../views/CongeladosView.vue";
import Arroz from "../views/ArrocesView.vue";
import Lacteo from "../views/LacteosYHuevosView.vue";
import Pasta from "../views/PastaView.vue";
import Verduras from "../views/VerdurasView.vue";
import Frutas from "../views/FrutasView.vue";
import Embutidos from "../views/EmbutidosView.vue";
import Panaderia from "../views/PanaderiaView.vue";
import FrutosSecos from "../views/FrutosSecosView.vue";
import Salsas from "../views/SalsasView.vue";
import Encurtidos from "../views/EncurtidosView.vue";
import CafeyAzucar from "../views/CafeyAzucarView.vue";
import Bolleria from "../views/BolleriaView.vue";
import Limpieza from "../views/LimpiezaView.vue";
import ListaDeCasa from "../views/ListaDeCasaView.vue";
import ListaDeLaCompra from "../views/ListaDeLaCompraView.vue";
import ConfirmarBorrarCuenta from "../views/confirmarEliminarcuentaView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUpView,
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminView,
    },
    {
      path: "/profile",
      name: "profile",
      component: UserProfile,
    },
    {
      path: "/soporte",
      name: "soporte",
      component: Soporte,
    },
    {
      path: "/categorias",
      name: "categorias",
      component: Categorias,
    },
    {
      path: "/carnes",
      name: "carnes",
      component: Carnes,
    },
    {
      path: "/pescados",
      name: "pescados",
      component: Pescados,
    },
    {
      path: "/congelados",
      name: "congelados",
      component: Congelados,
    },
    {
      path: "/arroces",
      name: "arroces",
      component: Arroz,
    },
    {
      path: "/lacteosyhuevos",
      name: "lacteosyhuevos",
      component: Lacteo,
    },
    {
      path: "/pasta",
      name: "pasta",
      component: Pasta,
    },
    {
      path: "/verduras",
      name: "verduras",
      component: Verduras,
    },
    {
      path: "/frutas",
      name: "frutas",
      component: Frutas,
    },
    {
      path: "/embutidos",
      name: "embutidos",
      component: Embutidos,
    },
    {
      path: "/panaderia",
      name: "panaderia",
      component: Panaderia,
    },
    {
      path: "/frutosSecos",
      name: "frutosSecos",
      component: FrutosSecos,
    },
    {
      path: "/salsas",
      name: "salsas",
      component: Salsas,
    },
    {
      path: "/encurtidos",
      name: "encurtidos",
      component: Encurtidos,
    },
    {
      path: "/cafeyazucar",
      name: "cafeyazucar",
      component: CafeyAzucar,
    },
    {
      path: "/bolleria",
      name: "bolleria",
      component: Bolleria,
    },
    { path: "/limpieza", name: "limpieza", component: Limpieza },
    { path: "/listadecasa", name: "listadecasa", component: ListaDeCasa },
    {
      path: "/listadelacompra",
      name: "listadelacompra",
      component: ListaDeLaCompra,
    },
    {
      path: "/ConfirmarEliminar",
      name: "ConfirmarEliminar",
      component: ConfirmarBorrarCuenta
    },
  ],
});

export default router;
