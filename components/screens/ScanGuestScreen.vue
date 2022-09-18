<template>
  <div>
    <video ref="reader" class="absolute top-0 left-0 right-0 h-60 w-full object-fill rounded"/>
  </div>
</template>

<script setup>
import QrScanner from 'qr-scanner'
import MenuScreen from "./MenuScreen";
import GuestScreen from "./GuestScreen";
import {useStore} from "../../stores";

const {$mitt} = useNuxtApp()
const store = useStore()
const emit = defineEmits(['next'])

const reader = ref()
const scanner = ref()

onMounted(() => {
  scanner.value = new QrScanner(reader.value, success => {
    // Set it on storages
    store.onCatchGuest(success)

    // Redirect to guest screen
    emit('next', GuestScreen)
  })
  scanner.value.start()
})

$mitt.on('B_PRESS', () => {
  emit('next', MenuScreen)
})

onBeforeUnmount(() => {
  stopScanner()
})


function stopScanner() {
  scanner.value.destroy()
  scanner.value = null
}
</script>
