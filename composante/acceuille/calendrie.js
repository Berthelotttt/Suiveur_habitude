import React from 'react';
import { StyleSheet, Text, TextComponent, View ,TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import moment from 'moment';
import Swiper from 'react-native-swiper'; 

export default function Calendrier() {
  const swiper = React.useRef();
  const [value,setValue]=React.useState     (new Date());
  const [week,setweek]=React.useState(0);
  const weeks= React.useMemo(()=>{
    const start=moment(start).add(week,'week').startOf('week');
    return [-1,0,1].map(adj => {
      return Array.from({length:7}).map((_,index)=>{
        const date= moment(start).add(adj,'week').add(index,'day')
        return{
          weekday:date.format('ddd'),
          date: date.toDate(),
         // month:date.,
        };
      });
    });
   },[week]);
   return ( 
    <View style={styles.contenaire}> 
      <Swiper index={1} ref={swiper}>
      {weeks.map((dates,index)=> (
              <View style={styles.itemRow} key={index}>
                  {
                    dates.map((item,dateIndex)=>{
                        const isActive = value.toDateString()===item.date.toDateString();
                        return(
                              <TouchableOpacity  onPress={()=> setValue(item.date)} key={dateIndex} 
                              style={[styles.item, isActive && {backgroundColor:'#120194',Color:'#d4d6ea',borderColor:'blue'}]}>
                              
                                
                                  <Text style={[styles.jour]}>{item.weekday}</Text>
                                  <Text style={[styles.journombre]}>{item.date.getDate()}</Text>
                                
                              </TouchableOpacity>
                            );
                        })
                  }
              </View> 
              )
           )}
      </Swiper> 
    </View> 
  )}   
const styles = StyleSheet.create({
  contenaire: {
    flex: 0,  
    height:'20%',
    backgroundColor: '#edecfb', 
    flexDirection:'row', 
    justifyContent:'flex-start',  
    borderTopLeftRadius:30, 
    borderTopRightRadius:30, 
  },
  itemRow: {
    flex: 1,    
    flexDirection:'row', 
    alignItems:'center',
    justifyContent:'center',  
    paddingHorizontal:20,  
  },
item: {
    flex: 0, 
    flexDirection:'column',
    justifyContent:'center', 
    alignItems:'center',
    height:'50%', 
    width:'15%', 
    marginHorizontal:1,
    backgroundColor: '#0b0927', 
    borderRadius: 10, 
    shadowColor:'#0000',
    shadowOffset :{
      with:60,
      height:10,
    },
    shadowOpacity:10,
    shadowRadius:5,
    elevation:10,  
},
jour: {  
  flex:0,
  marginTop:'10%',
  fontSize:15,
  fontWeight:'500',
  color:'#b9b0ca',
},
journombre: { 
  flex:0,
  fontSize:19, 
  fontWeight:'700', 
  color:'#dcd4eb',
},

})
 
