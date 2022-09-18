<template>
  <div class="border-borders border-4 border-double flex justify-center space-x-4 items-center rounded py-1 mt-8">
      <span
          class="flex justify-center items-center bg-borders rounded-full w-5 h-5 text-xss text-screen-container text-center">
        <slot name="button"/>
      </span>
    <span><slot/></span>
  </div>
</template>
