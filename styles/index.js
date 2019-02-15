import { StyleSheet } from 'react-native'

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

  cardTable: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: moss,
  },

  card: {
    alignItems: 'center',
    flex: 1,
    alignSelf: 'center',
    backgroundColor: white,
    padding: 20,
    aspectRatio: 63 / 88, //poker card
    width: 150,
    borderRadius: 10,
    borderColor: gray,
    borderWidth: 1,
  },

  deleteButton: {
    color: white,
    marginLeft: 15
  },

  editButton: {
    color: white,
    marginRight: 15
  },

  cardsList: {
    flexGrow: 1,
    justifyContent: 'center'
  }

});

export default styles