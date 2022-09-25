<template>
  <div :class="{
    'flex justify-center items-center': loading
  }" class="h-full">
    <p v-show="loading">{{ loadingText }}</p>

    <div v-show="!hasError && winner" class="flex flex-col justify-center items-center">

      <h1>Qui est en tête ?</h1>
      <canvas ref="sprite" class="h-24 w-24"/>

      <h2 class="mt-3">{{ winner?.name }}</h2>

      <div class="self-left mt-2 text-xsss">
        <div>
          <span>Enregistrés: </span> {{ winner?.catchesCount }}
        </div>
        <div>
          <span>Dernier le: </span> {{ lastCatchDate }}
        </div>
      </div>
    </div>

    <div v-show="hasError && !winner" class="h-full flex flex-col justify-between">
      <div class="text-center space-y-4">
        <h1>Pas de résultat pour le moment</h1>
        <p class="text-xsss">Reviens plus tard !</p>
      </div>

      <Interaction>
        <template #button>
          B
        </template>

        Retourner au menu
      </Interaction>
    </div>
  </div>
</template>

<script setup>
import useResetMitt from "../../composables/useResetMitt";
import MenuScreen from "./MenuScreen";
import {useStore} from "~/stores";
import useSprite from "~/composables/useSprite";

useResetMitt()

const {$mitt} = useNuxtApp()
const emit = defineEmits(['next'])
const store = useStore()

const loadingText = ref('Chargement')
const loading = ref(true)
const winner = ref(null)
const hasError = ref(false)
const sprite = ref()

const loadingInterval = setInterval(() => {
  if (loadingText.value === "Chargement...")
    return (loadingText.value = "Chargement");

  return (loadingText.value = loadingText.value + ".");
}, 800)

onBeforeMount(async () => {
  try {
    winner.value = await store.contest()
  } catch (e) {
    hasError.value = true
    console.log(e)
  }

  loading.value = false
  clearInterval(loadingInterval)
})

onMounted(() => {
      sprite.value.setAttribute("width", "56px");
      sprite.value.setAttribute("height", "56px");
    }
)

watch(winner, (curr) => {
  if (curr) {
    useSprite(sprite.value, curr.sprite, curr.coordinates[0], curr.coordinates[1])
  }
})

const lastCatchDate = computed(() => {
  if (winner.value?.lastCatch)
    return new Intl.DateTimeFormat('fr-FR', {
      day: "numeric",
      month: "numeric",
      hour: "numeric",
      minute: 'numeric'
    }).format(new Date(winner.value.lastCatch.date))
})

// Handle B button to go back to menu screen
$mitt.on('B_PRESS', () => {
  store.onSetCurrentGuest()

  emit('next', MenuScreen)
})
</script>
