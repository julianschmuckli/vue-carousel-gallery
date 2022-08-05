<template>
  <div id="app">
    <CarouselContainer>
      <CarouselSlide src="./assets/first.jpg"></CarouselSlide>
      <CarouselSlide src="./assets/second.jpg"></CarouselSlide>
      <CarouselSlide src="./assets/third.jpg"></CarouselSlide>
      <CarouselSlide src="./assets/fourth.jpg"></CarouselSlide>
      <CarouselSlide src="./assets/fifth.jpg"></CarouselSlide>
    </CarouselContainer>
  </div>
</template>

<script>
import CarouselContainer from 'vue-carousel-gallery/src/CarouselContainer.vue';
import CarouselSlide from 'vue-carousel-gallery/src/CarouselSlide.vue';

export default {
  name: 'App',
  components: {
    CarouselContainer,
    CarouselSlide
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
