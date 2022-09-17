<template>
  <div class="h-full">
    <div class="flex space-x-4">
      <canvas ref="sprite" class="h-24 w-24"/>
      <div class="space-y-4">
        <h1 class="font-black">{{ store.currentGuest.name }}</h1>
        <p>{{ store.currentGuest.relation }}</p>
      </div>
    </div>
    <p class="my-4">No. {{ no }}</p>
    <p>{{ store.currentGuest.description }}</p>
  </div>
</template>

<script setup>
import {useStore} from "../../stores";
import padstart from "lodash.padstart";
import useSprite from "../../composables/useSprite";
import useResetMitt from "../../composables/useResetMitt";
import GuestsScreen from "./GuestsScreen";

const store = useStore()
const {$mitt} = useNuxtApp()

useResetMitt()

const emit = defineEmits(['next'])
const sprite = ref()
const no = computed(() => padstart(store.currentGuest.id, 3, 0))

onMounted(() => {
  sprite.value.setAttribute("width", "56px");
  sprite.value.setAttribute("height", "56px");

  refreshSprite()
})

function refreshSprite() {
  useSprite(sprite.value, store.currentGuest.sprite, store.currentGuest.coordinates[0], store.currentGuest.coordinates[1])
}

$mitt.on('B_PRESS', () => {
  store.onSetCurrentGuest()

  emit('next', GuestsScreen)
})

$mitt.on('DOWN_PRESS', () => {
  useOnListDown()
  useSelectGuest()
  console.log('onDetail')

  refreshSprite()
})

$mitt.on('UP_PRESS', () => {
  useOnListUp()
  useSelectGuest()

  refreshSprite()
})
</script>
