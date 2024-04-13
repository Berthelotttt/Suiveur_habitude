import React from 'react';
import { TouchableOpacity, StyleSheet, Text, TextComponent, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Text_liste() {

  const nettoyerFichier = async () => {
    await AsyncStorage.removeItem('data');
  };
  
      return (
        <View style={styles.container}> 
          <Text style={styles.titre}>Liste des habitudes</Text>
          <View   style={styles.boite_eff}>
            <TouchableOpacity style={styles.but_eff}  onPress={nettoyerFichier}>
              <Text style={styles.text_eff}>Effacer</Text>
            </TouchableOpacity>
      </View>
        </View> 
      )
      
    

}
const styles = StyleSheet.create({
  container: {
    flex: 0,  
    height:'5%',
    backgroundColor: '#edecfb', 
    flexDirection:'row',
    justifyContent:'space-between',
    paddingLeft:'3%',
    paddingRight:'3%'
  },
  titre: {
   fontSize:15, 
   fontWeight:'700',

   
  },
  boite_eff: {
    flex: 0,
    width:'50%',    
    flexDirection:'row',
    justifyContent:'flex-end',
     
  },
  but_eff: {
    flex: 0,
    width:'50%', 
    paddingLeft:10, 
    backgroundColor:'#650808',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 10,
  },
  text_eff: {
    color:'#dfcfcf',
    fontSize: 16,
    fontWeight: '500',
  }
})
 