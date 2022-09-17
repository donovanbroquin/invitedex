<template>
  <div>
    <div class="grid grid-cols-3">
      <ControlButton class="col-start-2 rounded-t" small @press="onPress('up')">
        <div class="flex justify-center items-center">
          <div class="w-3">
            <FontAwesomeIcon icon="caret-up"/>
          </div>
        </div>
      </ControlButton>
    </div>
    <div class="grid grid-cols-3">
      <ControlButton class="rounded-l" small @press="onPress('left')">
        <div class="flex justify-center items-center">
          <div class="w-3">
            <FontAwesomeIcon icon="caret-left"/>
          </div>
        </div>
      </ControlButton>
      <ControlButton disabled keep-visibility small></ControlButton>
      <ControlButton class="rounded-r" small @press="onPress('right')">
        <div class="flex justify-center items-center">
          <div class="w-3">
            <FontAwesomeIcon icon="caret-right"/>
          </div>
        </div>
      </ControlButton>
    </div>
    <div class="grid grid-cols-3">
      <ControlButton class="col-start-2 rounded-b" small @press="onPress('down')">
        <div class="flex justify-center items-center">
          <div class="w-3">
            <FontAwesomeIcon icon="caret-down"/>
          </div>
        </div>
      </ControlButton>
    </div>
  </div>
</template>

<script setup>
import ControlButton from "./ControlButton";
import {useStore} from "../stores";

const store = useStore()

function onPress(button) {
  store.onButtonPress(button)

  usePress(button)
}
</script>
