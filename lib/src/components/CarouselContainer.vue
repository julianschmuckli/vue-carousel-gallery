<template>
  <div class="carouselContainer" @mouseover="onMouseOver" @mouseout="onMouseOut">
    <div class="carouselSlider" ref="carouselSlider">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Config from '../config';

export default {
  data() {
    return {
      _totalSlides: 0,
      _carouselWidth: 0,

      _loopIntervalRestarted: false,
      _loopInterval: undefined,

      currentSlide: 1,
      durationPerSlide: Config.animationDuration,
    };
  },
  mounted() {
    // Save the relevant information
    this._carouselWidth = this.$refs["carouselSlider"].clientWidth;

    var aSlides = this.$slots.default;
    this._totalSlides = aSlides.length;

    // Adds the clone for the slide loop animation
    aSlides.unshift(aSlides[aSlides.length - 1]);
    this.$slots.default = aSlides;
    this.$forceUpdate();

    // Set the correct position at the beginning
    this.$refs["carouselSlider"].style.transform =
      "translateX(" + -this._carouselWidth * this.currentSlide + "px)";

    if (Config.autoStart) {
      this.start();
    }
  },
  methods: {
    _disableAnimation() {
      this.$refs["carouselSlider"].style.transition = "none";
    },
    _enableAnimation() {
      this.$refs["carouselSlider"].style.transition =
        this.durationPerSlide + "ms linear";
    },
    _looping() {
      var oSlider = this.$refs["carouselSlider"];
      this.currentSlide += 1;
      console.log(this.currentSlide);

      if (this.currentSlide > this._totalSlides) {
        this._disableAnimation();
        this.currentSlide = 0;

        oSlider.style.transform =
        "translateX(" + -this._carouselWidth * this.currentSlide + "px)";

        console.log("Switched to 0");
        
        setTimeout(() => {
          this._enableAnimation();
        }, this.durationPerSlide);
      }

      oSlider.style.transform =
        "translateX(" + -this._carouselWidth * this.currentSlide + "px)";
    },

    start() {
      if (this._loopInterval) {
        // Already running
        return;
      }

      this._enableAnimation();
      this._looping();
      this._loopInterval = setInterval(this._looping, this.durationPerSlide);
    },
    pause() {
      if (this._loopInterval) {
        clearInterval(this._loopInterval);
        this._loopInterval = undefined;
      }
    },

    onMouseOver() {
      this.pause();
    },
    onMouseOut() {
      this.start();
    }
  },
};
</script>

<style>
.carouselContainer {
  width: 60%;
  margin: 0;
  overflow: hidden;
}
.carouselSlider {
  display: flex;
  width: 100%;
  height: 400px;
}
</style>