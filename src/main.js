import Vue from 'vue'
import App from './App.vue'

import { Vuetable } from "vuetable-2"

window.axios = require("axios")

Vue.config.productionTip = false

Vue.component("vuetable", Vuetable)

window.config = {
  "apiurl": "https://pokeapi.co/api/v2/"
}

new Vue({
  render: h => h(App),
}).$mount('#app')
