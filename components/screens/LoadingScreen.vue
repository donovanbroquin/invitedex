<template>
  <div class="flex flex-col items-center justify-center h-full">
    <h1 class="text-xl font-bold">Invitédex</h1>
    <h4 class="text-xs">Région Avallon</h4>
    <p class="mt-12">{{ text }}</p>
  </div>
</template>

<script setup>
import {useStore} from "../../stores";
import MenuScreen from "./MenuScreen";
import WelcomeScreen from "./WelcomeScreen";

const store = useStore()

const text = ref('Chargement')
const canEmitNext = ref(false)
const emit = defineEmits(['next'])

const interval = setInterval(() => {
  if (text.value === "Chargement...")
    return (text.value = "Chargement");

  return (text.value = text.value + ".");
}, 800)

setTimeout(() => canEmitNext.value = true, 3200)

onMounted(async () => {
  try {
    await store.init()

    // Stop interval (avoid memory leak)
    clearInterval(interval)

    // Change screen
    if (canEmitNext) emit('next', store.isInitialized ? MenuScreen : WelcomeScreen)
  } catch (e) {
    console.log(e)
  }
})
</script>

