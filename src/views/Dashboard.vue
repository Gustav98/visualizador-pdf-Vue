<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-file-document</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <router-link to="/documento">Visualizar documento</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>

      <template v-slot:append>
        <v-menu 
          offset-y
          v-if="uploadedFiles.length"
        >
          <template v-slot:activator="{ on, attrs }">
            <div class="pa-2">
              <v-btn block
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
              >
                Ver uploads
              </v-btn>
            </div>
          </template>
          <v-list>
            <v-list-item
              v-for="file in uploadedFiles" 
              :key="file.name"
              @click="close = !close"
            >
              <v-list-item-title>
                <a class="upload-itens" :href="file.link" download="file.pdf">
                  <v-icon class="pr-1">mdi-file-download</v-icon> 
                  {{file.name}}
                </a>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-navigation-drawer>

    <v-app-bar
      clipped-left
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Visualizador de pdf</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col cols="6">
            <vue-dropzone 
              ref="myVueDropzone"
              id="dropzone"
              :options="dropzoneOptions"
              :useCustomSlot=true
              v-on:vdropzone-success="uploadSuccess"
              v-on:vdropzone-error="uploadError"
              v-on:vdropzone-removed-file="fileRemoved"
            >
              <div class="dropzone-custom-content">
                <h3 class="dropzone-custom-title">Arraste e solte seu arquivo aqui!</h3>
                <div class="subtitle">...ou clique para selecionar um arquivo do seu computador.</div>
              </div>
            </vue-dropzone>
          </v-col>
        </v-row>
  
      </v-container>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  import vue2Dropzone from 'vue2-dropzone';
  import 'vue2-dropzone/dist/vue2Dropzone.min.css';
  
  export default {
    props: {
      source: String,
    },
    components: {
      vueDropzone: vue2Dropzone
    },
    data: () => ({
      drawer: null,
      fileName: '',
      pdfFile:'',
      close: false,
      uploadedFiles: [],
      dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          maxFilesize: 0.5,
          headers: { "My-Awesome-Header": "header value" },
          addRemoveLinks: true
      }
    }),
    created () {
      this.$vuetify.theme.light = true
    },
    methods: {
      uploadSuccess(file, response) {
          this.fileName = file.name;
          console.log('Upload de arquivo concluído com sucesso. Nome do arquivo: ' + this.fileName);
          const newFile = {
            name: file.name,
            link: response.files.file
          }
          this.uploadedFiles = [
            newFile,
            ...this.uploadedFiles,
          ]
      },
      uploadError(file, message) {
          console.log('Houve algum erro');
      },
      fileRemoved() {},

      handleFileAdding(file){
        this.pdfFile = file;
      },

    }
  }
</script>
<style>
  .dropzone-custom-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  .dropzone .dz-preview {
    position: sticky;
  }
  .dropzone-custom-title {
    margin-top: 0;
    color: #00b782;
  }

  .subtitle {
    color: #314b5f;
  }

  .upload-itens{
    text-decoration: none;
    color: #003 !important;
  }
</style>