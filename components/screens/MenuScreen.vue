<template>
  <ul class="flex flex-col justify-between h-full space-y-3">
    <li v-for="(item, idx) in items" :key="item"
        :class="{'outline-4 outline-double rounded outline-borders outline-offset-4': currentItem === idx}"
        class="flex space-x-4 items-center w-full">
      <div class="flex justify-center items-center">
        <div :class="{'invisible': currentItem !== idx}" class="w-3">
          <FontAwesomeIcon icon="caret-right"/>
        </div>
      </div>
      <div class="flex justify-between items-center w-full">

        <p :class="{'font-bold': currentItem === idx}" class="w-full text-xss tracking-wide">{{ item.name }}</p>
        <div class="w-5">
          <FontAwesomeIcon :icon="item.icon"/>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup>
import GuestsScreen from "./GuestsScreen";
import ResetScreen from "./ResetScreen";
import ShareCodeScreen from "./ShareCodeScreen";
import ScanGuestScreen from "./ScanGuestScreen";
import AboutScreen from "./AboutScreen";
import ContestScreen from "./ContestScreen";
import useResetMitt from "../../composables/useResetMitt";
import {useStore} from "~/stores";

const {$mitt} = useNuxtApp()

useResetMitt()

const items = [
  {name: 'Invités', icon: 'users'},
  {name: 'Être enregistré(e)', icon: 'qrcode'},
  {name: 'Enregistrer un invité', icon: 'plus-circle'},
  {name: 'Concours', icon: 'trophy'},
  {name: 'Réinitialiser', icon: 'gear'},
  {name: 'À propos', icon: 'question-circle'},
]
const currentItem = ref(0)
const emit = defineEmits(['next'])

useStore().contest()

// Handle A button to select and trigger screen change
$mitt.on('A_PRESS', () => {
  let nextScreen = ''

  switch (currentItem.value) {
    case 0:
      nextScreen = GuestsScreen
      break
    case 1:
      nextScreen = ShareCodeScreen
      break
    case 2:
      nextScreen = ScanGuestScreen
      break
    case 3:
      nextScreen = ContestScreen
      break
    case 4:
      nextScreen = ResetScreen
      break
    case 5:
      nextScreen = AboutScreen
      break
  }

  emit('next', nextScreen)
})

// Handle bottom arrow button to move cursor
$mitt.on('DOWN_PRESS', () => currentItem.value = currentItem.value === items.length - 1 ? 0 : currentItem.value + 1)

// Handle top arrow button to move cursor
$mitt.on('UP_PRESS', () => currentItem.value = currentItem.value === 0 ? items.length - 1 : currentItem.value - 1)
</script>
