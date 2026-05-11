import type { ChatMessage } from '~/types'

const SAMPLE_QUESTIONS = [
  '¿Qué campeón me recomiendas para principiantes?',
  '¿Qué campeón es bueno en la línea superior?',
  'Explícame cómo funciona la visión en League of Legends',
  '¿Qué es el "objetivo de la grieta" y cómo funciona?',
  '¿Qué campeón tiene más daño explosivo?',
  '¿Cómo funcionan los dragones en la Grieta del Invocador?',
]

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

export function useChatBot() {
  const messages = ref<ChatMessage[]>([])
  const isOpen = ref(false)
  const isTyping = ref(false)

  function addMessage(role: 'user' | 'assistant', content: string) {
    messages.value.push({
      id: generateId(),
      role,
      content,
      timestamp: Date.now(),
    })
  }

  async function sendMessage(content: string) {
    if (!content.trim()) return
    addMessage('user', content.trim())
    isTyping.value = true
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content.trim() }),
      })
      const data = await res.json()
      if (data?.reply) {
        addMessage('assistant', data.reply)
      }
    } catch {
      addMessage('assistant', 'Lo siento, hubo un error al procesar tu mensaje. Inténtalo de nuevo.')
    } finally {
      isTyping.value = false
    }
  }

  function toggleChat() {
    isOpen.value = !isOpen.value
  }

  return { messages, isOpen, isTyping, sendMessage, toggleChat, addMessage, SAMPLE_QUESTIONS }
}
