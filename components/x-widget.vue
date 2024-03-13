<template>
  <div class="x-widget-wrapper" v-show="showWidget">
  <transition name="fade-slow">
    <div class="x-widget" v-show="showWidget" :class="{'x-widget-error': error}">
      <img class="x-widget-close" @click="showWidget = false;$event_emit('remove_widget', {address})"
           src="@/assets/svg/close.svg" alt="close icon">
      <template v-if="loading">
        <x-loader/>
      </template>
      <template v-if="data && !loading">
        <transition name="fade-slow">

        <div class="x-widget-front" v-show="showFrontside">
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
                  Feels like: {{ data.current.feelslike_c }} °С
                </div>
              </div>
              <div class="x-widget-more" @click="showFrontside = false; showBackside = true">
                Check 3 day forecast
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
        </transition>
        <transition name="fade-slow">
          <div class="x-widget-back" v-show="showBackside">
            <h3 class="x-widget-city">
              {{ data.location.name }}/{{ data.location.region }}
            </h3>
            <div class="forecast">
                <div class="forecast-day" v-for="{day, date_epoch} in data.forecast.forecastday">
                  <div class="forecast-day-name">
                    <x-animation-icon :weather_code="day.condition.code" :is_day="true"/>
                    {{convertDay(date_epoch)}}
                  </div>
                  <div class="forecast-day-avg">
                   <div class="forecast-day-avg-day">
                     Day {{day.maxtemp_c}} °С
                   </div>
                   <div>
                     Night {{day.mintemp_c}} °С
                   </div>
                  </div>
                </div>
            </div>
            <div class="x-widget-more" @click="showBackside = false; showFrontside = true">
              Return
            </div>
          </div>
        </transition>
      </template>
      <template v-if="error && !loading">
        <div class="x-widget-error">
          <div class="x-alert-error x-alert-icon">
            <img src="@/assets/svg/error.svg" alt="error icon"/>
          </div>
          <div class="x-widget-error-text">
            Failed to fetch, try again later
          </div>
        </div>
      </template>
    </div>
  </transition>
  </div>
</template>
<script setup>
import {CONSTANTS} from "@/CONSTANTS.js";
import {getAddress, getDays} from "@/utils/helpers.js";

const {$event_emit} = useNuxtApp()
const {address} = defineProps(['address'])
let showWidget = ref(false)
let showBackside = ref(false)
let showFrontside = ref(true)
let loading = ref(true)
let error = ref(false)

const {data, pending} = await useLazyFetch(CONSTANTS.WEB_API_URL + getDays(3) + getAddress(address), {
  onResponseError({response}) {
    if (response.status === 400) {
      setTimeout(() => {
        $event_emit('alert', {status: 'error', text: 'Cannot find provided place'})
      }, 1000)
      $event_emit('remove_widget', {address})
    } else {
      error.value = true
    }
  },
  onRequestError({request, options, error}) {
    $event_emit('alert', {status: 'error', text: 'Something went wrong'})
    error.value = true
  },
})

watch(pending, (value) => {
  if (!value) {
    setTimeout(() => {
      loading.value = false
    }, 1000)
  }
})

const convertDay = (seconds) => {
  const day = new Date(0)
  day.setUTCSeconds(seconds)
  return day.toLocaleDateString('en', { weekday: 'long' })
}

onMounted(async () => {
  setTimeout(() => {
    showWidget.value = true
  }, 300)
})
</script>

<style lang="scss" scoped>
.x-widget {
  width: 435px;
  height: 255px;
  padding: 25px 30px 25px 25px;
  border: var(--default-border);
  box-shadow: var(--default-shadow);
  border-radius: var(--border-radius-default);
  position: relative;
  background: var(--white);
}

.x-widget-error {
  display: flex;
  justify-content: center;
  align-items: center;
}

.x-widget-content {
  display: flex;
  gap: 30px;
  justify-content: space-between;
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
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.x-widget-more {
  color: #4481e7;
  margin-top: 14px;
  font-size: 14px;
  cursor: pointer;
}

.x-widget-error {
  display: flex;
}

.x-widget-error-text {
  margin-left: 7px;
}
.forecast {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}
.forecast-day {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 40px;
  }
}
.x-widget-back {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.x-widget-wrapper {
  width: 435px;
  height: 255px;
  position: relative;
  overflow: hidden;
}
.forecast-day-avg {
  font-size: 14px;
  display: flex;
}
.forecast-day-name {
  display: flex;
  align-items: center;
}
.forecast-day-avg-day {
  margin-right: 10px;
}
</style>