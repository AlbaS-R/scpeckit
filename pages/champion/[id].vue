<template>
  <div v-if="champion">
    <NuxtLink to="/" class="inline-flex items-center gap-2 text-arcane-text-muted/60 hover:text-arcane-cyan transition-colors mb-6 text-sm font-body">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Volver a campeones
    </NuxtLink>

    <div class="relative rounded-2xl overflow-hidden mb-8 border border-arcane-cyan/20 hextech-glow">
      <img
        :src="champion.splash"
        :alt="champion.name"
        class="w-full h-[350px] sm:h-[500px] object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-arcane-dark via-arcane-dark/30 to-transparent" />
      <div class="absolute inset-0 arcane-corner arcane-corner-tl" />
      <div class="absolute inset-0 arcane-corner arcane-corner-tr" />
      <div class="absolute inset-0 arcane-corner arcane-corner-bl" />
      <div class="absolute inset-0 arcane-corner arcane-corner-br" />
      <div class="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
        <span class="text-sm text-arcane-gold/80 font-semibold uppercase tracking-[0.25em]">{{ champion.title }}</span>
        <h1 class="text-4xl sm:text-5xl font-display font-bold text-white mt-1 shimmer-text">{{ champion.name }}</h1>
        <div class="mt-3 flex gap-2 flex-wrap">
          <span
            v-for="tag in champion.tags"
            :key="tag"
            class="text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider backdrop-blur-sm"
            :class="tagClass(tag)"
          >
            {{ tag }}
          </span>
          <span class="text-xs px-3 py-1 rounded-full bg-cyan-900/40 text-cyan-300 border border-cyan-500/30 font-bold uppercase tracking-wider backdrop-blur-sm">
            {{ champion.partype }}
          </span>
        </div>
      </div>
    </div>

    <div class="arcane-divider" />

    <div class="space-y-12">
      <section>
        <div class="flex items-center gap-3 mb-6">
          <div class="w-1 h-8 bg-gradient-to-b from-arcane-cyan to-arcane-purple rounded-full" />
          <h2 class="text-2xl font-display font-bold text-arcane-text">Estadísticas Base</h2>
        </div>
        <ChampionStats :stats="champion.stats" />
      </section>

      <div class="arcane-divider" />

      <section>
        <div class="flex items-center gap-3 mb-6">
          <div class="w-1 h-8 bg-gradient-to-b from-ability-r to-ability-q rounded-full" />
          <h2 class="text-2xl font-display font-bold text-arcane-text">Habilidades</h2>
        </div>
        <ChampionAbilities :abilities="champion.abilities" :passive="champion.passive" />
      </section>

      <div class="arcane-divider" />

      <section>
        <ChampionLore :lore="champion.lore" :blurb="champion.blurb" />
      </section>
    </div>
  </div>

  <div v-else-if="pageLoading" class="flex justify-center items-center py-20">
    <div class="text-center">
      <div class="w-14 h-14 border-3 border-arcane-cyan/20 border-t-arcane-cyan rounded-full animate-spin mx-auto" />
      <p class="text-arcane-text-muted/60 text-sm mt-4 font-display">Cargando campeón...</p>
    </div>
  </div>

  <div v-else class="text-center py-20">
    <p class="text-arcane-text-muted">Campeón no encontrado</p>
    <NuxtLink to="/" class="inline-block mt-4 text-arcane-cyan hover:text-arcane-cyan/80 underline text-sm">
      Volver a la cuadrícula
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useChampions } from '~/composables/useChampions'

const route = useRoute()
const { champions, fetchChampions, fetchChampionDetail } = useChampions()

const champion = ref<any>(null)
const detailLoading = ref(true)

const tagClass = (tag: string): string => {
  const map: Record<string, string> = {
    'Fighter': 'bg-red-900/50 text-red-300 border border-red-500/30',
    'Tank': 'bg-blue-900/50 text-blue-300 border border-blue-500/30',
    'Mage': 'bg-purple-900/50 text-purple-300 border border-purple-500/30',
    'Assassin': 'bg-pink-900/50 text-pink-300 border border-pink-500/30',
    'Marksman': 'bg-yellow-900/50 text-yellow-300 border border-yellow-500/30',
    'Support': 'bg-emerald-900/50 text-emerald-300 border border-emerald-500/30',
  }
  return map[tag] || 'bg-gray-900/50 text-gray-300 border border-gray-500/30'
}

onMounted(async () => {
  if (champions.value.length === 0) {
    await fetchChampions()
  }
  detailLoading.value = true
  const detail = await fetchChampionDetail(route.params.id as string)
  if (detail) {
    champion.value = detail
  }
  detailLoading.value = false
})

const pageLoading = computed(() => detailLoading.value)

useHead({
  title: computed(() => champion.value ? `${champion.value.name} - ${champion.value.title} - LoL Explorer` : 'Cargando...'),
})
</script>
