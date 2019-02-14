import { loadInitialData } from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECK'


export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function handleLoadDummyDecks() {
    return (dispatch) => {
        return loadInitialData()
            .then( decks => dispatch(receiveDecks(decks)))
    }
}