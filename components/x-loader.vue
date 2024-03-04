<template>
  <div class="x-loader">
    <div class="x-loader-stick"></div>
    <div class="x-loader-stick"></div>
    <div class="x-loader-stick"></div>
    <div class="x-loader-stick"></div>
  </div>
</template>

<script setup lang="ts">

</script>
<style scoped lang="scss">
.x-loader {
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 100%;
}

.x-loader-stick {
  margin-top: 10px;
  height: 20px;
  background: linear-gradient(271deg, #ffffff, #e8e8e8);
  background-size: 400% 400%;
  animation: AnimationName 2s ease infinite;
  &:nth-child(1) {
    width: 100%;
  }

  &:nth-child(2) {
    width: 65%;
  }

  &:nth-child(3) {
    width: 50%;
  }
  &:nth-child(4) {
    width: 35%;
  }
}
@keyframes AnimationName {
  0%{background-position:0% 50%}
  50%{background-position:100% 51%}
  100%{background-position:0% 50%}
}
</style>