import { updateCardWithId } from '../utils/api'

export const UPDATE_CARD = 'UPDATE_CARD'

function updateCard(card) {
    return {
        type: UPDATE_CARD,
        card
    }
}

export function handleUpdateCard(cardId, question, answer) {
    return dispatch => {
        return updateCardWithId(cardId, question, answer)
            .then(card => { dispatch(updateCard(card)) })
    }
}