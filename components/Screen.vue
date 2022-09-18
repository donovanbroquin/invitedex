<template>
  <div class="bg-screen-container ring-4 ring-borders h-80 w-11/12 py-2 px-3 space-y-3">
    <div class="flex justify-center items-center space-x-8">
      <Biper v-for="idx in 2" color="bg-red" reflectless/>
    </div>

    <div class="bg-screen h-60 w-full rounded font-pkmn text-xs p-4 relative">
      <Component :is="currentScreen" @next="onChangeScreen" @back="onChangeScreen(true)"/>
    </div>

    <div class="flex justify-between items-center pl-6">
      <Biper color="bg-red" reflectless/>

      <div class="flex flex-col space-y-1">
        <div class="h-0.5 w-8 bg-borders"/>
        <div class="h-0.5 w-8 bg-borders"/>
        <div class="h-0.5 w-8 bg-borders"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {shallowRef} from 'vue'
import Biper from "./Biper";
import LoadingScreen from "./screens/LoadingScreen";

const currentScreen = shallowRef(LoadingScreen)

function onChangeScreen(screen) {
  currentScreen.value = screen
}
</script>
