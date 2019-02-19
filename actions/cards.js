import { updateCardWithId, createCard } from '../utils/api'

export const UPDATE_CARD = 'UPDATE_CARD'
export const ADD_CARD = 'ADD_CARD'

function updateCard(card) {
    return {
        type: UPDATE_CARD,
        card
    }
}

function addCard(card, deckId) {
    return {
        type: ADD_CARD,
        card,
        deckId
    }
}

export function handleUpdateCard(cardId, question, answer) {
    return dispatch => {
        return updateCardWithId(cardId, question, answer)
            .then(card => { dispatch(updateCard(card)) })
    }
}

export function handleAddCard(deckId, question, answer) {
    return dispatch => {
        return createCard(deckId, question, answer)
            .then(card => { dispatch(addCard(card, deckId)) })
    }
}