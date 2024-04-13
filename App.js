import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native' 
import AsyncStorage from '@react-native-async-storage/async-storage'
import Titre from './/composante//acceuille//titre'
import Liste_tache from './/composante//acceuille//liste_tache'
import Calendrier from './/composante//acceuille//calendrie'
import Bouton from './/composante//acceuille//bouton'
import Text_liste from './/composante//acceuille//Text_liste'
//import {openDatabase} from 'react-native-sqlite-storage';
 
export default function App() {

  return (
   <View style={styles.container}> 
      <Titre/>
       <Calendrier/>
       <Text_liste/>
       <Liste_tache/>
       <Bouton/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { 
    flexDirection:'column',  
    backgroundColor:'#001755',   
  },
}); 

/*
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Titre from './/composante//acceuille//titre'
import Liste_tache from './/composante//acceuille//liste_tache'
import Calendrier from './/composante//acceuille//calendrie'
import Bouton from './/composante//acceuille//bouton'
import Text_liste from './/composante//acceuille//Text_liste'
import Database from './/composante//ajout_habit//ajoute' 
 
export default function App() {
  return (
   <View style={styles.container}> 
       <Titre/>
       <Calendrier/>
       <Text_liste/>
       <Liste_tache/>
       <Bouton/>
       
    </View>
  );
}
const styles = StyleSheet.create({
  container: { 
    flexDirection:'column',  
    backgroundColor:'#0d0221',   
  },
}); 


*/