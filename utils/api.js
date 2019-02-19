import { AsyncStorage } from 'react-native'
import { formatDecks, generateInitialData } from './Decks'
import { generateUID } from './helpers'

const STORAGE_KEY = 'BL_MOBILE_FLASHCARDS'


function getDeckOfCard(cardId) {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then(data => {
            decks = JSON.parse(data)
            for (const deckId of Object.keys(decks)) {
                if (decks[deckId].cards[cardId]) {
                    return decks[deckId]
                }
            }
            return null
        })
}



export function reset() {
    return AsyncStorage.removeItem(STORAGE_KEY)
}

export function loadInitialData() {
    const dataAsJson = JSON.stringify(generateInitialData())
    return AsyncStorage.mergeItem(STORAGE_KEY, dataAsJson).then(() => getAllDecks())

}

export function getAllDecks() {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then(formatDecks)
}

export function updateCardWithId(cardId, question, answer) {
    return getDeckOfCard(cardId).then(deck => {
        console.log('found deck ', deck)
        const newCard = Object.assign(deck.cards[cardId], { question, answer })
        deck.cards[cardId] = newCard
        AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({ [deck.id]: deck }))
        return newCard
    })
}

export function saveDeck(title) {
    deck = {
        title,
        id: generateUID(),
        timestamp: Date.now(),
        cards: []
    }
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({ [deck.id]: deck })).then(() => deck)
}

export function removeDeck(deckId) {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then(result => {
            const decks = JSON.parse(result)
            decks[deckId] = undefined
            delete decks[deckId]
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
        })
}

export function createCard(deckId, question, answer) {
    const newCard = {
        id: generateUID(),
        timestamp: Date.now(),
        question,
        answer
    }

    return AsyncStorage.getItem(STORAGE_KEY)
        .then(result => {
            const decks = JSON.parse(result)
            console.log(deckId)
            decks[deckId].cards = {
                ...decks[deckId].cards,
                [newCard.id]: newCard
            }
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
        }).then( () => newCard)
}

/*

export function removeEntry(key) {
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
        .then(result => {
            const data = JSON.parse(result)
            data[key] = undefined
            delete data[key]
            AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
        })
}*/