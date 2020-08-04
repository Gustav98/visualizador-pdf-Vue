<template>
  <v-app>
    <div id="app">
      <div id="nav">
        <router-link v-if="autenticado" to="/" v-on:click.native="logout()" replace>Logout</router-link>
      </div>
      <router-view @autenticado="setAutenticado" />
  </div>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
      autenticado: false,
    }
  },

  mounted() {
      if(!this.autenticado) {
          this.$router.replace({ name: "login" });
      }
    },
    methods: {
      setAutenticado(status) {
          this.autenticado = status;
      },
      logout() {
          this.autenticado = false;
      }
    }
};
</script>
