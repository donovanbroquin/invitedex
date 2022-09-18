<template>
  <ul class="flex flex-col space-y-4 h-full">
    <GuestLine
        v-for="guest in guests[currentPage]"
        :key="guest.id"
        :guest="guest"
        :current-guest="currentGuestInList"
    />
  </ul>
</template>

<script setup>
import {useStore} from "../../stores";
import chunk from "lodash.chunk";
import {useChunkedGuests} from "../../composables/useGuestList";
import MenuScreen from "./MenuScreen";
import GuestScreen from "./GuestScreen";
import useResetMitt from "../../composables/useResetMitt";
import useCatched from "../../composables/useCatched";
import GuestLine from "../GuestLine";

const store = useStore()
const {$mitt} = useNuxtApp()

useResetMitt()

const guests = useChunkedGuests()
const currentPage = ref(store.position.page)
const currentGuest = ref(store.position.guest)
const emit = defineEmits(['next'])

const currentGuestInList = computed(() => guests[currentPage.value][currentGuest.value])

// Handle A button to select a guest and go to it's page
$mitt.on('A_PRESS', () => {
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
