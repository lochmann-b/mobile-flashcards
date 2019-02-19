import { RECEIVE_DECKS, ADD_DECK, DELETE_DECK } from '../actions/decks'
import { UPDATE_CARD, ADD_CARD, DELETE_CARD } from '../actions/cards'

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
                //a deck, for now, is created without cards. Could be change in the future
                ...state, ...action.deck.cards
            }
        case DELETE_DECK:
            deletedCardIDs = new Set(action.deck.cards)
            return Object.keys(state)
                .filter(cardId => deletedCardIDs.has(cardId))
                .reduce((acc, cur) => ({ ...acc, [cur]: state[cur] }), {})
        case ADD_CARD:
            const { card } = action
            return { ...state, [card.id]: card }
        case DELETE_CARD: {
            const { cardId } = action
            return Object.keys(state)
                .filter(id => id !== cardId)
                .reduce((acc, cur) => ({ ...acc, [cur]: state[cur] }), {})
        }
        default:
            return state

    }

}