import { RECEIVE_DECKS, ADD_DECK, DELETE_DECK } from '../actions/decks'

export default function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return { ...state, ...action.decks.entities.deck }
        case ADD_DECK:
            return { ...state, [action.deck.id]: action.deck }
        case DELETE_DECK:
            return Object.keys(state)
                .filter(deckId => deckId !== action.deck.id)
                .reduce((acc, cur) => ({ ...acc, [cur]: state[cur] }), {})
        default:
            return state
    }

}