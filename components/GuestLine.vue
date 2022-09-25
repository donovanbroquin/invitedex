<template>
  <li :class="{'outline-4 outline-double rounded outline-borders outline-offset-4': isCurrent}"
      class="flex space-x-4 items-center text-lg tracking-wide leading-3">
    <div class="flex justify-center items-center">
      <div :class="{'invisible': currentGuest.id !== guest.id}" class="w-3">
        <FontAwesomeIcon icon="caret-right"/>
      </div>
    </div>

    <div class="w-full">
      <div class="flex space-x-4 justify-between">
        <p class="text-xsss">No. {{ no }}</p>

        <div :class="{'invisible': catched?.hash !== guest.hash && !isUser}"
             class="flex justify-center items-center">
          <div class="w-5">
            <FontAwesomeIcon :icon="isUser ? 'check' : 'handshake'"/>
          </div>
        </div>
      </div>

      <p :class="{'font-bold': isCurrent}" class="tracking-wider text-xss">{{ guest.name }}</p>
    </div>
  </li>
</template>

<script setup>
import {useStore} from "../stores";
import useCatched from "../composables/useCatched";
import useNo from "../composables/useNo";

const store = useStore()

const props = defineProps({
  guest: {type: Object, required: true},
  currentGuest: {type: Object, required: true}
})
const {guest, currentGuest} = toRefs(props)

const catched = useCatched(guest.value.hash)
const no = useNo(guest.value)
const isUser = computed(() => store.whoiam === guest.value.hash)
const isCurrent = computed(() => currentGuest.value.id === guest.value.id)
</script>
