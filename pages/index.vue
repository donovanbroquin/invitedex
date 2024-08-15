<template>
  <div class="h-screen w-screen pattern overflow-y-scroll flex justify-center lg:items-center">
    <div class="rounded-lg border-borders bg-invitedex w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4 h-max mt-2">

      <div class="flex px-4 pt-6 space-x-8">
        <Biper main/>

        <div class="flex space-x-4">
          <Biper v-for="color in bipers" :color="color"/>
        </div>
      </div>

      <Separator/>

      <div class="flex flex-col items-center justify-center mt-6">
        <Screen/>

        <div class="flex space-x-3 mt-6">
          <div class="w-12 h-1 border border-borders bg-red rounded"/>
          <div class="w-12 h-1 border border-borders bg-blue rounded"/>
        </div>
      </div>

      <div class="flex justify-between mt-5 mb-4 px-4">
        <Cross/>

        <div>
          <div class="grid grid-cols-2">
            <ControlButton class="col-start-2" rounded @press="onPress('A')">A</ControlButton>
          </div>

          <div class="grid grid-cols-2">
            <ControlButton rounded @press="onPress('B')">B</ControlButton>
          </div>
        </div>
      </div>
    </div>

    <img v-show="false" id="sprites-1g" class="sprites" src="~/assets/sprites-1g.png" alt="1g sprites board"/>
    <img v-show="false" id="sprites-2g" class="sprites" src="~/assets/sprites-2g.png" alt="2g sprites board"/>
  </div>
</template>

<script setup>
// import "~/assets/app.css";
import Biper from "../components/Biper";
import Separator from "../components/Separator";
import Screen from "../components/Screen";
import Cross from "../components/Cross";
import ControlButton from "../components/ControlButton";
import {useStore} from "../stores";

const store = useStore()

const bipers = ['bg-red', 'bg-orange', 'bg-green']

useHead({
  title: "Invitédex - Laura et Donovan",
});

function onPress(button) {
  store.onButtonPress(button)

  usePress(button)
}
</script>
