<template>
  <div class="flex flex-col items-center justify-between h-full text-xsss tracking-tighter">
    <h1 class="text-base text-center border-b-4 border-double border-borders pb-2">À propos</h1>
    <p>Cette application n'enregistre aucune donnée personnelle et n'inclus aucun cookie de suivi.</p>
    <p>Des informations liées au bon fonctionnement de l'application sont cependant échangées avec un service externe
      (liste d'invités, enregistrements).</p>
  </div>
</template>

<script setup>
import useResetMitt from "../../composables/useResetMitt";
import MenuScreen from './MenuScreen'

const {$mitt} = useNuxtApp()

useResetMitt()

const emit = defineEmits(['next'])

// Handle bottom arrow button to move cursor
$mitt.on('B_PRESS', () => emit('next', MenuScreen))
</script>
