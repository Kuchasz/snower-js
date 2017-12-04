import Vue from "vue";

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

// submitButton.addEventListener("click", () => {
//   loader.start();
//   fetch("/normalize", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       makeAbsolute: makeAbsolute(),
//       convertToCurves: convertToCurves(),
//       path: path()
//     })
//   })
//     .then(res => res.json())
//     .then(x => {
//       renderPath(x.path);
//       loader.stop();
//     });
// });
