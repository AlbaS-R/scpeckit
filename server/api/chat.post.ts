const CHATBOT_API_URL = process.env.CHATBOT_API_URL || 'https://api.openai.com'
const CHATBOT_API_KEY = process.env.CHATBOT_API_KEY || ''
const CHATBOT_MODEL = process.env.CHATBOT_MODEL || 'gpt-4o-mini'

const DEFAULT_SYSTEM_PROMPT = `Eres un asistente experto en League of Legends. Tu nombre es "Asistente LoL". Ayudas a los usuarios a elegir campeones según sus preferencias y explicas mecánicas del juego. Responde SIEMPRE en español, de forma clara y concisa. Si preguntan por campeones, sugiere nombres concretos con su rol. Si preguntan por mecánicas (visión, dragones, barón, líneas, objetos), explica de forma didáctica. Máximo 3 párrafos por respuesta.`

const localResponses: { keywords: string[]; reply: string }[] = [
  {
    keywords: ['vision', 'ward', 'vision wards', 'centinela'],
    reply: 'La visión en League of Legends se basa en wards (centinelas). Hay 3 tipos: Wards de visión (75 de oro, duran 90-120 seg), Wards de control (75 de oro, permanentes hasta ser destruidos) y Wards de planta (gratis desde nivel 1 con el item de soporte). Los wards de control además desactivan wards enemigos en un área.',
  },
  {
    keywords: ['dragon', 'dragón', 'dragones', 'anciano'],
    reply: 'Los dragones elementales aparecen desde los 5 minutos. Tipos: Infernal (+daño), Montaña (+resistencia), Nube (+vel. movimiento), Océano (+regeneración). Cada 3 dragones del mismo tipo, la bonificación se duplica. El Dragón Anciano aparece tras 4 dragones y otorga un efecto quemante que ejecuta a enemigos por debajo de cierto % de vida.',
  },
  {
    keywords: ['barón', 'nashor', 'baron'],
    reply: 'El Barón Nashor aparece a los 20 minutos. Al derrotarlo, el equipo obtiene: súbditos masivamente mejorados (+daño, +resistencia, +tamaño), AD y AP aumentados, y regreso a base acelerado. El buffo dura 3 minutos. Es el objetivo más importante del juego tardío.',
  },
  {
    keywords: ['heraldo', 'herald', 'grieta'],
    reply: 'El Heraldo de la Grieta aparece a los 8 minutos (hasta los 19:45). Al derrotarlo, deja un ojo que puedes recoger. Al activarlo, invocas al Heraldo para que embista contra las torretas, haciéndoles daño masivo. Es ideal para conseguir la primera torreta y ventaja de oro temprana.',
  },
  {
    keywords: ['linea', 'lane', 'top', 'superior', 'mid', 'media', 'bot', 'inferior', 'adc', 'soporte', 'support', 'jungla', 'jungle'],
    reply: 'Las líneas en League of Legends: 1) Top (Superior) - Tanques y luchadores, 1v1, foco en duelos y split push. 2) Jungla - Campeones que se mueven entre líneas, farmean campamentos neutrales ygankean. 3) Mid (Media) - Magos y asesinos, línea corta, fácil rotación. 4) Bot (Inferior) - ADC (tirador) + Soporte, 2v2, foco en farmeo y peleas de equipo.',
  },
  {
    keywords: ['principiantes', 'empezar', 'nuevo', 'novato', 'facil'],
    reply: 'Para principiantes recomiendo: Top: Garen (sencillo, tanque con daño). Mid: Annie (burst fácil con punto ciego). Jungla: Warwick (sigue la pista, mucha vida). ADC: Ashe (utilidad, ataque básico potente). Soporte: Soraka (curación constante, fácil de jugar). Son campeones con mecánicas simples que te ayudarán a aprender el juego.',
  },
  {
    keywords: ['top', 'superior'],
    reply: 'Para Top: Garen, Darius, Malphite, Sett, Ornn, K\'Sante, Fiora. Los tanques y luchadores dominan esta línea. Garen es el mejor para empezar. Para más avanzados: Fiora y Riven tienen alto daño pero requieren mecánicas.',
  },
  {
    keywords: ['mid', 'media'],
    reply: 'Para Mid: Annie, Ahri, Lux, Zed, Yasuo, Syndra, Vex. Magos y asesinos rotan rápido. Annie es ideal para aprender. Para mains: Zed y Yasuo tienen alto potencial pero requieren práctica.',
  },
  {
    keywords: ['jungla', 'jungle'],
    reply: 'Para Jungla: Warwick, Master Yi, Amumu, Vi, Lee Sin, Lillia. Warwick es el mejor para principiantes (sigue rastros de vida baja). Lee Sin es para avanzados (alto skill ceiling).',
  },
  {
    keywords: ['adc', 'tirador', 'bot'],
    reply: 'Para ADC/Bot: Ashe, Jinx, Kai\'Sa, Ezreal, Miss Fortune, Jhin, Vayne. Los hiper-scales como Vayne y Jinx son fuertes al final de la partida. Ezreal es seguro con su destello.',
  },
  {
    keywords: ['soporte', 'support', 'sup'],
    reply: 'Para Soporte: Soraka (cura), Leona (tanque/engage), Lulu (peel), Thresh (utilidad), Nami (cura+daño), Janna (protección). Leona es excelente para engages agresivos. Soraka para un estilo pasivo de sustain.',
  },
  {
    keywords: ['objetivo', 'objetivos', 'prioridad'],
    reply: 'Orden de prioridad de objetivos: 1) Torres exteriores (abren el mapa), 2) Heraldo (torreta temprana), 3) Dragon (bonificaciones permanentes), 4) Torres inhibidoras (generan súbditos superiores), 5) Barón Nashor (mejora masiva de súbditos), 6) Nexo enemigo (victoria).',
  },
]

function getLocalReply(message: string): string {
  const lower = message.toLowerCase()
  for (const entry of localResponses) {
    for (const keyword of entry.keywords) {
      if (lower.includes(keyword)) return entry.reply
    }
  }
  return `¡Hola! Soy tu asistente de League of Legends. Puedo ayudarte con estas cosas:\n\n• Recomendarte campeones según tu rol (Top, Mid, Jungla, ADC, Soporte)\n• Explicar mecánicas: visión, dragones, Barón Nashor, Heraldo, líneas, objetivos\n• Recomendarte campeones para principiantes\n\n¿Sobre qué quieres preguntar?`
}

async function callExternalAPI(message: string): Promise<string | null> {
  if (!CHATBOT_API_KEY) return null

  try {
    const response = await fetch(`${CHATBOT_API_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CHATBOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: CHATBOT_MODEL,
        messages: [
          { role: 'system', content: DEFAULT_SYSTEM_PROMPT },
          { role: 'user', content: message },
        ],
        max_tokens: 512,
        temperature: 0.7,
      }),
    })

    if (!response.ok) return null

    const data = await response.json()
    return data.choices?.[0]?.message?.content || null
  } catch {
    return null
  }
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const message: string = body?.message?.trim() || ''

  if (!message) {
    return { reply: 'Por favor, escribe un mensaje para poder ayudarte.' }
  }

  const externalReply = await callExternalAPI(message)
  if (externalReply) {
    return { reply: externalReply }
  }

  await new Promise(r => setTimeout(r, 300 + Math.random() * 400))
  return { reply: getLocalReply(message) }
})
