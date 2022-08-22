<template>
  <div id="app">
    <CarouselContainer ref="firstCarousel" @beforePause="beforePause" @onPause="onPause">
      <CarouselSlide src="./assets/first.jpg" :dark="true">
        <h4>Hello World</h4>
        <p>This is the first slide.</p>
      </CarouselSlide>
      <CarouselSlide src="./assets/second.jpg">
        <h4>Hello World</h4>
        <p>This is the second slide.</p>
      </CarouselSlide>
      <CarouselSlide src="./assets/third.jpg">
        <h4>Hello World</h4>
        <p>This is the third slide.</p>
      </CarouselSlide>
      <CarouselSlide src="./assets/fourth.jpg">
        <h4>Hello World</h4>
        <p>This is the fourth slide.</p>
      </CarouselSlide>
      <CarouselSlide src="./assets/fifth.jpg">
        <h4>Hello World</h4>
        <p>This is the last slide.</p>
      </CarouselSlide>
    </CarouselContainer>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    beforePause() {
      console.log("Slideshow is going to pause.");
    },
    onPause() {
      console.log("Slideshow paused.");
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
