<template>
  <div class="carouselSlide" :style="{backgroundImage: 'url(\'' + src + '\')'}">
  </div>
</template>

<script>
export default {
    props: {
        src: {
            type: String,
            required: true
        }
    },
    computed: {
    }
}
</script>

<style>
.carouselSlide {
    background: black;
    background-size: cover;
    width: 100%;
    min-width: 100%;
    height: 100%;
}
</style>