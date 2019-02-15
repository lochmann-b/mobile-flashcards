import { RECEIVE_DECKS, UPDATE_CARD } from '../actions/decks'
import { getDeckIdFromCardId } from '../utils/helpers' // pure function

export default function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return { ...state, ...action.decks }
        case UPDATE_CARD:
            const deckId = getDeckIdFromCardId(action.card.id)
            return {
                ...state,
                [deckId]: {
                    ...state[deckId],
                    cards: {
                        ...state[deckId].cards,
                        [action.card.id]: {...action.card}
                    }
                    
                }
            }
        default:
            return state

    }

}