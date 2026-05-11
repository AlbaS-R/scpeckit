import type { Champion, ChampionStats, Ability } from '~/types'

const CACHE_KEY = 'lol-champions'
const CACHE_META_KEY = 'lol-champions-meta'
const CACHE_DURATION = 1000 * 60 * 60 * 24
const DD_BASE = 'https://ddragon.leagueoflegends.com/cdn'

let ddVersion = ''

async function getLatestVersion(): Promise<string> {
  try {
    const res = await fetch('https://ddragon.leagueoflegends.com/api/versions.json')
    const versions: string[] = await res.json()
    return versions[0]
  } catch {
    return '15.7.1'
  }
}

function getChampionSplash(id: string): string {
  return `${DD_BASE}/img/champion/splash/${id}_0.jpg`
}

function getChampionLoading(id: string): string {
  return `${DD_BASE}/img/champion/loading/${id}_0.jpg`
}

function getChampionPortrait(id: string, imageFull: string): string {
  return `${DD_BASE}/${ddVersion}/img/champion/${imageFull}`
}

function getAbilityImage(id: string): string {
  return `${DD_BASE}/${ddVersion}/img/spell/${id}.png`
}

function getPassiveImage(name: string): string {
  return `${DD_BASE}/${ddVersion}/img/passive/${name}`
}

export function useChampions() {
  const champions = ref<Champion[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchChampions(): Promise<Champion[]> {
    const cached = localStorage.getItem(CACHE_KEY)
    const cachedMeta = localStorage.getItem(CACHE_META_KEY)
    if (cached && cachedMeta) {
      const { timestamp } = JSON.parse(cachedMeta)
      if (Date.now() - timestamp < CACHE_DURATION) {
        champions.value = JSON.parse(cached)
        return champions.value
      }
    }

    loading.value = true
    error.value = null

    try {
      ddVersion = await getLatestVersion()
      const res = await fetch(`${DD_BASE}/${ddVersion}/data/en_US/champion.json`)
      const json = await res.json()
      const entries = Object.values(json.data) as any[]

      const mapped: Champion[] = entries.map((entry: any) => ({
        id: entry.id,
        key: entry.key,
        name: entry.name,
        title: entry.title,
        image: entry.image,
        splash: getChampionSplash(entry.id),
        loading: getChampionLoading(entry.id),
        portrait: getChampionPortrait(entry.id, entry.image?.full || ''),
        stats: {} as ChampionStats,
        tags: entry.tags || [],
        partype: entry.partype || '',
        lore: entry.lore || '',
        blurb: entry.blurb || '',
        abilities: [],
        passive: { id: 'P', name: '', description: '', image: '', maxrank: 1, cooldown: [], cooldownBurn: '', cost: [], costBurn: '', costType: '', range: [], rangeBurn: '', effect: null, vars: null },
        skins: [],
      }))

      mapped.sort((a, b) => a.name.localeCompare(b.name))
      champions.value = mapped

      localStorage.setItem(CACHE_KEY, JSON.stringify(mapped))
      localStorage.setItem(CACHE_META_KEY, JSON.stringify({ timestamp: Date.now() }))
      return mapped
    } catch (e) {
      console.error('Error fetching champions:', e)
      error.value = 'Error al cargar los campeones'
      return []
    } finally {
      loading.value = false
    }
  }

  async function fetchChampionDetail(id: string): Promise<Champion | null> {
    try {
      if (!ddVersion) ddVersion = await getLatestVersion()
      const res = await fetch(`${DD_BASE}/${ddVersion}/data/en_US/champion/${id}.json`)
      const json = await res.json()
      const data = json.data[id]
      if (!data) return null

      const stats = data.stats || {}
      const spells: Ability[] = (data.spells || []).map((spell: any) => ({
        id: spell.id,
        name: spell.name,
        description: spell.description,
        image: getAbilityImage(spell.id),
        maxrank: spell.maxrank,
        cooldown: spell.cooldown || [],
        cooldownBurn: spell.cooldownBurn || '',
        cost: spell.cost || [],
        costBurn: spell.costBurn || '',
        costType: spell.costType || '',
        range: spell.range || [],
        rangeBurn: spell.rangeBurn || '',
        effect: spell.effect || null,
        vars: spell.vars || null,
      }))

      const passive: Ability = data.passive
        ? {
            id: 'P',
            name: data.passive.name,
            description: data.passive.description,
            image: getPassiveImage(data.passive.image?.full || ''),
            maxrank: 1,
            cooldown: [],
            cooldownBurn: '',
            cost: [],
            costBurn: '',
            costType: '',
            range: [],
            rangeBurn: '',
            effect: null,
            vars: null,
          }
        : { id: 'P', name: '', description: '', image: '', maxrank: 1, cooldown: [], cooldownBurn: '', cost: [], costBurn: '', costType: '', range: [], rangeBurn: '', effect: null, vars: null }

      return {
        id: data.id,
        key: data.key,
        name: data.name,
        title: data.title,
        image: data.image,
        splash: getChampionSplash(data.id),
        loading: getChampionLoading(data.id),
        portrait: getChampionPortrait(data.id, data.image?.full || ''),
        stats: {
          hp: stats.hp ?? 0,
          hpperlevel: stats.hpperlevel ?? 0,
          mp: stats.mp ?? 0,
          mpperlevel: stats.mpperlevel ?? 0,
          movespeed: stats.movespeed ?? 0,
          armor: stats.armor ?? 0,
          armorperlevel: stats.armorperlevel ?? 0,
          spellblock: stats.spellblock ?? 0,
          spellblockperlevel: stats.spellblockperlevel ?? 0,
          attackrange: stats.attackrange ?? 0,
          hpregen: stats.hpregen ?? 0,
          hpregenperlevel: stats.hpregenperlevel ?? 0,
          mpregen: stats.mpregen ?? 0,
          mpregenperlevel: stats.mpregenperlevel ?? 0,
          crit: stats.crit ?? 0,
          critperlevel: stats.critperlevel ?? 0,
          attackdamage: stats.attackdamage ?? 0,
          attackdamageperlevel: stats.attackdamageperlevel ?? 0,
          attackspeedperlevel: stats.attackspeedperlevel ?? 0,
          attackspeed: stats.attackspeed ?? 0,
        },
        tags: data.tags || [],
        partype: data.partype || '',
        lore: data.lore || '',
        blurb: data.blurb || '',
        abilities: spells,
        passive,
        skins: (data.skins || []).map((skin: any) => ({
          id: String(skin.id),
          name: skin.name,
          num: skin.num,
          chromas: skin.chromas ?? false,
        })),
      }
    } catch (e) {
      console.error(`Error fetching champion detail for ${id}:`, e)
      return null
    }
  }

  function getChampionById(id: string): Champion | undefined {
    return champions.value.find(c => c.id.toLowerCase() === id.toLowerCase())
  }

  return { champions, loading, error, fetchChampions, fetchChampionDetail, getChampionById }
}
