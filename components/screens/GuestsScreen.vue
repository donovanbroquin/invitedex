<template>
  <ul class="flex flex-col space-y-3 h-full">
    <li v-for="(guest, idx) in guests[currentPage]" :key="guest.id" class="flex space-x-2 items-center">

      <div class="flex justify-center items-center">
        <div :class="{'invisible': currentGuest !== idx}" class="w-3">
          <FontAwesomeIcon icon="check-circle"/>
        </div>
      </div>

      <div class="flex justify-center items-center">
        <div :class="{'invisible': currentGuest !== idx}" class="w-3">
          <FontAwesomeIcon icon="caret-right"/>
        </div>
      </div>

      <p :class="{'font-bold': currentGuest === idx}">{{ guest.name }}</p>
    </li>
  </ul>
</template>

<script setup>
import {useStore} from "../../stores";
import chunk from "lodash.chunk";
import {useChunkedGuests} from "../../composables/useGuestList";
import MenuScreen from "./MenuScreen";
import GuestScreen from "./GuestScreen";
import useResetMitt from "../../composables/useResetMitt";

const store = useStore()
const {$mitt} = useNuxtApp()

useResetMitt()

const guests = useChunkedGuests()
const currentPage = ref(store.position.page)
const currentGuest = ref(store.position.guest)
const emit = defineEmits(['next'])

// Handle A button to select a guest and go to it's page
$mitt.on('A_PRESS', () => {
  // store.onSetCurrentGuest(guests[currentPage.value][currentGuest.value])
  useSelectGuest()

  emit('next', GuestScreen)
})

// Handle B button to go back to menu screen
$mitt.on('B_PRESS', () => {
  store.onSetCurrentGuest()

  emit('next', MenuScreen)
})

// Handle bottom arrow button to move cursor
$mitt.on('DOWN_PRESS', () => {
  const {page, guest} = useOnListDown()
  console.log('onGuests')
  currentPage.value = page
  currentGuest.value = guest
})

// Handle up arrow button to move cursor
$mitt.on('UP_PRESS', () => {
  const {page, guest} = useOnListUp()

  currentPage.value = page
  currentGuest.value = guest
})

</script>
