/** * Created by vouill on 11/13/17. */

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Inicio <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="isAuthenticated" to="/account" class="nav-link">Perfil<span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item">
            <router-link to="/usuario/agregar" class="nav-link">Agregar Perfil<span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item">
            <a href="#!" v-if="isAuthenticated" @click.prevent="cerrarSesion" class="nav-link">Cerrar Sesion<span class="sr-only">(current)</span></a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
  </header>
</template>

<script>
  import {AUTH_LOGOUT, AUTH_REQUEST} from "@/store/actions/auth";
import {mapGetters} from "vuex";

export default {
  name: "header-nav",
  data() {
    return {
      email: "admin@usuarios.com.py",
      password: "adm1n"
    };
  },
  methods: {
    login: function() {
      const { email, password } = this;
      this.$store.dispatch(AUTH_REQUEST, { email, password }).then(() => {
        this.$router.push("/");
      });
    },
    cerrarSesion: function () {
      this.$store.dispatch(AUTH_LOGOUT)
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated", "authStatus", "isAdmin"]),
  }
};
</script>
