<template>
  <div class="w-full border-borders border-4 border-double flex justify-center space-x-4 items-center rounded py-1 text-xss">
      <span
          class="flex justify-center items-center bg-borders rounded-full w-5 h-5 text-screen-container text-center text-xsss">
        <slot name="button"/>
      </span>
    <span class="text-xsss"><slot/></span>
  </div>
</template>
