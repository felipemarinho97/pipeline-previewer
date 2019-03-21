import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

const moment = require("moment");
require("moment/locale/pt");

Vue.use(ElementUI);
Vue.use(require("vue-moment"), {
  moment
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
