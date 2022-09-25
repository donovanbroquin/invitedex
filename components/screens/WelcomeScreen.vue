<template>
  <div :class="{'h-full': registred}">
    <template v-if="!registred">
      <h1 class="text-lg text-center">Hey bonjour !</h1>
      <p class="mt-6 text-xsss tracking-tighter">Bienvenu dans un batiment rempli d'invités.</p>
      <p class="mt-2 text-xsss tracking-tighter">Avant de commencer ton aventure, qui es-tu ?</p>

      <div
          class="mt-6 flex items-center justify-between h-full border-4 rounded pb-2 px-2 border-double border-borders">
        <p class="font-bold self-center mt-2 text-xss">{{ currentGuest.name }}</p>
        <div class="self-center">
          <div class="w-3 h-2">
            <FontAwesomeIcon icon="caret-up"/>
          </div>
          <div class="w-3 h-2">
            <FontAwesomeIcon icon="caret-down"/>
          </div>
        </div>
      </div>
    </template>

    <div v-else class="space-y-5 flex flex-col justify-center h-full">
      <h1 class="text-center border-b-4 border-double border-borders pb-2">Bienvenue {{ currentGuestFirstName }} !</h1>

      <div class="text-xss flex flex-col space-y-6">
        <p>Ravi de te voir avec nous ce soir.</p>
        <p>Ton aventure commence maintenant, passe une bonne soirée ;)</p>
      </div>

      <Interaction>
        <template #button>A</template>
        Commencer ?
      </Interaction>
    </div>
  </div>
</template>

<script setup>
import sortBy from "lodash.sortby";
import {useStore} from "../../stores";
import MenuScreen from "./MenuScreen";
import useResetMitt from "../../composables/useResetMitt";
import Interaction from "../Interaction";

const store = useStore()
const {$mitt} = useNuxtApp()

useResetMitt()

const guests = toRefs(sortBy(store.guests, 'name'))
const currentGuestId = ref(0)
const emit = defineEmits(['next'])
const registred = ref(false)

const currentGuest = computed(() => {
  return guests[currentGuestId.value].value
})

const currentGuestFirstName = computed(() => {
  return currentGuest.value.name.split(' ')[0]
})

// Handle A button to select and trigger screen change
$mitt.on('A_PRESS', () => {
  if (registred.value) {
    emit('next', MenuScreen)
  } else {
    store.onEndInit(currentGuest.value)
    registred.value = true
  }
})

// Handle bottom arrow button to move cursor
$mitt.on('DOWN_PRESS', () => currentGuestId.value = currentGuestId.value === guests.length - 1 ? 0 : currentGuestId.value + 1)

// Handle top arrow button to move cursor
$mitt.on('UP_PRESS', () => currentGuestId.value = currentGuestId.value === 0 ? guests.length - 1 : currentGuestId.value - 1)
</script>
