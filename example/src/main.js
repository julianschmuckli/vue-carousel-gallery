import Vue from 'vue';
import App from './App.vue';
import VueCarouselGallery from "vue-carousel-gallery";

// Register the plugin
Vue.use(VueCarouselGallery, {
  autoStart: false,
  animationDuration: 5000,
  debugInfo: true
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
