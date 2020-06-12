<template>
  <div class="row">
    <h2>Editar Usuario</h2>
    <form v-if="!cargando" class="col-md-12" action="" v-on:submit.prevent="!cargando && guardar()">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="nombre">Nombre</label>
          <input v-model="nombre.valor" type="text" :class="'form-control'+((nombre.error === false)?'':(nombre.error===''?(' is-valid'):(' is-invalid')))" id="nombre" placeholder="Nombre">
          <div class="invalid-feedback">
            {{nombre.error}}
          </div>
        </div>
        <div class="form-group col-md-6">
          <label for="apellido">Apellido</label>
          <input v-model="apellido.valor" type="text" :class="'form-control'+((apellido.error === false)?'':(apellido.error===''?(' is-valid'):(' is-invalid')))" id="apellido" placeholder="Apellido">
          <div class="invalid-feedback">
            {{apellido.error}}
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputEmail4">Email</label>
          <input v-model="email.valor" type="email" :class="'form-control'+((email.error === false)?'':(email.error===''?(' is-valid'):(' is-invalid')))" id="inputEmail4" placeholder="Email">
          <div id="correoError" class="invalid-feedback">
            {{email.error}}
          </div>
        </div>
        <div class="form-group col-md-6">
          <label for="username">Username</label>
          <input v-model="username.valor" type="text" :class="'form-control'+((username.error === false)?'':(username.error===''?(' is-valid'):(' is-invalid')))" id="username" placeholder="username">
          <div class="invalid-feedback">
            {{username.error}}
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputAddress">Name</label>
          <input v-model="name.valor" type="text" :class="'form-control'+((name.error === false)?'':(name.error===''?(' is-valid'):(' is-invalid')))" id="inputAddress" placeholder="1234 Central">
          <div class="invalid-feedback">
            {{name.error}}
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="contrasenha">Contrasena</label>
          <input v-model="password.valor" type="password" :class="'form-control'+((password.error === false)?'':(password.error===''?(' is-valid'):(' is-invalid')))" id="contrasenha" placeholder="Contrasenha">
          <div class="invalid-feedback">
            {{password.error}}
          </div>
        </div>
        <div class="form-group col-md-6">
          <label for="confirmarContrasenha">Confirmar Contrasenha</label>
          <input v-model="passwordConfirm.valor" type="password" :class="'form-control'+((passwordConfirm.error === false)?'':(passwordConfirm.error===''?(' is-valid'):(' is-invalid')))" id="confirmarContrasenha" placeholder="Contrasenha">
          <div class="invalid-feedback">
            {{passwordConfirm.error}}
          </div>
        </div>
      </div>
      <button class="btn btn-primary" type="submit" :disabled="cargando">
        <span v-if="cargando" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        {{!cargando?'Guardar':'Guardando'}}
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
        const params = {
          email: this.email.valor,
          name: this.name.valor,
          last_name: this.apellido.valor,
          first_name: this.nombre.valor,
          username: this.username.valor,
        };
        if(this.password.valor.length>0 && this.password.valor!=this.passwordConfirm.valor){
          $.notify({
            title:'Tus contrasenhas no coinciden'
          })
          return;
        }else if(this.password.valor.length>0){
          params.password = this.password.valor;
        }
        this.cargando = true;
        axios.put('/user/'+this.$route.params.id,params)
                // eslint-disable-next-line no-unused-vars
        .then((response)=>{
          $.notify({
            title:'Guardado'
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
