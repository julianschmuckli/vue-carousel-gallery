# Vue Carousel Gallery

## Setup
```bash
npm install vue-carousel-gallery
```

In your `main.js` file, add the following lines:
```js
import Vue from 'vue';

// Import the plugin
import VueCarouselGallery from "vue-carousel-gallery";

// Register the plugin
Vue.use(VueCarouselGallery, {
  // Custom configurations
  autoStart: false,
  animationDuration: 5000,
  debugInfo: true
});
```

## Usage
To use the plugin now, create a `CarouselContainer` and add some slides (`CarouselSlide`) inside.

```html
<CarouselContainer>
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
</CarouselContainer>
```
Now the carousel should appear with the given image paths and content when hovering over the carousel.