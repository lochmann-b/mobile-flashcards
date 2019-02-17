import { normalize, schema } from 'normalizr'

export function normalizeDecks(originalData) {
    const card = new schema.Entity('card')
    const decks = new schema.Entity('deck', {
        cards: [card]
    })
    const normalized = normalize(Object.keys(originalData).map(deckId => originalData[deckId]), [ decks ]);
    return normalized
} 