import Vue from 'vue';
import App from './App.vue';
import '@/assets/style/tailwind.css';
import router from './router';
import Vuelidate from 'vuelidate';

Vue.config.productionTip = false;

Vue.use(Vuelidate);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
