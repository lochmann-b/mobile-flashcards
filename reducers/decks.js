import { RECEIVE_DECKS, ADD_DECK, DELETE_DECK, RENAME_DECK } from '../actions/decks'
import { ADD_CARD, DELETE_CARD } from '../actions/cards';

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
        case ADD_CARD: {
            const { deckId, card } = action
            return {
                ...state,
                [deckId]: {
                    ...state[deckId],
                    cards: [...state[deckId].cards, card.id]
                }
            }
        }
        case RENAME_DECK: {
            const { deckId, title } = action
            return {
                ...state,
                [deckId]: {
                    ...state[deckId],
                    title
                }
            }
        }
        case DELETE_CARD: {
            const { cardId, deckId } = action
            return {
                ...state,
                [deckId]: {
                    ...state[deckId],
                    cards: state[deckId].cards.filter(id => id !== cardId)
                }
            }
        }
        default:
            return state
    }

}