import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/home";
import Account from "@/components/account";
import Login from "@/components/login";
import store from "../store";
import EditarUsuario from '@/components/editarUsuario';
import EliminarUsuario from '@/components/eliminarUsuario';
import AgregarUsuario from '@/components/agregarUsuario';

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/");
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/login");
};

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/account",
      name: "Account",
      component: Account,
      beforeEnter: ifAuthenticated
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: "/usuario/editar/:id",
      name: "EditarUsuario",
      component: EditarUsuario,
    },
    {
      path: "/usuario/eliminar/:id",
      name: "EliminarUsuario",
      component: EliminarUsuario,
    },
    {
      path: "/usuario/agregar",
      name: "AgregarUsuario",
      component: AgregarUsuario,
    }
  ]
});
