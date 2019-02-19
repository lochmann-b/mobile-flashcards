import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, FlatList, TextInput, Button } from 'react-native'
import CardTile from './CardTile'
import styles from '../styles'
import EditableListItem from './EditableListItem';
import AddButton from './AddButton'
import DeckTitle from './DeckTitle'
import { handleRenameDeck } from '../actions/decks';

class EditDeck extends Component {

    state = {
        deckTitle: this.props.deck.title
    }

    onTextChanged = deckTitle => {
        this.setState({
            deckTitle
        })
    }

    handleUpdate = () => {
        const { dispatchRenameDeck, deck } = this.props
        const { deckTitle } = this.state

        dispatchRenameDeck(deck.id, deckTitle).then( () => {
            this.props.navigation.setParams({
                ...this.props.navigation.params,
                deckTitle:deckTitle,
            });
        })

    }

    static navigationOptions = ({ navigation }) => {
        const deckTitle = navigation.getParam('deckTitle')
        return {
            title: `Edit deck ${deckTitle}`,
            headerRight: (
                <AddButton onPress={navigation.getParam('onAddCard')} />
            ),
        }
    }

    onAddCard = () => {
        const { navigation, deck } = this.props
        navigation.navigate('EditCard', { deckId: deck.id })
    }

    componentDidMount() {
        this.props.navigation.setParams({
            ...this.props.navigation.params,
            onAddCard: this.onAddCard,
        });
    }

    renderCardTile = (cardId) => {
        const { navigate } = this.props.navigation
        const { cards } = this.props
        const card = cards[cardId]
        return (
            <EditableListItem
                onEdit={() => navigate('EditCard', { cardId: cardId })} style={styles.editButton}
                onDelete={() => navigate('DeleteCard', { cardId: cardId })} style={styles.deleteButton}>
                <CardTile question={card.question} answer={card.answer} />
            </EditableListItem>
        )
    }

    render() {
        const { deck } = this.props
        const listData = deck.cards.map(key => ({ key }))
        const { deckTitle } = this.state
        return (
            <View style={styles.cardTable}>
                <DeckTitle
                    value={deckTitle}
                    onTextChanged={this.onTextChanged}
                    onSubmit={this.handleUpdate}
                    buttonText='Update'
                />
                <FlatList
                    contentContainerStyle={styles.listContent}
                    data={listData}
                    renderItem={({ item }) => this.renderCardTile(item.key, deck.id)}
                />
            </View>
        )
    }
}


function mapStateToProps({ decks, cards }, { navigation }) {
    const deckId = navigation.getParam('deckId');
    const deck = decks[deckId]
    return {
        deck,
        cards: deck.cards.reduce((acc, cur) => ({ ...acc, [cur]: cards[cur] }), {})
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchRenameDeck: (deckId, title) => dispatch(handleRenameDeck(deckId, title))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDeck);