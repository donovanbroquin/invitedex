<template>
  <div
    class="h-screen w-screen pattern overflow-y-scroll flex justify-center lg:items-center p-2"
  >
    <div class="w-full rounded-lg bg-invitedex">
      <!-- Header -->
        <div class="flex items-start space-x-4 pt-6">
          <div class="bg-blue-400 w-12 h-12 rounded-full ring-4 ring-white"/>

          <div class="flex space-x-2">
            <div class="bg-red-500 w-4 h-4 rounded-full ring-1 ring-black/70"/>
            <div class="bg-yellow-500 w-4 h-4 rounded-full ring-1 ring-black/70"/>
            <div class="bg-green-500 w-4 h-4 rounded-full ring-1 ring-black/70"/>
          </div>
        </div>

        <!-- Screen -->
         <div class="px-6 w-full h-1/3 mt-8">

           <div class="w-full h-full bg-slate-300 p-6 rounded-lg">
             <div class="bg-green-500 h-full w-full"></div>
          </div>
        </div>

        <!-- Buttons -->
         <div></div>
      </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
