import React from 'react';
import { StyleSheet, Text, TextComponent, View } from 'react-native'

class Titre extends React.Component{
    render(){ 
      return (
        <View style={styles.container}> 
          <Text style={styles.titre}>Mon habitude</Text>
        </View> 
      ) 
    } 
}
const styles = StyleSheet.create({
  container: {
    flex: 0,  
    height:'15%',
    backgroundColor: '#001755', 
    paddingLeft:'5%',
    justifyContent:'flex-end', 
  },
  titre: {
   fontSize:32, 
   fontWeight:'700',
   fontStyle:'italic', 
   color:'#5dd9ff',
   
  }
})

export default Titre