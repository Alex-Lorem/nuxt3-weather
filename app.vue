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
      <template v-for="address in addresses" :key="address">
        <x-widget :address="address" />
      </template>
    </div>
    <x-alert />
  </div>
</template>
<script setup>
const {$event_listen, $event_off} = useNuxtApp()

//console.log(navigator.language || navigator.userLanguage)
let addresses = ref([])
let search = ref('')
onMounted( () => {
  const weather = localStorage.getItem('weather')
  if(weather){
    addresses.value = weather.addresses
  } else {
    addresses.value = ['Los Angeles']
  }

  $event_listen("remove_widget", ({address}) => {
    setTimeout(()=>{
      console.log('hete')
      const index = addresses.value.indexOf(address)
      addresses.value.splice(index, 1)
    }, 800)
  });
})

//functions

function addWidget(){
  addresses.value.push(search.value)
  search.value = ''
}
onUnmounted(()=>{
  $event_off("remove_widget")
})
</script>
<style src="./globals.scss" lang="scss"/>
