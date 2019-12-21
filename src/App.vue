<template>
  <div class="main">
    <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
        <a class="navbar-brand" href="#">Pokeapi</a>
        <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
            aria-expanded="false" aria-label="Toggle navigation"></button>
        <div class="collapse navbar-collapse" id="collapsibleNavId">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="text" placeholder="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
    </nav>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2>Selecciona un tipo de pokemon</h2>
        </div>
        <div class="col-12">
          <select name="pokemon" v-model="seleccionado" @change="getPokemons" >
            <option 
            v-for="(tipo, index) in tipos" 
            :value="tipo.url" 
            :key="index"
            >{{ tipo.name }}</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <vuetable
            :api-mode="false"
            :data="pokemonsTable"
            :fields="['sprites.front_default','name']"
          >
          </vuetable>
        </div>
      </div>

      <div class="row">
        <!-- table class="table">
          <thead>
            <tr>
              <th>Img</th>
              <th>nombre</th>
              <th>tipo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pokemon, index) in pokemonsTable" :key="index" >
              <td scope="row">
                <img :src="pokemon.sprites.front_default" class="img-fluid" alt="">
              </td>
              <td>{{ pokemon.name }}</td>
              <td>{{ pokemon.types[0].type.name }}</td>
            </tr>
          </tbody>
        </!-->
      </div>
    </div>
  </div>

</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  mounted(){
    var vm  = this;
    window.axios.get( window.config.apiurl + "type" ).then(response => {
      this.tipos = response.data.results
    })
  },
  data(){
    return {
      seleccionado:"",
      tipos:[],
      pokemons:[],
      pokemonsTable:[],
    }
  },
  methods:{
    getPokemons(){
      this.pokemons = []
      this.pokemonsTable = []
      window.axios.get(this.seleccionado).then(response=>{
        this.pokemons = response.data.pokemon

        for (const key in this.pokemons) {
          window.axios.get(this.pokemons[key].pokemon.url).then(response=>{
            response.data
            this.pokemonsTable.push(response.data)
          })
        }
      })
    },

  }
}
</script>


