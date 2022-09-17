<template>
  <div class="h-full flex flex-col justify-between">
    <h1 class="text-lg text-center">Réinitialisation de l'Invitédex</h1>
    <div>

      <p class="mt-4">Cette action va supprimer toutes les données de l'application.</p>
      <p>Cette action est irreversible.</p>
    </div>

    <p class="mt-4 text-center font-bold">Continuer ?</p>
  </div>
</template>

<script setup>
import {useStore} from "../../stores";
import useResetMitt from "../../composables/useResetMitt";

const store = useStore()
const emit = defineEmits(['next'])

useResetMitt()


store.$subscribe(async (mutation, state) => {
  // Handle A button to trigger data reset and go back to loading screen
  if (state.input === 'A') {
    await store.onReset()
    emit('next', 'LoadingScreen')
  }

  // Handle B button to go back to menu screen
  if (state.input === 'B') {
    emit('next', 'LoadingScreen')
  }
})
</script>
