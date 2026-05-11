<template>
  <div v-if="deferredPrompt" class="fixed bottom-24 right-6 z-40 animate-fade-in">
    <button
      @click="installPWA"
      class="flex items-center gap-2 bg-gradient-to-r from-arcane-cyan to-arcane-purple hover:from-arcane-cyan/90 hover:to-arcane-purple/90 text-white font-semibold px-4 py-2 rounded-lg shadow-lg shadow-arcane-cyan/20 transition-all hover:scale-105 text-sm"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      Instalar App
    </button>
  </div>
</template>

<script setup lang="ts">
const deferredPrompt = ref<any>(null)

function installPWA() {
  if (!deferredPrompt.value) return
  deferredPrompt.value.prompt()
  deferredPrompt.value.userChoice.then(() => {
    deferredPrompt.value = null
  })
}

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt.value = e
  })
})
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}
</style>
