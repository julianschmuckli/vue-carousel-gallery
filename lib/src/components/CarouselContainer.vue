<template>
  <div
    class="carouselContainer"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div class="carouselSlider" ref="carouselSlider">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import 'animate.css';
import { bus } from '../main';

import Config from "../config";
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
      _currentTimeout: undefined,

      _animationEnabled: false,

      currentSlide: 0,
      durationPerSlide: Config.animationDuration,
    };
  },
  created() {
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        Logger.log("Tab is hidden -> pausing the carousel.");

        this._lastMouseOverAction = "mouseEnter"; // Simulate a pause
        this.pause();
      } else {
        Logger.log("Tab is active -> starting the carousel.");

        this._lastMouseOverAction = "mouseLeave"; // Simulate outside of the carousel
        this.start();
      }
    }.bind(this));
  },
  beforeCreate() {
    var aSlides = this.$slots.default;
    this._totalSlides = aSlides.length;

    var index = 0;
    for (var oSlide of aSlides) {
      oSlide.componentOptions.propsData.index = index;
      index++;
    }

    console.log(aSlides);

    // Adds the clone for the slide loop animation
    aSlides.unshift(aSlides[aSlides.length - 1]);
    this.$slots.default = aSlides;
    this.$forceUpdate();
  },
  mounted() {
    // Save the relevant information
    this._carouselWidth = this.$refs["carouselSlider"].clientWidth;

    // Set the correct position at the beginning
    this.$refs["carouselSlider"].style.transform =
      "translateX(" + -this._carouselWidth * this.currentSlide + "px)";

    if (Config.autoStart) {
      this.start();
    }
  },
  methods: {
    _disableAnimation() {
      if (!this._animationEnabled) {
        return false;
      } else {
        this._animationEnabled = false;
      }

      this.$refs["carouselSlider"].style.transition = "none";
    },
    _enableAnimation(durationPerSlide, animationType) {
      if (this._animationEnabled) {
        return false;
      } else {
        this._animationEnabled = true;
      }

      if (durationPerSlide === undefined) {
        durationPerSlide = this.durationPerSlide;
      }

      if (animationType === undefined) {
        animationType = Config.animationType;
      }

      Logger.log(
        "Enabled animation with " +
          durationPerSlide +
          " and type " +
          animationType
      );

      this.$refs["carouselSlider"].style.transition =
        durationPerSlide + "ms " + animationType;
    },
    _getTimeDistanceUntilPause(currentTime) {
      return (
        this.durationPerSlide -
        ((currentTime - this._startTime) % this.durationPerSlide)
      );
    },
    _looping() {
      var oSlider = this.$refs["carouselSlider"];
      this.currentSlide += 1;
      Logger.log("Showing slide: " + (this.currentSlide - 1));
      bus.$emit("onSlide", {
        currentSlide: this.currentSlide - 1
      });

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

      clearTimeout(this._currentTimeout);
      this._currentTimeout = undefined;

      Logger.log("Scheduled slideshow start");

      this._startTime = new Date().getTime();

      this._enableAnimation();
      this._looping();
      this._loopInterval = setInterval(this._looping, this.durationPerSlide);
    },
    pause() {
      if (this._loopInterval) {
        clearInterval(this._loopInterval);

        Logger.log("$emit: beforePause");
        this.$emit("beforePause");

        // Calculate the time until the next slide has appeared and clear then the _loopInterval instance.
        var timeTillNextSlide = this._getTimeDistanceUntilPause(
          new Date().getTime()
        );

        // Clear the timeout in case of already defined before.
        if (this._currentTimeout) {
          clearTimeout(this._currentTimeout);
          this._currentTimeout = undefined;
        }

        this._currentTimeout = setTimeout(() => {
          this._loopInterval = undefined;
          Logger.log("$emit: onPause");
          this.$emit("onPause");
          bus.$emit("onSlidePause", {
            currentSlide: this.currentSlide - 1
          });

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
    },
  },
};
</script>

<style>
.carouselContainer {
  width: 100%;
  height: 100vh;
  margin: 0;
  overflow: hidden;
}
.carouselSlider {
  display: flex;
  width: 100%;
  height: 100vh;
}
</style>