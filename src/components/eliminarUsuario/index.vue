<template>
  <div class="row">
    <h2>Eliminar Usuario {{nombre.valor}}</h2>
    <form v-if="!cargando" class="col-md-12" action="" v-on:submit.prevent="!cargando && guardar()">
      <p>Advertencia: Esta operacin no se puede deshacer</p>
      <button class="btn btn-primary" type="submit" :disabled="cargando">
        <span v-if="cargando" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        {{!cargando?'Eliminar':'Eliminando'}}
      </button>
    </form>
  </div>

</template>

<script>
  import axios from "axios";
  import $ from 'jquery';
  export default {
    data() {
      return {
        cargando: true,
        nombre:{
          valor: '',
          error: false,
          mensajeError: 'No puede quedar vacio',
        },
        apellido:{
          valor: '',
          error: false,
          mensajeError: 'No puede quedar vacio',
        },
        username:{
          valor: '',
          error: false,
          mensajeError: 'No puede quedar vacio',
        },
        name:{
          valor: '',
          error: false,
          mensajeError: 'No puede quedar vacio',
        },
        nroCasa:{
          valor: '',
          error: false,
          mensajeError: 'No puede quedar vacio',
        },
        email: {
          valor: '',
          error: false,
          mensajeError: 'No puede quedar vacio',
        },
        password: {
          valor: '',
          error: false,
          mensajeError: 'No puede quedar vacio',
        },
        passwordConfirm:{
          valor: '',
          error: false,
          mensajeError: 'No puede quedar vacio',
        },
        nacimiento:{
          valor: '',
          error: false,
          mensajeError: 'No puede quedar vacio',
        },
        usuario: null,
      }
    },

    mounted() {
      console.log('hola');
      this.cargando = true;
      axios.get('/user',{params:{id:this.$route.params.id}}).then((response)=>{
        if(response.data.data.length > 0){
          const usuario = response.data.data[0];
          this.nombre.valor = usuario.first_name;
          this.apellido.valor = usuario.last_name;
          this.email.valor = usuario.email;
          this.username.valor = usuario.username;
          this.name.valor = usuario.name;
        }else{
          $.notify({
            title: 'No se encontro ese usuario'
          })
          this.$router.go(-1);
        }
      }).catch((error)=>{
        $.notify({
          title: error.response.message
        })
      }).finally(()=>{
        this.cargando = false;
      })
    },

    methods: {
      guardar(){
        this.cargando = true;
        axios.delete('/user/'+this.$route.params.id)
                // eslint-disable-next-line no-unused-vars
        .then((response)=>{
          $.notify({
            title:'Eliminado'
          },{
            type:'success',
          })
          this.$router.go(-1);
        })
        .catch((error) =>{
          $.notify({
            title: error.response.message,
          })
        }).finally(()=>{
          this.cargando=false;
        });
      },
    }
  }
</script>
