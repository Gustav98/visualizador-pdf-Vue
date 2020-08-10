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
            <v-list-item-title>
              <router-link to="/dashboard">Home</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      clipped-left
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Visualizador de pdf</v-toolbar-title>
    </v-app-bar>

    <v-main class="conteudo-principal">
      <v-container
        class="fill-height"
        fluid
        id="app"
      >
        <v-row
          align="center"
          justify="center"
        >

          <div class="contador heading-6 font-weight-bold">
            {{currentPage}} / {{pageCount}}
          </div>

          <div>
            <v-card
              class="overflow-hidden mx-auto"
              height="auto"
            >
              <v-bottom-navigation
                scroll-target="#scroll-area-1"
                hide-on-scroll
                absolute
                horizontal
              >
                <input 
                  v-model.number="page"
                  type="number"
                  style="width: 2em" 
                  class="heading-6 font-weight-bold"
                > 
                <span class="num-paginas"> /{{numPages}}</span>
                <button class="pl-4" @click="print">
                  <v-icon>mdi-printer</v-icon>
                </button>
              </v-bottom-navigation>

              <v-sheet
                id="scroll-area-1"
                class="overflow-y-auto"
                max-height="400"
              >
                <div class="container-pdf">
                  <div v-if="loadedRatio > 0 && loadedRatio < 1" :style="{ width: loadedRatio * 100 + '%' }">{{ Math.floor(loadedRatio * 100) }}%</div>
                    <pdf
                      v-for="i in numPages"
                      :key="i"
                      :src="src"
                      :page="i"
                      ref="pdf"
                      @num-pages="pageCount = $event"
                      @page-loaded="currentPage = $event"
                      @error="error" 
                      @link-clicked="page = $event"
                      class="documento"
                    ></pdf>
                </div>
              </v-sheet>
            </v-card>
          </div>

        </v-row>
  
      </v-container>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>

</template>
<script>
    import pdf from 'vue-pdf';
    import { PDFJS } from 'pdfjs-dist';

    var loadingTask = pdf.createLoadingTask('https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/calrgb.pdf');

    export default {
        components: {
            pdf
        },

        data() {
            return {
              drawer: null,
              currentPage: 0,
              pageCount: 0,
              page: 1,
              src: loadingTask,
              numPages: undefined,
              loadedRatio: 0
            }
        },
        
        mounted() {
            this.src.promise.then(pdf => {
              window.PDFJS = window['pdfjs-dist/build/pdf'];
              this.numPages = pdf.numPages;
          });
        },

        methods:{
          print() {
             this.$refs.pdf[0].print();
          },
          error: function(err) {
              console.log(err);
            }
        }
      
    }

</script>

<style lang="css" scoped>
  #buttons {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  .contador {
    padding: 16px;
  }

  .documento{
    display: flex !important;
    margin: 0 auto;
    width: 100%;
  }

  .container-pdf{
    width: 95%;
  }
  .conteudo-principal{
    padding: 16px 0px 32px !important;
  }
  .num-paginas{
    display: flex;
    align-items: center;
  }
  input:focus, textarea:focus, select:focus{
    outline: none;
  }

  button:focus, button:focus, button:focus{
    outline: none;
  }
</style>