export interface ChampionStats {
  hp: number
  hpperlevel: number
  mp: number
  mpperlevel: number
  movespeed: number
  armor: number
  armorperlevel: number
  spellblock: number
  spellblockperlevel: number
  attackrange: number
  hpregen: number
  hpregenperlevel: number
  mpregen: number
  mpregenperlevel: number
  crit: number
  critperlevel: number
  attackdamage: number
  attackdamageperlevel: number
  attackspeedperlevel: number
  attackspeed: number
}

export interface Ability {
  id: string
  name: string
  description: string
  image: string
  maxrank: number
  cooldown: number[]
  cooldownBurn: string
  cost: number[]
  costBurn: string
  costType: string
  range: number[]
  rangeBurn: string
  effect: number[][] | null
  vars: object[] | null
}

export interface Skin {
  id: string
  name: string
  num: number
  chromas: boolean
}

export interface Champion {
  id: string
  key: string
  name: string
  title: string
  image: {
    full: string
    sprite: string
    group: string
  }
  splash: string
  loading: string
  portrait: string
  stats: ChampionStats
  tags: string[]
  partype: string
  lore: string
  blurb: string
  abilities: Ability[]
  passive: Ability
  skins: Skin[]
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  championId?: string
}

export interface ChatSession {
  id: string
  messages: ChatMessage[]
  context: Record<string, unknown>
  createdAt: number
  updatedAt: number
}
