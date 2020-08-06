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
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
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

        <div v-if="uploadedFiles.length">
          <div v-for="file in uploadedFiles" :key="file.name">
            <a :href="file.link" download="file.pdf">{{file.name}}</a>
          </div>
        </div>
        
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

      // getDataURL(){
      //     var fileReader = new FileReader();
      //     var base64;
      //     console.log(this.base64);
      //     fileReader.onload = (fileLoadedEvent) => {
      //         base64 = fileLoadedEvent.target.result;
      //         this.pdfFile.dataURL= base64;
      //     };
      //     fileReader.readAsDataURL(this.pdfFile);

      //     // Checks every second for the dataURL.
      //     var checkIfReady = setInterval(()=>{

      //       // If there is it logs it.
      //       if(fileReader.result){
      //         console.log(fileReader.result)
      //         // USE the DATAURL
      //         clearInterval(checkIfReady);
      //       }

      //       // Stops checking after 10 seconds.
      //       setTimeout(()=>{
      //         clearInterval(checkIfReady);
      //       }, 10000)
      //     },1000);
      //   }
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

  .dropzone-custom-title {
    margin-top: 0;
    color: #00b782;
  }

  .subtitle {
    color: #314b5f;
  }
</style>