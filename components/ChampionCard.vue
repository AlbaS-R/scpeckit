<template>
  <NuxtLink :to="`/champion/${champion.id}`" class="group block">
    <div class="arcane-card hextech-glow relative">
      <div class="absolute inset-0 arcane-corner arcane-corner-tl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div class="absolute inset-0 arcane-corner arcane-corner-tr opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div class="absolute inset-0 arcane-corner arcane-corner-bl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div class="absolute inset-0 arcane-corner arcane-corner-br opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div class="aspect-[2/3] overflow-hidden relative">
        <img
          :src="champion.loading"
          :alt="champion.name"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />

        <div class="absolute inset-0 bg-gradient-to-t from-arcane-dark via-arcane-dark/20 to-transparent opacity-80" />

        <div class="absolute top-2 left-2 flex gap-1 flex-wrap">
          <span
            v-for="tag in champion.tags"
            :key="tag"
            class="text-[8px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider backdrop-blur-sm"
            :class="tagClass(tag)"
          >
            {{ tag }}
          </span>
        </div>

        <div class="absolute bottom-0 left-0 right-0 p-3.5">
          <span class="text-[11px] font-semibold text-arcane-gold/90 uppercase tracking-[0.15em] block leading-tight">
            {{ champion.title }}
          </span>
          <h3 class="text-lg font-display font-bold text-white mt-0.5 leading-tight">{{ champion.name }}</h3>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Champion } from '~/types'

defineProps<{ champion: Champion }>()

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
</script>
