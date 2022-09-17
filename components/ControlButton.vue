<template>
  <button
      :class="{
        'w-10 h-10 text-sm': small,
        'w-14 h-14': !small,
        invisible: disabled && !keepVisibility,
        'rounded-full': rounded,
      }"
      :disabled="disabled"
      class="bg-borders text-white shadow-2xl shadow-blue-500"
      @click="$emit('press')"
  >
    <slot/>
  </button>
</template>

<script setup>
defineProps({
  small: {type: Boolean, default: false},
  disabled: {type: Boolean, default: false},
  rounded: {type: Boolean, default: false},
  keepVisibility: {type: Boolean, default: false},
  serif: {type: Boolean, default: true}
})
</script>
