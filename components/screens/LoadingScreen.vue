<template>
  <div class="flex flex-col items-center justify-center h-full">
    <h1 class="font-pkmn text-3xl font-black tracking-widest">Invitédex</h1>
    <h4 class="mt-3 text-xss">Région Avallon</h4>

    <div v-if="loadError" class="h-full flex flex-col justify-between">
      <p class="mt-12 text-xss">Oups, erreur de chargement</p>
      <Interaction>
        <template #button>A</template>
        Retenter
      </Interaction>
    </div>

    <p v-else class="mt-12 text-xss">{{ text }}</p>
  </div>
</template>

<script setup>
import {useStore} from "~/stores";
import MenuScreen from "./MenuScreen";
import WelcomeScreen from "./WelcomeScreen";
import useResetMitt from "~/composables/useResetMitt";

const {$mitt} = useNuxtApp()

const store = useStore()

const text = ref('Chargement')
const canEmitNext = ref(false)
const loadError = ref(false)
const emit = defineEmits(['next'])

useResetMitt()

const interval = setInterval(() => {
  if (text.value === "Chargement...")
    return (text.value = "Chargement");

  return (text.value = text.value + ".");
}, 800)

setTimeout(() => canEmitNext.value = true, 3200)

$mitt.on('A_PRESS', () => {
  load()
})

onMounted(async () => {
  await load()
})

async function load() {
  loadError.value = false

  try {
    await store.init()

    // Change screen
    setTimeout(() => {
      // Stop interval (avoid memory leak)
      clearInterval(interval)

      if (canEmitNext) emit('next', store.isInitialized ? MenuScreen : WelcomeScreen)
    }, 3000)
  } catch (e) {
    console.log(e)
    loadError.value = true
  }
}
</script>

