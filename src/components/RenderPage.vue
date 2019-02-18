<template>
  <h1>RENDER FOR CIV VERSION: {{ civVersion }}</h1>
</template>

<script>
export default {
  name: "RenderPage",
  props: {
    civVersion: {
      type: Number,
      required: true
    }
  }
};
</script>
