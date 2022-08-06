<template>
  <div id="app">
    <CarouselContainer ref="firstCarousel">
      <CarouselSlide src="./assets/first.jpg"></CarouselSlide>
      <CarouselSlide src="./assets/second.jpg"></CarouselSlide>
      <CarouselSlide src="./assets/third.jpg"></CarouselSlide>
      <CarouselSlide src="./assets/fourth.jpg"></CarouselSlide>
      <CarouselSlide src="./assets/fifth.jpg"></CarouselSlide>
    </CarouselContainer>
    <br>
    <button @click="start">Start</button>
    <button @click="pause">Pause</button>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    start() {
      this.$refs["firstCarousel"].start();
    },
    pause() {
      this.$refs["firstCarousel"].pause();
    }
  }
};
</script>

<style>
* {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
