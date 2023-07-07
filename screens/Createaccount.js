import {Text,View,StyleSheet, TextInput,Button} from 'react-native';
import Ajv from 'ajv';
import lexicon from '../lexicons/createaccount.json';
import axios from 'axios';
import { useState } from 'react';
import {styles} from '../styles/styles';

const CreateAccount = () => {
    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [error, seterror] = useState('');

    const handleAccount = async () => {
        const ajv = new Ajv();
        ajv.addFormat('email', /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/);
    
        const validate = ajv.compile(lexicon.defs.main.input.schema);
    
        const formData = {
          username:username,
          email: email,
          password: password
        };
    
        const isValid = validate(formData);
    
        if (isValid) {
          try {
            // Send a POST request to the /accounts endpoint
            await axios.post('http://localhost:3000/chat_accounts', formData);
            setusername('');
            setemail('');
            setpassword('');
            seterror('');
            navigation.navigate('Home');
          } catch (error) {
            seterror('Failed to create account');
            console.error(error);
          }
        } else {
          const validationErrors = validate.errors;
          const errorMessage = validationErrors.map(error => error.message).join('\n');
          seterror(errorMessage);
        }
      };

    return(
<View style={styles.container}>
    <Text style={styles_sheet.input}>Create an account to analyse the sentiment</Text>
    <View style={styles_sheet.spacing}></View>
    <TextInput placeholder='Username' value={username} onChangeText={setusername}/>
        <View style={styles_sheet.spacing}></View>
        <TextInput placeholder='Email' value={email} onChangeText={setemail}/>
        <View style={styles_sheet.spacing}></View>
        <TextInput placeholder='Password' value={password} onChangeText={setpassword}/>
        <View style={styles_sheet.spacing}></View>
        <Button title='Create Account' style={styles.button} onPress={handleAccount}/>
</View>
    );
};
export default CreateAccount;

const styles_sheet = StyleSheet.create({
input:{
    fontSize:20,
    fontWeight:'bold'
},
spacing:{height:20}
});

