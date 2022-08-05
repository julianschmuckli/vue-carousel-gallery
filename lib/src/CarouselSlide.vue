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
    flex-grow: 1;
    background: black;
    background-size: cover;
    width: 300px;
    height: 200px;
}
</style>