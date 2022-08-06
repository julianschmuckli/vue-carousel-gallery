<template>
  <div
    class="carouselSlide"
    :style="{ backgroundImage: 'url(\'' + src + '\')' }"
  >
    <div class="carouselSlideTextBox">
      <h4>{{ title }}</h4>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: "",
    },
    description: {
      type: String,
      required: false,
      default: "",
    },
  },
  computed: {},
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
  text-align: left;
  padding: 10px;
}
.carouselSlideTextBox h4, .carouselSlideTextBox p {
    font-size: 14pt;
}
</style>