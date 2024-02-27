<template>
  <transition name="fade-slow">
    <div class="x-widget" v-show="showWidget">
      <img class="x-widget-close" @click="showWidget = false;$event_emit('remove_widget', {address})" src="@/assets/svg/close.svg" alt="close icon">
      <template v-if="loading">
        <x-loader />
      </template>
      <template v-if="data && !loading">
        <div class="x-widget-front">
        <h3 class="x-widget-city">
          {{ data.location.name }}/{{ data.location.region }}
        </h3>
        <div class="x-widget-content">
          <div class="x-widget-left">
            <div class="x-widget-left-content">
              <div class="x-widget-degrees">
                {{ data.current.temp_c }} °С
              </div>
              <div class="x-widget-wind">
                {{ Math.round(data.current.wind_kph * 1000 / 3600) }} m/s
                <img src="@/assets/svg/wind.svg" alt="wind icon">
              </div>
              <div class="x-widget-feelslike">
                Feels like: {{data.current.feelslike_c}} °С
              </div>
            </div>
            <div class="x-widget-more">
              Check week forecast
            </div>
          </div>
          <div class="x-widget-right">
            <x-animation-icon :weather_code="data.current.condition.code" :is_day="data.current.is_day"/>
            <div class="x-widget-right-desc">
              {{ data.current.condition.text }}
            </div>
          </div>
        </div>
        </div>
      </template>
      <template v-if="error">
        <div class="x-widget-error">
          Failed to fetch
        </div>
      </template>
    </div>
  </transition>
</template>
<script setup>
import {CONSTANTS} from "@/CONSTANTS.js";
import {getAddress, getDays} from "@/utils/helpers.js";

const {$event_emit} = useNuxtApp()
const {address} = defineProps(['address'])
let showWidget = ref(false)
let loading = ref(true)
let error = ref(false)
const {data, pending} = await useLazyFetch(CONSTANTS.WEB_API_URL + getDays(1) + getAddress(address), {
  onResponseError({ response }) {
     if(response.status === 400){
       $event_emit('alert', {status: 'error', text: 'Cannot find provided place'})
       $event_emit('remove_widget', {address})

     } else {
       error.value = true
     }
  }
})

watch(pending, (value)=>{
  if(!value){
    setTimeout(()=>{
      loading.value = false
    }, 800)
  }
})

onMounted(async () => {
  setTimeout(()=>{
    showWidget.value = true
  }, 300)
})
</script>

<style lang="scss" scoped>
.x-widget {
  width: 435px;
  min-height: 255px;
  padding: 25px;
  border: var(--default-border);
  box-shadow: var(--default-shadow);
  border-radius: var(--border-radius-default);
  position: relative;
  background: var(--white);
}
.x-widget-content {
  display: flex;
  gap: 30px;
}
.x-widget-left {
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.x-widget-left-content {
  display: flex;
  flex-direction: column;
}
.x-widget-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 150px;
  img {

  }
}
.x-widget-right-desc {
  text-align: center;
  word-break: break-all;
}
.x-widget-degrees {
  font-size: var(--font-size-34);
  margin-top: 20px;
}

.x-widget-wind {
  display: flex;
  align-items: center;
  font-size: var(--font-size-18);
  img {
    width: 60px;
  }
}
.x-widget-close {
  width: 14px;
  position: absolute;
  right: 15px;
  top: 20px;
  cursor: pointer;
}
.x-widget-city {
  font-size: var(--font-size-24);
}
.x-widget-more {
  color: #4481e7;
  margin-top: 14px;
  font-size: 14px;
  cursor: pointer;
}

</style>