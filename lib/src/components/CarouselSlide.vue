<template>
  <div
    class="carouselSlide"
    :style="{ backgroundImage: 'url(\'' + src + '\')' }"
  >
    <div
      class="carouselSlideTextBox animate__animated" style="opacity:0;"
      :class="{ dark: dark, ['animate__' + this.animationIn]: animationInActive, ['animate__' + this.animationOut]: animationOutActive}"
      v-if="hasDefaultSlot"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { bus } from "../main";

export default {
  props: {
    index: {
      type: Number,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
    dark: {
      type: Boolean,
      required: false,
      default: false,
    },
    animationIn: {
      type: String,
      default: "fadeIn",
      required: false,
    },
    animationOut: {
      type: String,
      default: "fadeOut",
      required: false,
    },
  },
  data() {
    return {
      animationInActive: false,
      animationOutActive: false
    };
  },
  mounted() {
    bus.$on("onSlide", (oData) => {
      this.hideTextBox();
    });
    bus.$on("onSlidePause", (oData) => {
      if (oData.currentSlide === this.index) {
        this.showTextBox();
      }
    });
  },
  computed: {
    hasDefaultSlot() {
      return this.$slots.default;
    },
  },
  methods: {
    showTextBox() {
      this.animationInActive = true;
      this.animationOutActive = false;
    },
    hideTextBox() {
      this.animationInActive = false;
      this.animationOutActive = true;
    },
  },
};
</script>

<style>
.carouselSlide {
  background: black;
  background-size: cover;
  width: 100%;
  min-width: 100%;
  height: 100%;
}
.carouselSlideTextBox {
  position: relative;
  top: 20%;
  right: 10%;
  width: 40%;
  margin-left: auto;
  margin-right: 0;
  background: rgba(255, 255, 255, 0.59);
  color: black;
  text-align: left;
  border-radius: 25px;
  padding: 10px;
}
.dark {
  background: rgba(0, 0, 0, 0.59);
  color: white;
}
.carouselSlideTextBox h4,
.carouselSlideTextBox p {
  font-size: 14pt;
}
</style>