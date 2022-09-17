<template>
  <ul class="flex flex-col justify-between h-full py-8">
    <li v-for="(item, idx) in items" :key="item" class="flex space-x-4 items-center">
      <div class="flex justify-center items-center">
        <div :class="{'invisible': currentItem !== idx}" class="w-3">
          <FontAwesomeIcon icon="caret-right"/>
        </div>
      </div>
      <p :class="{'font-bold': currentItem === idx}">{{ item }}</p>
    </li>
  </ul>
</template>

<script setup>
import {useStore} from "../../stores";
import GuestsScreen from "./GuestsScreen";
import ResetScreen from "./ResetScreen";
import useResetMitt from "../../composables/useResetMitt";

const store = useStore()
const {$mitt} = useNuxtApp()

useResetMitt()

const items = ['Invités', 'Programme', 'Réinitialiser', 'A propos']
const currentItem = ref(0)
const emit = defineEmits(['next'])

// Handle A button to select and trigger screen change
$mitt.on('A_PRESS', () => {
  let nextScreen = ''

  switch (currentItem.value) {
    case 0:
      nextScreen = GuestsScreen
      break
    case 1:
      nextScreen = 'PlanningScreen'
      break
    case 2:
      nextScreen = ResetScreen
      break
    case 3:
      nextScreen = 'AboutScreen'
      break
  }

  emit('next', nextScreen)
})

// Handle bottom arrow button to move cursor
$mitt.on('DOWN_PRESS', () => currentItem.value = currentItem.value === items.length - 1 ? 0 : currentItem.value + 1)

// Handle top arrow button to move cursor
$mitt.on('UP_PRESS', () => currentItem.value = currentItem.value === 0 ? items.length - 1 : currentItem.value - 1)
</script>
