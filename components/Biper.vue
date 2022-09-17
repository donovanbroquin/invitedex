<template>
  <div :class="classes" class="rounded-full relative">
    <div v-if="!reflectless" :class="reflect" class="absolute  bg-white rounded-full opacity-50"/>
  </div>
</template>

<script setup>
const props = defineProps({
  main: {type: Boolean, default: false},
  color: {type: String, default: 'bg-blue'},
  reflectless: {type: Boolean, default: false}
})

const {main, color} = toRefs(props)

const classes = main.value
    ? 'h-10 w-10 bg-biper ring-4 ring-white'
    : `h-4 w-4 ${color.value} ring-2 ring-borders`

const reflect = main.value
    ? 'h-2.5 w-2.5 left-2.5 top-2.5'
    : 'h-1.5 w-1.5 left-0.5 top-0.5'
</script>
