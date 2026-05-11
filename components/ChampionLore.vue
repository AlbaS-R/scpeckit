<template>
  <div class="space-y-6">
    <div class="relative bg-gradient-to-br from-arcane-card to-arcane-darker rounded-lg p-6 border border-arcane-cyan/15 overflow-hidden">
      <div class="absolute top-3 right-3 text-arcane-cyan/10 text-2xl font-display font-bold select-none">✦</div>
      <div class="absolute bottom-3 left-3 text-arcane-purple/10 text-2xl font-display font-bold select-none">✦</div>
      <div class="absolute inset-0 arcane-corner arcane-corner-tl" />
      <div class="absolute inset-0 arcane-corner arcane-corner-tr" />
      <div class="absolute inset-0 arcane-corner arcane-corner-bl" />
      <div class="absolute inset-0 arcane-corner arcane-corner-br" />
      <div class="relative">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-1 h-8 bg-gradient-to-b from-arcane-cyan to-arcane-purple rounded-full" />
          <h3 class="text-2xl font-display font-bold shimmer-text">Historia</h3>
        </div>
        <p class="text-sm text-arcane-text/85 leading-relaxed whitespace-pre-line font-body">{{ lore }}</p>
      </div>
    </div>

    <div class="relative bg-arcane-darker/50 rounded-lg p-6 border border-arcane-border/40">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-1 h-8 bg-gradient-to-b from-arcane-gold to-arcane-gold-dark/60 rounded-full" />
        <h3 class="text-2xl font-display font-bold text-arcane-gold/80">Resumen</h3>
      </div>
      <p class="text-sm text-arcane-text/70 leading-relaxed italic font-body border-l-2 border-arcane-gold/20 pl-4">"{{ blurb }}"</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  lore: string
  blurb: string
}>()
</script>
