<template>
  <div class="h-full flex flex-col justify-between">
    <h1 class="text-center">Réinitialisation de l'Invitédex</h1>

    <div class="tracking-tight">
      <p class="mt-4 text-xsss">Cette action va supprimer toutes les données de l'application.</p>
      <p class="text-xsss">Cette action est irreversible.</p>
    </div>

    <Interaction class="mt-5">
      <template #button>A</template>
      Continuer ?
    </Interaction>
  </div>
</template>

<script setup>
import {useStore} from "../../stores";
import useResetMitt from "../../composables/useResetMitt";
import LoadingScreen from './LoadingScreen'
import MenuScreen from './MenuScreen'
import Interaction from "../Interaction";

const store = useStore()
const emit = defineEmits(['next'])

useResetMitt()

store.$subscribe(async (mutation, state) => {
  // Handle A button to trigger data reset and go back to loading screen
  if (state.input === 'A') {
    await store.onReset()
    emit('next', LoadingScreen)
  }

  // Handle B button to go back to menu screen
  if (state.input === 'B') {
    emit('next', MenuScreen)
  }
})
</script>
