<template>
  <div class="fixed bottom-6 right-6 z-50">
    <button
      v-if="!isOpen"
      @click="toggleChat"
      class="w-14 h-14 rounded-full bg-gradient-to-br from-arcane-cyan to-arcane-purple hover:from-arcane-cyan/90 hover:to-arcane-purple/90 text-white shadow-lg shadow-arcane-cyan/30 transition-all duration-300 hover:scale-110 hover:shadow-arcane-cyan/50 flex items-center justify-center group arcane-glow"
      aria-label="Abrir chat"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    </button>

    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 scale-95 translate-y-4"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-4"
    >
      <div v-if="isOpen" class="w-[380px] h-[560px] bg-arcane-card border border-arcane-cyan/25 rounded-2xl shadow-2xl shadow-black/60 flex flex-col overflow-hidden">
        <div class="bg-gradient-to-r from-arcane-darker to-arcane-dark px-4 py-3 flex items-center justify-between border-b border-arcane-cyan/15">
          <div class="flex items-center gap-2.5">
            <div class="relative">
              <div class="w-2.5 h-2.5 rounded-full bg-arcane-cyan" />
              <div class="absolute inset-0 w-2.5 h-2.5 rounded-full bg-arcane-cyan animate-ping opacity-40" />
            </div>
            <span class="text-sm font-display font-bold text-arcane-cyan">Asistente Arcane</span>
          </div>
          <div class="flex items-center gap-1">
            <button @click="resetChat" class="p-1.5 text-arcane-text-muted/50 hover:text-arcane-cyan transition-colors rounded-lg hover:bg-arcane-cyan/10" title="Nuevo chat">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button @click="toggleChat" class="p-1.5 text-arcane-text-muted/50 hover:text-arcane-cyan transition-colors rounded-lg hover:bg-arcane-cyan/10">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-3 bg-[radial-gradient(ellipse_at_top,rgba(0,212,255,0.03)_0%,transparent_60%)]">
          <div v-if="messages.length === 0" class="text-center py-8">
            <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-arcane-cyan/15 to-arcane-purple/15 border border-arcane-cyan/25 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-arcane-cyan/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p class="text-arcane-cyan font-display font-bold text-sm">Asistente de Arcane</p>
            <p class="text-arcane-text-muted/60 text-xs mt-1">Pregúntame sobre campeones o mecánicas del juego</p>
            <div class="mt-4 space-y-2">
              <button
                v-for="(q, i) in sampleQuestions"
                :key="i"
                @click="sendMessage(q)"
                class="block w-full text-left text-xs bg-arcane-darker/80 hover:bg-arcane-cyan/10 text-arcane-text-muted/70 hover:text-arcane-cyan p-2.5 rounded-lg border border-arcane-border/50 hover:border-arcane-cyan/25 transition-all"
              >
                {{ q }}
              </button>
            </div>
          </div>

          <div v-for="msg in messages" :key="msg.id" :class="['flex', msg.role === 'user' ? 'justify-end' : 'justify-start']">
            <div
              :class="[
                'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-arcane-cyan/80 to-arcane-purple/80 text-white rounded-br-md font-body'
                  : 'bg-arcane-darker/80 text-arcane-text border border-arcane-border/50 rounded-bl-md font-body',
              ]"
              v-html="msg.content"
            />
          </div>

          <div v-if="isTyping" class="flex justify-start">
            <div class="bg-arcane-darker/80 border border-arcane-border/50 rounded-2xl rounded-bl-md px-4 py-3">
              <div class="flex gap-1">
                <span class="w-2 h-2 bg-arcane-cyan rounded-full animate-bounce" style="animation-delay: 0ms" />
                <span class="w-2 h-2 bg-arcane-purple rounded-full animate-bounce" style="animation-delay: 150ms" />
                <span class="w-2 h-2 bg-arcane-cyan rounded-full animate-bounce" style="animation-delay: 300ms" />
              </div>
            </div>
          </div>
        </div>

        <form @submit.prevent="handleSend" class="p-3 border-t border-arcane-cyan/15 bg-arcane-darker flex gap-2">
          <input
            v-model="inputText"
            type="text"
            placeholder="Escribe tu mensaje..."
            class="flex-1 bg-arcane-card border border-arcane-border/50 rounded-lg px-3 py-2 text-sm text-arcane-text placeholder-arcane-text-muted/40 focus:outline-none focus:border-arcane-cyan/50 transition-colors"
          />
          <button
            type="submit"
            :disabled="!inputText.trim() || isTyping"
            class="px-3 py-2 bg-gradient-to-r from-arcane-cyan to-arcane-purple hover:from-arcane-cyan/90 hover:to-arcane-purple/90 text-white rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useChatBot } from '~/composables/useChatBot'

const { messages, isOpen, isTyping, sendMessage, toggleChat, addMessage, SAMPLE_QUESTIONS } = useChatBot()

const inputText = ref('')
const chatContainer = ref<HTMLElement | null>(null)
const sampleQuestions = ref(SAMPLE_QUESTIONS)

watch(messages, () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}, { deep: true })

watch(isTyping, () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
})

function handleSend() {
  if (!inputText.value.trim() || isTyping.value) return
  sendMessage(inputText.value)
  inputText.value = ''
}

function resetChat() {
  messages.value = []
  addMessage('assistant', '¡Hola de nuevo! ¿En qué puedo ayudarte hoy?')
}
</script>
