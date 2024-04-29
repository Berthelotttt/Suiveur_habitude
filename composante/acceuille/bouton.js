import React, { useState } from 'react';
import {Modal,StyleSheet,  Text, TextInput,View, Button, Platform, TimePickerAndroid,  ScrollView, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Bouton() {
  const[open , setopen] = useState(false);

  const Change_open = () => {
    setopen(!open); 
  };

  
  //-------------------open_date_heure---------------
  var [open_date, setopen_date] = useState(false);
  var [open_time, setopen_time] = useState(false);
  //-------------------------------------------------
  const [nomHabitude, setNomHabitude] = useState('');
  const [categorieHabitude, setCategorieHabitude] = useState('');
  const [motivationHabitude, setMotivationHabitude] = useState(''); 
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  //----------------change open-------------------------
  const Change_opn_date = () => {
    setopen_date(!open_date);
    console.log(open_date);

  };
  const Change_opn_time = () => {
    setopen_time(!open_time);
    console.log(open_time); 
  };
  
  //------------------date_heure-------------------------------
  //--------------------prendre la date----------------
  const DateChange = (date) => {
    setSelectedDate(date);
    console.log(date);
  };
  //-------------prendre l heure----------------
  const TimeChange = (newTime) => {
    console.log(newTime);
    setSelectedTime(newTime);
    Change_opn_time ();
  };
  //------------affiche_date-------------
  const afficherDateSelectionnee = () => {
    console.log('Date sélectionnée :', selectedDate); 
    Change_opn_date();
  };
  //------------affiche_heure-------------
  const afficherheureSelectionnee = () => {
    console.log('heure sélectionnée :', selectedTime);
  };

  //---------------------stockage-----------------------------
  
  //----------enregistrer les informations dans JSON------
  const enregistrerInfo = async () => { 
    let data = await AsyncStorage.getItem('data'); //<--Récupérer les données actuelles du fichier JSON
    console.log(data);
    data = data ? JSON.parse(data) : { habitudes: [] };

  //----------Ajouter une nouvelle habitude---------------
    data.habitudes.push({
      nom: nomHabitude, 
      motivation: motivationHabitude,
      categorie: categorieHabitude,
      heure_debut:selectedTime,
      date_debut: selectedDate
    });

    //------Enregistrer les données mises à jour------------
    await AsyncStorage.setItem('data', JSON.stringify(data));

    //-----Effacer les valeurs sur inputtexte après l'enregistrement-----
   /* setNomHabitude('');
    setMotivationHabitude('');
    setCategorieHabitude(''); 
    selectedTime('');
    setSelectedDate('');*/
    Change_open();
  };

  //-----Fonction pour nettoyer le fichier JSON---------
  const nettoyerFichier = async () => {
    await AsyncStorage.removeItem('data');
  };
  //-----Fonction pour lire le fichier JSON-------------
  const lireFichierJSON = async () => {
    try { 
      const contenuJSON =  await AsyncStorage.getItem('data');//<--Lire le contenu du fichier JSON 
      
      //--Afficher le contenu JSON dans la console
      const donnees = JSON.parse(contenuJSON);
      console.log('Données lues depuis le fichier :', donnees);
    } catch (error) {
      console.error('Erreur lors de la lecture du fichier JSON :', error);
    }
  };
  return (
        <View style={styles.container}>  

          <TouchableOpacity style={styles.button1} onPress={Change_open}>
            <View style={styles.contient_text}> 
              <Text style={styles.texte}>+</Text>
            </View> 
          </TouchableOpacity>

          <Modal animationType='slide' visible={open} transparent={false}>
          <View style={styles.container_modal}>
              <View style={styles.entet_intro}>
                  <View style={styles.intro}>
                      <TouchableOpacity style={styles.Bouton_back} onPress={Change_open}> 
                          <Text style={styles.texte}>{'back'}</Text>  
                      </TouchableOpacity>
                  </View>
              </View>
              <View style={styles.contenu}>
              <ScrollView style={styles.contenu_entre}> 
                        <Text style={styles.label}>Nom de l'habitude :</Text>
                        <TextInput style={styles.input} value={nomHabitude} onChangeText={setNomHabitude} />

                        <Text style={styles.label}>Motivation de l'habitude :</Text>
                        <TextInput style={styles.input} value={motivationHabitude} onChangeText={setMotivationHabitude} />

                        <Text style={styles.label}>Catégorie de l'habitude :</Text>
                        <TextInput style={styles.input}  value={categorieHabitude} onChangeText={setCategorieHabitude}  />
                        
                        <View  style={styles.boite_open}>
                            <TouchableOpacity  style={styles.open_heure} onPress={Change_opn_time}> 
                                  <View >
                                        <Text  style={{fontSize:20,color:"#f9f0f0"}} >heure</Text> 
                                        <Text style={{fontSize:12,color:"#f9f0f0"} } >
                                        {selectedTime.toString()} 
                                        </Text>
                                  </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.open_date} onPress={Change_opn_date}> 
                                  <View style={{flexDirection:'column', alignItems:'center',} } >
                                      <Text style={{fontSize:20,color:"#f9f0f0"} } >date</Text>
                                      <Text style={{fontSize:12,color:"#f9f0f0"} } >
                                        {selectedDate.toString()} 
                                        </Text>
                                  </View>
                            </TouchableOpacity>
                        </View>
                        
                        <Modal animationType='slide' visible={open_time} transparent={true}>
                          <View style={styles.modal_time}>
                              <DatePicker mode='time'   onTimeChange={TimeChange}  style={styles.time}/> 
                          </View> 
                        </Modal> 
                        <Modal animationType='slide' visible={open_date} transparent={true}>
                          <View style={styles.modal_time}>
                          <DatePicker mode='calendar'  onDateChange={DateChange} style={styles.time}/>
                              <Button   title="sélectionnée" onPress={afficherDateSelectionnee} />
                          </View> 
                        </Modal> 
                        
              </ScrollView>
                <View style={styles.buttonContainer}>
                          <Button title="Enregistrer" onPress={enregistrerInfo} /> 
                </View>
              </View>
    </View>
          </Modal> 
        </View> 
      )
    }

