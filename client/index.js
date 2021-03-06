import "./main.styl";
import "babel-polyfill";

import Vue from "vue";
import Vuetify from 'vuetify'

Vue.use(Vuetify)

import HomeComponent from './components/home.vue';

var app = new Vue({
  el: '#app',
  data: { /* ... */ },
  components: {
    'home': HomeComponent
  },
  template: '<home/>'
})

// const submitButton = document.querySelector("#submit-button");
// const path = () => document.querySelector("#path").value;
// const makeAbsolute = () => document.querySelector("#make-absolute").checked;
// const convertToCurves = () =>
//   document.querySelector("#convert-to-curves").checked;
// const renderPath = path =>
//   document.querySelector("#rendered-path").setAttribute("d", path);

// const loader = {
//   start: () => {
//     document.querySelector("#loading-indicator").style.visibility = "visible";
//   },
//   stop: () => {
//     document.querySelector("#loading-indicator").style.visibility = "hidden";
//   }
// };

// loader.stop();

