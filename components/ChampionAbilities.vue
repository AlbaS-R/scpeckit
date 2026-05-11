<template>
  <div class="space-y-3">
    <div class="bg-arcane-darker/80 rounded-lg p-4 border-l-[3px] border-l-ability-p flex items-start gap-4">
      <img
        :src="passive.image"
        :alt="passive.name"
        class="w-14 h-14 rounded-lg border border-arcane-cyan/20 bg-arcane-card flex-shrink-0"
        loading="lazy"
      />
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1">
          <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-ability-p/20 text-ability-p border border-ability-p/30">Pasiva</span>
        </div>
        <h4 class="text-lg font-display font-bold text-white">{{ passive.name }}</h4>
        <div class="mt-1 text-sm text-arcane-text/80 leading-relaxed" v-html="passive.description" />
      </div>
    </div>

    <div
      v-for="ability in abilities"
      :key="ability.id"
      class="bg-arcane-darker/80 rounded-lg p-4 border-l-[3px] flex items-start gap-4 transition-all duration-300 hover:brightness-110"
      :class="abilityBorder(ability.id)"
    >
      <img
        :src="ability.image"
        :alt="ability.name"
        class="w-14 h-14 rounded-lg border bg-arcane-card flex-shrink-0"
        :class="abilityIconBorder(ability.id)"
        loading="lazy"
      />
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1">
          <span
            class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
            :class="abilityBadge(ability.id)"
          >
            {{ abilityLabel(ability.id) }}
          </span>
          <span class="text-xs text-arcane-text-muted/60">|</span>
          <span class="text-xs text-arcane-text-muted/80">{{ ability.cooldownBurn }}</span>
          <span v-if="ability.costBurn" class="text-xs text-arcane-text-muted/60">| Coste: {{ ability.costBurn }}</span>
        </div>
        <h4 class="text-lg font-display font-bold text-white mt-0.5">{{ ability.name }}</h4>
        <div class="mt-1 text-sm text-arcane-text/80 leading-relaxed" v-html="ability.description" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ability } from '~/types'

defineProps<{
  abilities: Ability[]
  passive: Ability
}>()

const abilityLabel = (id: string): string => {
  const map: Record<string, string> = { Q: 'Habilidad Q', W: 'Habilidad W', E: 'Habilidad E', R: 'Definitiva' }
  return map[id] || id
}

const abilityBorder = (id: string): string => {
  const map: Record<string, string> = {
    Q: 'border-l-ability-q', W: 'border-l-ability-w', E: 'border-l-ability-e', R: 'border-l-ability-r',
  }
  return map[id] || 'border-l-ability-p'
}

const abilityIconBorder = (id: string): string => {
  const map: Record<string, string> = {
    Q: 'border-ability-q/40', W: 'border-ability-w/40', E: 'border-ability-e/40', R: 'border-ability-r/40',
  }
  return map[id] || 'border-ability-p/40'
}

const abilityBadge = (id: string): string => {
  const map: Record<string, string> = {
    Q: 'bg-ability-q/20 text-ability-q border border-ability-q/30',
    W: 'bg-ability-w/20 text-ability-w border border-ability-w/30',
    E: 'bg-ability-e/20 text-ability-e border border-ability-e/30',
    R: 'bg-ability-r/20 text-ability-r border border-ability-r/30',
  }
  return map[id] || 'bg-ability-p/20 text-ability-p border border-ability-p/30'
}
</script>
