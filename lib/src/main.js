import Config from "./config";

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
        }
      }
    });
  }
};