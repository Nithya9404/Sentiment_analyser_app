import { useState } from 'react';
import {View,Text,StyleSheet,TextInput, Alert, Button} from 'react-native';
import {styles} from '../styles/styles';


export default function Login({navigation}){
    
    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const handleLogin = async () =>{
        try{
        const response = await fetch('http://localhost:3000/chat_accounts/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
        
      if(response.ok){
            Alert.alert('Successfully Login',data.message);
            await navigation.navigate('Sentiment');
          }
          else{
            Alert.alert('Unable to login. Please try later',data.message);
          }
        }
        catch(error){
            console.error('An error occured during the login');
            Alert.alert('Error');
        }
    };

    return(
   <View style={styles.container}>
    <Text style={styles_sheet.input}>Just one more step to analyse</Text>
     <View style={styles.spacing}></View>
     <View>
        <TextInput placeholder='Username' value={username} onChangeText={setusername}/>
        <View style={styles_sheet.spacing}></View>
        <TextInput placeholder='Email' value={email} onChangeText={setemail}/>
        <View style={styles_sheet.spacing}></View>
        <TextInput placeholder='Password' value={password} onChangeText={setpassword}/>
        <View style={styles_sheet.spacing}></View>
        <Button title='Login' style={styles.button} onPress={handleLogin}/>
     </View>
   </View>
    );
}

const styles_sheet = StyleSheet.create({
input:{
fontSize:30,
fontWeight:'bold',
},
spacing:{height:20}
});