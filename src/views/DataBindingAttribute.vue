<template>
  <div>
    <img v-bind:src="imgSrc" v-bind:width="widthVal" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgSrc: "http://vuejs.org/images/logo.png",
      widthVal: "100px",
    };
  },
};
</script>
