<template>
  <v-app id="inspire">
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title text-xs-center>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form
                  ref="form"
                  v-model="valid"
                >
                  <v-text-field
                    label="E-mail"
                    name="email"
                    v-model="input.email"
                    prepend-icon="mdi-account"
                    :rules="[rules.emailOuSenhaNecessaria, rules.validaEmail]"
                    type="text"
                  ></v-text-field>

                  <v-spacer></v-spacer>

                  <v-text-field
                    id="senha"
                    label="Senha"
                    v-model="input.senha"
                    :rules="[rules.emailOuSenhaNecessaria]"
                    name="senha"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-flex text-xs-center align-center>
                  <v-btn
                    class="btn-form"
                    @click="login()"
                    color="primary"
                    :disabled="!valid"
                  >Acessar</v-btn>
                </v-flex>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import { userMockado } from "../../static/db.json";
  export default {
    name: 'Login',
    props: {
      source: String,
    },
    data(){
      return {
        userMockado,
        valid: false,
        input: {
          email: '',
          senha: ''
        },
        rules: {
          emailOuSenhaNecessaria: value => !!value || 'Campo obrigatório.',
          validaEmail: v => /.+@.+\..+/.test(v) || 'Insira um e-mail válido',
        },
      }
    },

    methods: {
      login(){
        let parseObj = JSON.parse(JSON.stringify(this.userMockado));
        
        if (this.input.email != '' && this.input.senha != '') {
          if(this.input.email == parseObj.email && this.input.senha == parseObj.senha) {
              this.$emit("autenticado", true);
              this.$router.replace({ name: "About" });
              this.valid = true;
          } else {
              alert("O e-mail e/ou senha está incorreto");
          }
        } else {
            alert("O e-mail e senha devem ser preenchidos");
        }
      }
    }

  }
</script>
<style>
  .btn-form{
    display: flex;
    margin-bottom: 32px !important;
  }
</style>