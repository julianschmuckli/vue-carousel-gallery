import Vue from 'vue';
import Config from "./config";

export const bus = new Vue();

import CarouselContainer from "./components/CarouselContainer";
import CarouselSlide from "./components/CarouselSlide";

export default {
  install(Vue, options) {
    Vue.mixin({
      created() {
        Vue.component("CarouselContainer", CarouselContainer);
        Vue.component("CarouselSlide", CarouselSlide);

        if (options) {
          // Applying custom configurations
          Config.autoStart = options.autoStart || Config.autoStart;
          Config.animationDuration = options.animationDuration || Config.animationDuration;
          Config.animationType = options.animationType || Config.animationType;

          Config.debugInfo = options.debugInfo || Config.debugInfo;
        }
      }
    });
  }
};