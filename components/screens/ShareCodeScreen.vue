<template>
  <div class="h-full flex flex-col justify-between">
    <h1 class="text-lg text-center">Code à partager</h1>
    <p class="text-xsss">Pour apparaitre dans leur Invitédex comme enregistré(e)</p>

    <div class="flex flex-col items-center justify-center">
      <canvas ref="qrcode"/>
    </div>
  </div>
</template>

<script setup>
import QRCode from 'qrcode'
import {useStore} from "../../stores";
import useResetMitt from "../../composables/useResetMitt";
import MenuScreen from './MenuScreen'

const store = useStore()
const {$mitt} = useNuxtApp()
useResetMitt()

const emit = defineEmits(['next'])
const qrcode = ref()

onMounted(() => {
  QRCode.toCanvas(qrcode.value, store.whoiam, {
    // color: {
    //   light: '#000000ff'
    // }
  }, function (error) {
    if (error) console.error('here', error)
  })
})

$mitt.on('B_PRESS', () => emit('next', MenuScreen))

</script>
