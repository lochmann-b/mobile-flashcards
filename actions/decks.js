import { loadInitialData } from '../utils/api'
import { getAllDecks } from '../utils/api'
import { updateCardWithId } from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECK'
export const UPDATE_CARD = 'UPDATE_CARD'


function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

function updateCard(card) {
    return {
        type: UPDATE_CARD,
        card
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