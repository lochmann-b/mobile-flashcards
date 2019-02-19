import { StyleSheet } from 'react-native'
import { red } from 'ansi-colors';

export const moss = '#0a381f'
export const white = '#ffffff'
export const gray = '#696972'
export const black = '#000000'

const styles = StyleSheet.create({

  title: {
    color: white,
    fontSize: 20,
    margin: 5
  },

  form: {
    flex: 1,
    alignItems: 'stretch',
    padding: 20,
    backgroundColor: moss,
  },

  textButton: {
    color: black,
    padding: 10,
    borderColor: white,
    margin: 2,
    width: 120,
    borderWidth: 1,
    borderRadius: 2
  },

  cardTable: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: moss,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: moss,
  },

  card: {
    backgroundColor: white,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    aspectRatio: 63 / 88, //poker card
    width: 150,
    borderRadius: 10,
    borderColor: gray,
    borderWidth: 1,
  },

  deckTitle: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold'
  },

  numOfCards: {
    alignSelf: 'center',
    paddingTop: 20
  },

  deleteButton: {
    color: white,
    marginLeft: 15
  },

  editButton: {
    color: white,
    marginRight: 15
  },

  listContent: {
    flexGrow: 1,
    justifyContent: 'center'
  },

  question: {
    alignSelf: 'center'
  },

  answer: {
    alignSelf: 'center'
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: white,
    borderRadius: 5,
    padding: 5,
    margin: 5,
    color: white,   
  },
});

export default styles