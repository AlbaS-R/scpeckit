<template>
  <div class="min-h-screen bg-arcane-dark">
    <header class="sticky top-0 z-40 bg-arcane-dark/90 backdrop-blur-md border-b border-arcane-cyan/10">
      <div class="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-arcane-cyan to-arcane-purple flex items-center justify-center shadow-lg shadow-arcane-cyan/20 group-hover:shadow-arcane-cyan/40 transition-shadow duration-500">
            <span class="text-arcane-dark font-display font-bold text-lg">L</span>
          </div>
          <div>
            <h1 class="text-sm font-display font-bold text-arcane-gold group-hover:text-arcane-gold-light transition-colors">Champion Explorer</h1>
            <p class="text-[9px] text-arcane-text-muted/60 uppercase tracking-[0.2em]">League of Legends</p>
          </div>
        </NuxtLink>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 py-6">
      <slot />
    </main>

    <footer class="border-t border-arcane-cyan/10 mt-12 py-6">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <p class="text-xs text-arcane-text-muted/60">
          Champion Explorer &mdash; una aplicación no oficial de fans para League of Legends
        </p>
        <p class="text-[10px] text-arcane-cyan-dark/40 mt-1">
          Inspirado en la estética de Arcane. Los datos provienen de Riot Games Data Dragon.
        </p>
      </div>
    </footer>

    <ChatBot />
    <PWAInstallPrompt />
  </div>
</template>

<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'bg-arcane-dark',
  },
})
</script>
