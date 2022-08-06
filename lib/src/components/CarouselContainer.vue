<template>
  <div class="carouselContainer" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <div class="carouselSlider" ref="carouselSlider">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Config from '../config';
import Logger from "../logger";

export default {
  data() {
    return {
      _startTime: undefined,
      _lastMouseOverAction: "mouseLeave",

      _totalSlides: 0,
      _carouselWidth: 0,

      _loopIntervalRestarted: false,
      _loopInterval: undefined,

      currentSlide: 0,
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
    _getTimeDistanceUntilPause(currentTime) {
      return this.durationPerSlide - ((currentTime - this._startTime) % this.durationPerSlide);
    },
    _looping() {
      var oSlider = this.$refs["carouselSlider"];
      this.currentSlide += 1;
      Logger.log("Showing slide: " + (this.currentSlide - 1));

      if (this.currentSlide > this._totalSlides) {
        this._disableAnimation();
        this.currentSlide = 0;

        oSlider.style.transform =
        "translateX(" + -this._carouselWidth * this.currentSlide + "px)";
        
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

      this._startTime = (new Date()).getTime();

      this._enableAnimation();
      this._looping();
      this._loopInterval = setInterval(this._looping, this.durationPerSlide);
    },
    pause() {
      if (this._loopInterval) {
        clearInterval(this._loopInterval);

        var timeTillNextSlide = this._getTimeDistanceUntilPause((new Date()).getTime());
        
        setTimeout(() => {
          this._loopInterval = undefined;

          console.log("Cleared", this._lastMouseOverAction)

          // If the mouse is not inside of the container, just start the carousel again.
          if (this._lastMouseOverAction !== "mouseEnter") {
            this.start();
          }
        }, timeTillNextSlide);
      }
    },

    onMouseEnter() {
      this._lastMouseOverAction = "mouseEnter";
      Logger.log("Mouse enter event");
      this.pause();
    },
    onMouseLeave() {
      this._lastMouseOverAction = "mouseLeave";
      Logger.log("Mouse leave event");
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