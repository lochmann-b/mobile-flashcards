import {StyleSheet} from 'react-native'

const moss = '#0a381f'
const white = '#ffffff'
const gray = '#696972'
const red = '#ff0000'

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
      alignItems:'center',   
      flex: 1,
      alignSelf: 'center',
      backgroundColor: white,      
      padding: 20,
      aspectRatio: 63/88, //poker card
      width: 150,
      borderRadius: 10,
      borderColor: gray,
      borderWidth: 1,
    }

  });

export default styles