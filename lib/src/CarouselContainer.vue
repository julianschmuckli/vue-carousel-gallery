<template>
  <div class="carouselContainer">
    <div class="carouselSlider">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.carouselContainer {
  width: 60%;
  margin: auto;
}
.carouselSlider {
  display: flex;
}
</style>