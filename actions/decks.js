import { loadInitialData, getAllDecks, updateCardWithId, saveDeck } from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECK'
export const ADD_DECK = 'ADD_DECKS'



function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

function addDeck(deck) {
        return {
            type: ADD_DECK,
            deck
        }
}

export function handleLoadDecks() {
    return dispatch => {
        return getAllDecks()
            .then(decks => dispatch(receiveDecks(decks)))
    }
}


export function handleLoadDummyDecks() {
    return dispatch => {
        return loadInitialData()
            .then(decks => dispatch(receiveDecks(decks)))
    }
}

export function handleUpdateCard(cardId, question, answer) {
    return dispatch => {
        return updateCardWithId(cardId, question, answer)
            .then(card => dispatch(updateCard(card)))
    }
}

export function handleAddDeck(deckTitle) {
    return dispatch => {
        return saveDeck(deckTitle)
        .then( deck => dispatch(addDeck(deck)))
    }
}