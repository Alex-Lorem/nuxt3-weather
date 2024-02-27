<template>
  <transition name="alert">
    <div class="x-alert-wrapper" v-if="opened">
      <div class="x-alert">
        <div class="x-alert-success x-alert-icon" v-if="status === 'success'">
          <img src="@/assets/svg/success.svg" alt="success icon"/>
        </div>
        <div class="x-alert-error x-alert-icon" v-if="status === 'error'">
          <img src="@/assets/svg/error.svg" alt="error icon"/>
        </div>
        <div class="x-alert-text"> {{ text }}
        </div>
        <img src="@/assets/svg/close.svg" class="x-alert-close" @click="opened = false"  alt="close icon"/>
      </div>
    </div>
  </transition>
</template>
<script setup>
const {$event_listen, $event_off} = useNuxtApp()


let status = ref('')
let text = ref('')
let opened = ref(false)

watch(opened, (value)=>{
  setTimeout(() => {
    if (!!value) {
      opened.value = false
    }
  }, 5000)
})

onMounted(()=>{
  $event_listen("alert", ({status: alertStatus, text: alertText}) => {
    status.value = alertStatus
    text.value = alertText
    opened.value = true
  });
})
onUnmounted(()=>{
  $event_off("alert")
})


</script>
<style lang="scss">
.x-alert-wrapper {
  width: 100%;
  position: fixed;
  bottom: 0;
  transform: translate(0, -40px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: var(--crytical-z-index);
}

.x-alert {
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 18px;
  margin: auto;
  border-radius: 60px;
  background: var(--white);
  box-shadow: 4px 4px 14px 0 rgba(161, 161, 161, 0.15);
}

.x-alert-close {
  cursor: pointer;
  width: 10px;
}

.x-alert-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 50%;
    height: 50%;
    color: var(--white);
  }
}

.x-alert-success {
  background: var(--green-light);
}

.x-alert-error {
  background: var(--red);

  img {
    transform: rotate(45deg);
  }
}

.x-alert-text {
  margin-right: 16px;
  margin-left: 8px;
  font-family: var(--font-medium);
}

.alert-enter-active,
.alert-leave-active {
  @include transitionDefault;
}

.alert-enter-from, .alert-leave-to {
  transform: translate(0, 30px);
  opacity: 0;
}
</style>