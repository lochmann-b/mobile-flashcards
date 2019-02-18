import { RECEIVE_DECKS, ADD_DECK, DELETE_DECK } from '../actions/decks'
import { UPDATE_CARD } from '../actions/cards'

export default function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return { ...state, ...action.decks.entities.card }
        case UPDATE_CARD:
            return {
                ...state,
                [action.card.id]: { ...action.card }
            }
        case ADD_DECK:
            return {
                ...state, ...action.deck.cards
            }
        case DELETE_DECK:
            deletedCardIDs = new Set(action.deck.cards)
            return Object.keys(state)
                .filter(cardId => deletedCardIDs.has(cardId))
                .reduce((acc, cur) => ({ ...acc, [cur]: state[cur] }), {})
        default:
            return state

    }

}