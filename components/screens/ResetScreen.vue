<template>
  <div class="h-full flex flex-col justify-between">
    <h1 class="text-center border-b-4 border-double border-borders pb-2">Réinitialisation de l'Invitédex</h1>

    <div class="tracking-tight">
      <p class="mt-4 text-xsss">Cette action va supprimer toutes les données de l'application.</p>
      <p class="text-xss mt-3">Cette action est irréversible.</p>
    </div>

    <div class="flex space-x-4 mt-5">
      <Interaction>
        <template #button>B</template>
        Annuler
      </Interaction>

      <Interaction>
        <template #button>A</template>
        Continuer
      </Interaction>
    </div>
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
