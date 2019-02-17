import { normalizeDecks } from './helpers'

export function formatDecks(decks) {
    //returns a normalized representation of the decks
    return normalizeDecks(JSON.parse(decks))
}

export function generateInitialData() {
    return {
        'deck01': {
            id: 'deck01',
            title: 'Title Deck 1',
            cards: {
                deck01_card01: {
                    id: 'deck01_card01',
                    question: 'Question Card 1',
                    answer: 'Answer Card 1'
                },

                deck01_card02: {
                    id: 'deck01_card02',
                    question: 'Question Card 2',
                    answer: 'Answer Card 2'
                },

                deck01_card03: {
                    id: 'deck01_card03',
                    question: 'Question Card 3',
                    answer: 'Answer Card 3'
                }, 

                deck01_card04: {
                    id: 'deck01_card04',
                    question: 'Question Card 4',
                    answer: 'Answer Card 4'
                }
            }
        }, 
        
        'deck02': {
            id: 'deck02',
            title: 'Title Deck 2',
            cards: {
                deck02_card01: {
                    id: 'deck02_card01',
                    question: 'Question Card 1',
                    answer: 'Answer Card 1'
                },

                deck02_card02: {
                    id: 'deck02_card02',
                    question: 'Question Card 2',
                    answer: 'Answer Card 2'
                },

                deck02_card03: {
                    id: 'deck02_card03',
                    question: 'Question Card 3',
                    answer: 'Answer Card 3'
                }, 

                deck02_card04: {
                    id: 'deck02_card04',
                    question: 'Question Card 4',
                    answer: 'Answer Card 4'
                }
            }
        }
    }
}