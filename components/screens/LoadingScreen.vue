<template>
  <div class="flex flex-col items-center justify-center h-full">
    <h1 class="font-pkmn text-3xl font-black tracking-widest">Invitédex</h1>
    <h4 class="mt-3 text-xss">Région Avallon</h4>
    <p class="mt-12 text-xss">{{ text }}</p>
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


    // Change screen
    setTimeout(() => {
      // Stop interval (avoid memory leak)
      clearInterval(interval)

      if (canEmitNext) emit('next', store.isInitialized ? MenuScreen : WelcomeScreen)
    }, 5000)
  } catch (e) {
    console.log(e)
  }
})
</script>

