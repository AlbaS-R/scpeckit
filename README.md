# LoL Champion Explorer SPA

## Descripció del Projecte

L'aplicació **LoL Champion Explorer** és una Single Page Application (SPA) desenvolupada per explorar el catàleg complet de campions de League of Legends. A més d'oferir informació detallada sobre estadístiques, habilitats i la història de cada campió, l'aplicació integra un assistent virtual (chatbot) que recomana campions segons les preferències de l'usuari.

## Tecnologies Utilitzades

- **Framework:** Nuxt 3 (Vue 3)
- **Estils:** Tailwind CSS (amb disseny inspirat en l'estètica Hextech)
- **Backend / Rutes d'API:** Nitro Server Routes
- **Font de dades:** Riot Games Data Dragon API
- **Arquitectura:** Serverless (sense base de dades externa)

## Estructura del Projecte

L'estructura del projecte segueix els estàndards de Nuxt 3 per garantir la netedat i escalabilitat del codi:

- `app-spec/` - Documentació, especificacions i planificació del projecte (Spec-Driven Development).
- `assets/` - Fitxers d'estils i recursos estàtics globals.
- `components/` - Components reutilitzables de Vue (ex. `ChampionCard`, `ChatBot`).
- `composables/` - Funcions i lògica compartida (ex. `useChampions`, `useChatBot`).
- `layouts/` - Dissenys base de les pàgines.
- `pages/` - Vistes de l'aplicació enrutades automàticament (ex. `index.vue` per la graella, `champion/[id].vue` per detalls).
- `server/` - Rutes del backend (ex. proxy per l'API del chatbot).
- `public/` - Fitxers estàtics servits directament.
- `DOCUMENTACIO.md` - Documentació detallada del projecte amb captures de pantalla i casos d'ús.

## Instal·lació i Ús

1. Clona aquest repositori.
2. Instal·la les dependències:
   ```bash
   npm install
   ```
3. Configura les variables d'entorn necessàries (si cal, com `CHATBOT_API_KEY` al `.env`).
4. Inicia el servidor de desenvolupament:
   ```bash
   npm run dev
   ```
5. Obre `http://localhost:3000` al teu navegador.

## Scripts de Construcció

Per generar la versió de producció:
```bash
npm run build
```

Pots iniciar l'aplicació compilada amb:
```bash
node .output/server/index.mjs
```
