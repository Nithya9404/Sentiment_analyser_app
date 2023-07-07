import { StyleSheet, Text, View,Button } from 'react-native';
import {styles} from './styles/styles';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './screens/Login';
import CreateAccount from './screens/Createaccount';
import SentimentAnalysisApp from './screens/SentimentAnalysis';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen}></Stack.Screen>
        <Stack.Screen name='Create Account' component={CreateAccount}></Stack.Screen>
        <Stack.Screen name='Login' component={Login}></Stack.Screen>
        <Stack.Screen name='Sentiment' component={SentimentAnalysisApp}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
  } 
  function HomeScreen({navigation}){
    return(
<View style={styles.container}>
  <Text style={styles_sheet.input}>Welcome to the Sentiment Analysing Application</Text>
  <View style={styles_sheet.spacing}></View>
  <Text style={styles_sheet.textinput}>You have made right choice</Text>
  <View style={styles_sheet.spacing}></View>
  <Text style={styles_sheet.textinput}>You can analyse the sentiment by just one click</Text>
  <View style={styles_sheet.spacing}></View>
  <Button title="Create Account" style={styles.button} onPress={() => navigation.navigate('Create Account')}></Button>
  <View style={styles_sheet.spacing}></View>
  <Button title="Login" style={styles.button} onPress={() => navigation.navigate('Login')}></Button>
</View>
    );
  }


const styles_sheet = StyleSheet.create({
  input:{
    fontSize:20,
    fontWeight:'bold',
  },
  spacing:{height:20},
 textinput:{fontSize:17,}
});
