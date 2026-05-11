<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
    <ChampionCard v-for="champ in champions" :key="champ.id" :champion="champ" />
  </div>
</template>

<script setup lang="ts">
import type { Champion } from '~/types'

defineProps<{ champions: Champion[] }>()
</script>