const styles = StyleSheet.create({
  container: {
    flex: 0,
    height:'10%',
    backgroundColor:  '#edecfb', 
    paddingLeft:'80%',
    paddingRight:'2%',
    paddingTop:'2%',
    paddingBottom:'2%',
    justifyContent:'center',
  },
  button1: {
    flex: 1, 
    height:'10%',  
    backgroundColor:'#061a6b',  
    paddingTop:'17%',
    paddingLeft:'5%',
    shadowOffset:5,
    shadowOpacity:100,
    elevation:5, 
    borderRadius:40,

  },
  contient_text: {  
    flex: 1,   
    justifyContent:'center',
    alignItems:'center',
  },
  texte: {  
    flex: 1,  
    fontSize:20,
    color:'#fdfcff',
  },
  /*------------------*/
  container_modal: {
    height:'100%',
    flex: 0,
    flexDirection:'column',
    backgroundColor: '#0686b5', 
  }, 
  entet_intro: {
    height:'15%',
    backgroundColor: '#edecfb',
    fontSize: 16,
    fontWeight: 'bold', 
  },
  intro: { 
    flex:0,
    justifyContent:'flex-start',
    height:'100%',
    backgroundColor:'#0686b5', 
    borderBottomRightRadius :90,  

  },
  Bouton_back: { 
    flex:0,
    margin:15,
    alignItems:'center',
    paddingTop: '1%',
    height:'40%',
    width:'25%',
    backgroundColor:'#121753', 
    borderRadius :90, 
    borderWidth: 1, 
    borderColor:'#c2c4e0',
    shadowColor:'#0000',
    shadowOffset :{
      with:2,
      height:2,
    },
    shadowOpacity:0.8,
    shadowRadius:5,
    elevation:6,

  },
  contenu: {
    height:'90%',
    flex:0,
    flexDirection:'column',
    paddingTop: '10%',
    paddingLeft: '4%',
    paddingRight: '4%', 
    backgroundColor: '#edecfb', 
    borderTopLeftRadius: 80,
  },
  contenu_entre:{
    height:'70%',
    backgroundColor:'#edecfb',
  },
  buttonContainer: { 
    height:'10%',  
    flex:0,
    marginTop:'5%',
    backgroundColor: '#edecfb', 
    marginBottom:'12%',
 
  },
  entre: {
    paddingBottom: '5%',
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: '5%',
    marginBottom: '3%',
    color: '#1e1f31',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    height: 45,
    padding: 5,
    borderColor: '#930e55',
  }, 
 
  button: {
    flex:0,
    height:'40%',
    borderRadius:5, 
    justifyContent: 'space-around',
   
  },
  modal_time: {
    flex:1,
    justifyContent:'center',
    margin:50,
   
  },
  time: {
    borderRadius:20,
    shadowColor:'#0000',
    shadowOffset :{
      with:1,
      height:2,
    },
    shadowOpacity:0.6,
    shadowRadius:5,
    elevation:6,
  },
  boite_open: {
    flex:1,
    height:70, 
    backgroundColor: '#edecfb',
    flexDirection:'row',
    justifyContent:'space-between' ,  
    marginTop:'10%',
    marginBottom:'5%',
    marginLeft:20,
    marginRight :20,
  },
  open_heure:{ 
    flex:1,
    width:80, 
    height:'100%', 
    alignItems:'center',
    backgroundColor:'#a11960',   
    paddingTop:20,  
    borderRadius:20,
    shadowColor:'#0000',
    shadowOffset :{
      with:1,
      height:2,
    },
    shadowOpacity:0.6,
    shadowRadius:5,
    elevation:6,
    marginRight:'10%',
    
  },
  open_date:{  

    flex:1,
    width:80, 
    height:'100%',  
    backgroundColor:'#a11960',  
    paddingTop:20,  
    borderRadius:20,
    shadowColor:'#0000',
    
    shadowOffset :{
      with:1,
      height:2,
    },
    shadowOpacity:0.6,
    shadowRadius:5,
    elevation:6,
  },
})
 