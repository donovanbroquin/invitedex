<template>
  <div class="flex flex-col h-full text-lg tracking-wide">
    <div class="flex">
      <canvas ref="sprite" class="h-24 w-24"/>

      <div class="h-full flex flex-col justify-between">
        <h1 class="font-black text-xs">{{ store.currentGuest?.name }}</h1>
        <div class="pb-3">
          <p class="text-xsss tracking-tighter">{{ store.currentGuest?.relation }}</p>
          <p v-show="store.currentGuest?.table" class="text-xsss tracking-tighter leading-3">Table
            {{ store.currentGuest?.table }}</p>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between mt-2 mb-5">
      <p class="text-xsss">No.{{ no }}</p>

      <div v-if="catched" class="flex space-x-2 items-center">
        <div :class="{'invisible': currentGuest !== idx}" class="w-3">
          <FontAwesomeIcon icon="handshake"/>
        </div>
        <span class="text-xsss">{{ catched.date }}</span>
      </div>
    </div>

    <p class="outline-4 outline-double rounded outline-borders outline-offset-4 h-full text-xss leading-4 py-1 px-2">
      {{ store.currentGuest?.description }}</p>
  </div>
</template>

<script setup>
import {useStore} from "~/stores";
import useSprite from "../../composables/useSprite";
import useResetMitt from "../../composables/useResetMitt";
import GuestsScreen from "./GuestsScreen";
import useCatched from "../../composables/useCatched";
import useNo from "../../composables/useNo";

const store = useStore()
const {$mitt} = useNuxtApp()

useResetMitt()

const emit = defineEmits(['next'])
const sprite = ref()

// const no = computed(() => padstart(store.currentGuest.id, 3, 0))
const no = useNo()
const catched = useCatched()

onMounted(() => {
  sprite.value.setAttribute("width", "56px");
  sprite.value.setAttribute("height", "56px");

  refreshSprite()
})

function refreshSprite() {
  if (store.currentGuest) {
    useSprite(
        sprite.value, store.currentGuest?.sprite, store.currentGuest?.coordinates[0], store.currentGuest?.coordinates[1]
    )
  }
}

$mitt.on('B_PRESS', () => {
  store.onSetCurrentGuest()

  emit('next', GuestsScreen)
})

$mitt.on('DOWN_PRESS', () => {
  useOnListDown()
  useSelectGuest()

  refreshSprite()
})

$mitt.on('UP_PRESS', () => {
  useOnListUp()
  useSelectGuest()

  refreshSprite()
})
</script>
