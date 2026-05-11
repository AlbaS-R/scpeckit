<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h2 class="text-3xl font-display font-bold shimmer-text">Catálogo de Campeones</h2>
        <p class="text-sm text-arcane-text-muted/70 mt-1">Explora los {{ filteredChampions.length }} campeones de League of Legends</p>
      </div>
      <div class="relative w-full sm:w-72">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar por nombre, título o rol..."
          class="w-full bg-arcane-card border border-arcane-border/60 rounded-lg px-4 py-2.5 pl-10 text-sm text-arcane-text placeholder-arcane-text-muted/40 focus:outline-none focus:border-arcane-cyan/50 transition-colors"
        />
        <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-arcane-text-muted/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="text-center">
        <div class="w-14 h-14 border-3 border-arcane-cyan/20 border-t-arcane-cyan rounded-full animate-spin mx-auto" />
        <p class="text-arcane-text-muted/60 text-sm mt-4 font-display">Cargando campeones...</p>
      </div>
    </div>

    <div v-else-if="error" class="text-center py-20">
      <p class="text-rose-400">{{ error }}</p>
      <button @click="fetchChampions" class="mt-4 text-arcane-cyan hover:text-arcane-cyan/80 underline text-sm">
        Intentar de nuevo
      </button>
    </div>

    <template v-else>
      <div class="arcane-divider" />
      <ChampionGrid :champions="filteredChampions" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { useChampions } from '~/composables/useChampions'

const { champions, loading, error, fetchChampions } = useChampions()

const searchQuery = ref('')

const filteredChampions = computed(() => {
  if (!searchQuery.value.trim()) return champions.value
  const q = searchQuery.value.toLowerCase()
  return champions.value.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.title.toLowerCase().includes(q) ||
    c.tags.some(t => t.toLowerCase().includes(q))
  )
})

onMounted(() => {
  fetchChampions()
})
</script>
