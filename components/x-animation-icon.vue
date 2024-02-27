<template>
  <img :src="path" alt="weather icon" @error="reset">
</template>
<script setup>

import {CONSTANTS} from "@/CONSTANTS.js";
const {weather_code, is_day} = defineProps(['weather_code', 'is_day'])


let path = ref({});
defineIcon()
function reset(){
  path.value = new URL(`/assets/svg/1006-${is_day ? 'd':'n'}.svg`, import.meta.url)
}
function defineIcon(){
  if(CONSTANTS.WEATHER_CODES.RAIN_CODES.includes(weather_code)){
    path.value = new URL(`/assets/svg/1063-${is_day ? 'd':'n'}.svg`, import.meta.url)
    return;
  }
  if(CONSTANTS.WEATHER_CODES.SNOW_CODES_LIGHT.includes(weather_code)){
    path.value = new URL(`/assets/svg/1066-${is_day ? 'd':'n'}.svg`, import.meta.url)
    return;
  }
  if(CONSTANTS.WEATHER_CODES.SNOW_CODES_HEAVY.includes(weather_code)){
    path.value = new URL(`/assets/svg/1219-${is_day ? 'd':'n'}.svg`, import.meta.url)
    return;
  }
  path.value = new URL(`/assets/svg/${weather_code}-${is_day ? 'd':'n'}.svg`, import.meta.url)

  if(!path.value){
    path.value = new URL(`/assets/svg/1009-${is_day ? 'd':'n'}.svg`, import.meta.url)
  }
}

</script>
<style scoped lang="scss">

</style>