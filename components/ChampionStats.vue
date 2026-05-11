<template>
  <div class="space-y-6">
    <div v-for="(group, gIdx) in statGroups" :key="gIdx">
      <h4 class="text-sm font-display font-bold text-arcane-cyan-dark/80 uppercase tracking-wider mb-3 flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full" :class="group.dotClass" />
        {{ group.label }}
      </h4>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div
          v-for="stat in group.stats"
          :key="stat.key"
          class="bg-arcane-darker/80 rounded-lg p-3.5 border border-arcane-border/40"
        >
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-xs text-arcane-text-muted/80 uppercase tracking-wider">{{ stat.label }}</span>
            <span class="text-sm font-bold font-display" :class="stat.color">{{ stat.value }}</span>
          </div>
          <div class="stat-bar">
            <div
              class="stat-bar-fill"
              :class="stat.barColor"
              :style="{ width: stat.percent + '%' }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ChampionStats } from '~/types'

const props = defineProps<{ stats: ChampionStats }>()

const maxValues = {
  hp: 700, mp: 500, movespeed: 345, armor: 50, spellblock: 40,
  attackdamage: 75, attackspeed: 0.7, attackrange: 600,
  hpregen: 10, mpregen: 10,
}

const statGroups = computed(() => [
  {
    label: 'Supervivencia',
    dotClass: 'bg-emerald-400',
    stats: [
      { key: 'hp', label: 'Vida', value: props.stats.hp, percent: Math.min((props.stats.hp / maxValues.hp) * 100, 100), color: 'text-emerald-300', barColor: 'bg-gradient-to-r from-emerald-500 to-emerald-400' },
      { key: 'armor', label: 'Armadura', value: props.stats.armor, percent: Math.min((props.stats.armor / maxValues.armor) * 100, 100), color: 'text-blue-300', barColor: 'bg-gradient-to-r from-blue-500 to-blue-400' },
      { key: 'spellblock', label: 'Res. Mágica', value: props.stats.spellblock, percent: Math.min((props.stats.spellblock / maxValues.spellblock) * 100, 100), color: 'text-purple-300', barColor: 'bg-gradient-to-r from-purple-500 to-purple-400' },
      { key: 'hpregen', label: 'Regen. Vida', value: props.stats.hpregen.toFixed(1), percent: Math.min((props.stats.hpregen / maxValues.hpregen) * 100, 100), color: 'text-emerald-200', barColor: 'bg-gradient-to-r from-emerald-400 to-emerald-300' },
    ],
  },
  {
    label: 'Recursos',
    dotClass: 'bg-cyan-400',
    stats: [
      { key: 'mp', label: 'Maná', value: props.stats.mp, percent: Math.min((props.stats.mp / maxValues.mp) * 100, 100), color: 'text-cyan-300', barColor: 'bg-gradient-to-r from-cyan-500 to-cyan-400' },
      { key: 'mpregen', label: 'Regen. Maná', value: props.stats.mpregen.toFixed(1), percent: Math.min((props.stats.mpregen / maxValues.mpregen) * 100, 100), color: 'text-cyan-200', barColor: 'bg-gradient-to-r from-cyan-400 to-cyan-300' },
    ],
  },
  {
    label: 'Combate',
    dotClass: 'bg-rose-400',
    stats: [
      { key: 'attackdamage', label: 'Daño Ataque', value: props.stats.attackdamage, percent: Math.min((props.stats.attackdamage / maxValues.attackdamage) * 100, 100), color: 'text-rose-300', barColor: 'bg-gradient-to-r from-rose-500 to-rose-400' },
      { key: 'attackspeed', label: 'Vel. Ataque', value: props.stats.attackspeed.toFixed(2), percent: Math.min((props.stats.attackspeed / maxValues.attackspeed) * 100, 100), color: 'text-orange-300', barColor: 'bg-gradient-to-r from-orange-500 to-orange-400' },
      { key: 'attackrange', label: 'Alcance', value: props.stats.attackrange, percent: Math.min((props.stats.attackrange / maxValues.attackrange) * 100, 100), color: 'text-yellow-300', barColor: 'bg-gradient-to-r from-yellow-500 to-yellow-400' },
      { key: 'movespeed', label: 'Vel. Movimiento', value: props.stats.movespeed, percent: Math.min((props.stats.movespeed / maxValues.movespeed) * 100, 100), color: 'text-cyan-300', barColor: 'bg-gradient-to-r from-cyan-500 to-cyan-400' },
    ],
  },
])
</script>
