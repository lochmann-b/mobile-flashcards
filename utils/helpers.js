import { normalize, schema } from 'normalizr'
import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'

const NOTIFICATION_KEY = 'BL_MOBILE_FLASHCARDS_NOTIFICATIONS'

export function normalizeDecks(originalData = {}) {
    originalData = originalData || {}
    const card = new schema.Entity('card')
    const decks = new schema.Entity('deck', {
        cards: [card]
    })
    const normalized = normalize(Object.keys(originalData).map(deckId => originalData[deckId]), [decks]);
    return normalized
}

export function generateUID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function clearLocalNotifications() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync())
}

export function setLocalNotification() {
    return AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                return Permissions.askAsync(Permissions.NOTIFICATIONS)
            }
        })
        .then((result) => {
            if (result && result.status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync()
                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                tomorrow.setHours(20)
                tomorrow.setMinutes(0)
                tomorrow.setSeconds(0)
                tomorrow.setMilliseconds(0)

                Notifications.scheduleLocalNotificationAsync(
                    createNotification(),
                    {
                        time: tomorrow,
                        repeat: 'day'
                    }
                )
                return AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
        })
        
}

export function getLocalNotification() {
    return AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
}

export function createNotification() {
    return {
        title: 'Do some quitz',
        body: "Don't forget to do some quitz today",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            sticky: false,
            vibrate: true
        }
    }
}