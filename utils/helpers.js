import { normalize, schema } from 'normalizr'

export function normalizeDecks(originalData = {}) {
    originalData = originalData || {}
    console.log('original data', originalData)
    const card = new schema.Entity('card')
    const decks = new schema.Entity('deck', {
        cards: [card]
    })
    const normalized = normalize(Object.keys(originalData).map(deckId => originalData[deckId]), [ decks ]);
    return normalized
} 

export function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }