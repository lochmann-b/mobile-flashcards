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
            timestamp: 1518122597860,
            cards: {
                deck01_card01: {
                    id: 'deck01_card01',
                    timestamp: 1518122597861,
                    question: 'Question Card 1',
                    answer: 'Answer Card 1'
                },

                deck01_card02: {
                    id: 'deck01_card02',
                    timestamp: 1518122597862,
                    question: 'Question Card 2',
                    answer: 'Answer Card 2'
                },

                deck01_card03: {
                    id: 'deck01_card03',
                    timestamp: 1518122597863,
                    question: 'Question Card 3',
                    answer: 'Answer Card 3'
                }, 

                deck01_card04: {
                    id: 'deck01_card04',
                    timestamp: 1518122597864,
                    question: 'Question Card 4',
                    answer: 'Answer Card 4'
                }
            }
        }, 
        
        'deck02': {
            id: 'deck02',
            timestamp: 1518122597865,
            title: 'Italian For Germans',
            cards: {
                deck02_card01: {
                    id: 'deck02_card01',
                    timestamp: 1518122597866,
                    question: 'Ich nehme',
                    answer: 'Io prendo'
                },

                deck02_card02: {
                    id: 'deck02_card02',
                    timestamp: 1518122597867,
                    question: 'Ich spiele',
                    answer: 'Io gioco'
                },

                deck02_card03: {
                    id: 'deck02_card03',
                    timestamp: 1518122597868,
                    question: 'Ich schreibe',
                    answer: 'Io scrivo'
                }, 

                deck02_card04: {
                    id: 'deck02_card04',
                    timestamp: 1518122597869,
                    question: 'Ich lösche',
                    answer: 'Io cancello'
                },
                deck02_card05: {
                    id: 'deck02_card05',
                    timestamp: 1518122597870,
                    question: 'Ich lese',
                    answer: 'Io leggo'
                },
                deck02_card06: {
                    id: 'deck02_card06',
                    timestamp: 1518122597871,
                    question: 'Ich male',
                    answer: 'Io coloro'
                },
                deck02_card07: {
                    id: 'deck02_card07',
                    timestamp: 1518122597872,
                    question: 'Ich sehe fern',
                    answer: 'Io guardo la televisione'
                },
                deck02_card08: {
                    id: 'deck02_card08',
                    timestamp: 1518122597873,
                    question: 'Ich zeichne',
                    answer: 'Io disegno'
                },
                deck02_card09: {
                    id: 'deck02_card09',
                    timestamp: 1518122597874,
                    question: 'Ich schlafe',
                    answer: 'Io dormo'
                },
                deck02_card10: {
                    id: 'deck02_card10',
                    timestamp: 1518122597875,
                    question: 'Ich grüße',
                    answer: 'Io saluto'
                },
                deck02_card11: {
                    id: 'deck02_card11',
                    timestamp: 1518122597876,
                    question: 'Ich schliesse',
                    answer: 'Io chiudo'
                },
                deck02_card12: {
                    id: 'deck02_card12',
                    timestamp: 1518122597877,
                    question: 'Ich öffne',
                    answer: 'Io apro'
                }

            }
        }
    }
}