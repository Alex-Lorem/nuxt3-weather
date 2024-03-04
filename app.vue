<template>
  <div class="wrapper">
    <div class="search">
      <img src="@/assets/svg/searching.svg" alt="search icon">
      <input type="text" @keyup.enter="addWidget" v-model="search" placeholder="Search...">
      <transition name="fade-fast">
        <button @click="addWidget" class="search-button" v-if="search.length">add</button>
      </transition>
    </div>
    <div class="container">
      <template v-for="address in weather.addresses" :key="address">
        <x-widget :address="address"/>
      </template>
    </div>
    <x-alert/>
  </div>
</template>
<script setup>
const {$event_listen, $event_off} = useNuxtApp()

//console.log(navigator.language || navigator.userLanguage)
let weather = ref({})
let search = ref('')

watch(weather, (value) => {
      localStorage.setItem('weather', JSON.stringify(value))
    },
    {
      deep: true
    }
)

onMounted(() => {
  weather.value = JSON.parse(localStorage.getItem('weather'))
  if (!weather.value?.addresses?.length) {
    weather.value = {}
    weather.value.addresses = ['Los Angeles']
  }

  $event_listen("remove_widget", ({address}) => {
    setTimeout(() => {
      const index = weather.value.addresses.indexOf(address)
      weather.value.addresses.splice(index, 1)
    }, 1000)
  });
})

onUnmounted(() => {
  $event_off("remove_widget")
})


//functions

function addWidget() {
  weather.value.addresses.push(search.value)
  search.value = ''
}

</script>
<style src="./globals.scss" lang="scss"/>
