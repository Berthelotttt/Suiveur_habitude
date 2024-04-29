 import React, { useEffect, useState } from 'react';
import {Modal, LayoutAnimation, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Liste_tache() {
  const [data, setData] = useState({ habitudes: [] });
  const [open_modale1, setopen_modale1] = useState(false);
  var [valeur_index, setvaleur_index] = useState(0);

  const fetchData = async () => {
    try {
      let storedData = await AsyncStorage.getItem('data');
      storedData = storedData ? JSON.parse(storedData) : { habitudes: [] };
      setData(storedData);
      } 
      catch (error) {
      console.error('Error fetching data: ', error);
      }};

  useEffect(() => {
    const intervalId = setInterval(fetchData, 1000); // Rafraîchir toutes les secondes
    return () => clearInterval(intervalId); // Nettoyer l'intervalle lors du démontage du composant
  }, []);
  
  const afficher = (index) => {
    setvaleur_index(index); 
    setopen_modale1(!open_modale1); 
    console.log(valeur_index);};

  return (
    <View style={styles.container}>
      <ScrollView>
        {data.habitudes.map((item, index) => (
          <TouchableOpacity key={item.id} style={styles.item} onPress={() => afficher(index)}>
            <Text style={styles.nom_habit}>{item.nom}</Text>
            <Text>Début:<Text style={styles.date}>{item.date_debut} </Text>
               </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Modal animationType='slide' visible={open_modale1} transparent={true}>
        <View style={styles.modalContent}>
          <View style={styles.info}>
              <Text style={styles.texte_const}>habitude</Text>
              <Text style={styles.nomff}>
                 {(() => {
                      try {
                        return data.habitudes[valeur_index].nom ? data.habitudes[valeur_index].nom : null;
                      } catch (error) {
                        
                        return null;
                      }
                })()}
              </Text>
              <Text style={styles.texte_const}>Motivation</Text>
              <Text style={styles.nomff}>{
                 (() => {
                  try {
                    return data.habitudes[valeur_index].motivation ? data.habitudes[valeur_index].motivation : null;
                  } catch (error) {
                    
                    return null;
                  }
              })()} 
              </Text>
              <Text style={styles.texte_const}>Catégorie</Text>
              <Text style={styles.nomff}>
              {
                 (() => {
                  try {
                    return data.habitudes[valeur_index].categorie? data.habitudes[valeur_index].categorie : null;
                  } catch (error) { 
                    return null;
                  }
              })()}   
              </Text>
              <Text style={styles.texte_const}>heure de commencement</Text>
              <Text style={styles.nomff}>{
                  (() => {
                   try {
                     return data.habitudes[valeur_index].heure_debut? data.habitudes[valeur_index].heure_debut : null;
                   } catch (error) { 
                     return null;
                   }
               })()}  
              </Text>
              <Text style={styles.texte_const}>Date de commencement</Text>
              <Text style={styles.nomff}>{
                (() => {
                  try {
                    return data.habitudes[valeur_index].date_debut? data.habitudes[valeur_index].date_debut : null;
                  } catch (error) { 
                    return null;
                  }
              })()}</Text>  
              <TouchableOpacity onPress={() => setopen_modale1(false)}>
                <Text style={styles.closeButton}>Fermer</Text>
              </TouchableOpacity>
          </View> 
        </View>
      </Modal> 
    </View>
  );
}
/*
<Text style={styles.nomff}>
                {data.habitudes[valeur_index].nom ? data.habitudes[valeur_index].nom : null}
              </Text>
 <Text style={styles.texte_const}>Motivation</Text>
              <Text style={styles.nomff}>{data.habitudes[valeur_index].motivation}</Text>
              <Text style={styles.texte_const}>Catégorie</Text>
              <Text style={styles.nomff}>{data.habitudes[valeur_index].categorie}</Text>
              <Text style={styles.texte_const}>heure de commencement</Text>
              <Text style={styles.nomff}>{data.habitudes[valeur_index].heure_debut}</Text>
              <Text style={styles.texte_const}>Date de commencement</Text>
              <Text style={styles.nomff}>{data.habitudes[valeur_index].date_debut}</Text> 

<Text style={styles.nomff}>{data.habitudes[valeur_index].nom}</Text> 
              <Text style={styles.texte_const}>Motivation</Text>
              <Text style={styles.nomff}>{data.habitudes[valeur_index].motivation}</Text>
              <Text style={styles.texte_const}>Catégorie</Text>
              <Text style={styles.nomff}>{data.habitudes[valeur_index].categorie}</Text>
              <Text style={styles.texte_const}>heure de commencement</Text>
              <Text style={styles.nomff}>{data.habitudes[valeur_index].heure_debut}</Text>
              <Text style={styles.texte_const}>Date de commencement</Text>
              <Text style={styles.nomff}>{data.habitudes[valeur_index].date_debut}</Text> 
*/
const styles = StyleSheet.create({
//------------------page principal--------------------------
  container: {
    flex: 0,
    height:' 50%',
    backgroundColor: '#e9eaf5',
    justifyContent: 'center',
    paddingTop:10,
  },
  nom_habit: {
    fontSize:16,
    fontWeight:'700',
    color:'#262222',
  },
  date: { 
    fontWeight:'700',
    color:'#040e8d',
  }, 
  item: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20,
    marginLeft: '3%',
    marginRight: '3%',
    margin: 2,
    borderColor: '#d3cee8',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    shadowColor:'#0000',
    shadowOffset :{
      with:1,
      height:0.5,
    },
    shadowOpacity:0.2,
    shadowRadius:5,
    elevation:6,  
  }, 
  //----------------------------modal information--------------------------------
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  info: {
    flex:0,
    width:'100%',
    paddingHorizontal:20,
    paddingVertical:20,
    height:'70%', 
    backgroundColor: '#ffffff',
    borderRadius: 20,
  },
  nomff: {
    fontSize: 16,
    fontWeight: '500',
    color: '#515259',
  },
  texte_const:{
    fontSize: 18,
    fontWeight: '700',
    fontStyle:'italic',
    color: '#515259'
  },
  closeButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    flex:0,
    flexDirection:'row',
    alignItems:'center', 
    backgroundColor: '#000000',
    justifyContent:'center',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});
