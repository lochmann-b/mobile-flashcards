import { AsyncStorage } from 'react-native'
import { formatDecks, generateInitialData } from './Decks'
import { getDeckIdFromCardId } from './helpers';

const STORAGE_KEY = 'BL_MOBILE_FLASHCARDS'

export function loadInitialData() {
    const dataAsJson =  JSON.stringify(generateInitialData())    
    return AsyncStorage.mergeItem(STORAGE_KEY, dataAsJson).then( () => getAllDecks())
    
}

export function getAllDecks() {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then(formatDecks)
}


export function getCard(cardId) {
    const deckId = getDeckIdFromCardId(cardId);
    return AsyncStorage.getItem(STORAGE_KEY)
        .then(data => {
            decks = JSON.parse(data)
            deck = decks[deckId]
            card = deck.cards[cardId]
            return card
        })
}

export function updateCardWithId(cardId, question, answer) {
    return AsyncStorage.getItem(STORAGE_KEY)
    .then(result => {        
        const decks = JSON.parse(result)        
        const deckId = getDeckIdFromCardId(cardId);        
        const deck = decks[deckId]        
        const cards = deck.cards
        cards[cardId] = Object.assign(cards[cardId], {question: question, answer: answer})
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
    })
    .then( () => getCard(cardId))
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