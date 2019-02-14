import { AsyncStorage } from 'react-native'
import {formatDecks, generateInitialData } from './Decks'

const STORAGE_KEY = 'BL_MOBILE_FLASHCARDS'

export function loadInitialData() {
    const dataAsJson =  JSON.stringify(generateInitialData())    
    return AsyncStorage.mergeItem(STORAGE_KEY, dataAsJson).then( () => getAllDecks())
    
}

export function getAllDecks() {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then(formatDecks)
}


export function submitEntry({ entry, key }) {
    return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
        [key]: entry
    }))
}


export function removeEntry(key) {
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
        .then(result => {
            const data = JSON.parse(result)
            data[key] = undefined
            delete data[key]
            AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
        })
}