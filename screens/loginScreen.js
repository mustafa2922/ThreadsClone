import { View, Text, StyleSheet, Image, KeyboardAvoidingView, TextInput, Pressable, ScrollView } from "react-native"
import LoginImage from '../assets/images/loginImage.png'
import { useEffect, useState } from "react"
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Toast from "react-native-toast-message";
import LoadingImage from '../assets/images/loading.gif';
import FastImage from 'react-native-fast-image';
import AsyncStorage from "@react-native-async-storage/async-storage";


// Functions for storing and getting data from AsynStorage

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log("Token saved in async storage")
  } catch (error) {
    console.log('Error storing value: ', error);
  }
};

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log('Error retrieving value: ', error);
  }
};

function LoginScreen() {

  useEffect(() => {

    const fetchData = async () => {
      try {
        const token = await getData('authToken');
        if (token) {
          navigation.navigate("Main");
        }
      } catch (error) {
        console.log("Error in getting token", error);
      }
    };

    // fetchData();

  }, [])

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigation = useNavigation();
  const [buttonColor, setButtonColor] = useState('#0a42ec');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailCheck, setEmailCheck] = useState(null)

  const checkEmail = (txt) => {
    if (txt.trim() == '') {
      setEmailCheck(null)
    }
    else if (emailRegex.test(txt)) {
      setEmailCheck(true)
    }
    else {
      setEmailCheck(false)
    }
  }

  const handleLogin = () => {
    setLoading(true);
    if (buttonColor == '#0a42ec') {
      setButtonColor('#04278f')
    }
    else {
      setButtonColor('#0a42ec')
    }

    const userObj = {
      email: email,
      password: password
    }

    if (emailCheck) {

      axios.post('http://192.168.0.127:8000/api/user/login', userObj)
        .then(async (res) => {
          Toast.show({
            type: 'success',
            text1: 'Login Successfull',
            text2: 'Say Hello To World 👋',
          });

          console.log("Login Successful - Status Code:", res.status);
          console.log("Response Data:", res.data);

          const token = res.data.token;

          await storeData('authToken', token);

          navigation.navigate("Main");

          setEmail('');
          setEmailCheck(null);
          setPassword('');
          setLoading(false);

        })
        .catch((error) => {
          console.log("Error Occured ---> ", error);
          const errMsg = error.response.data.message;
          if (errMsg == "Incorrect Password") {
            Toast.show({
              type: 'error',
              text1: errMsg,
              text2: "Please enter a correct password"
            });
          }
          if (errMsg == "User does not exist") {
            Toast.show({
              type: 'error',
              text1: errMsg,
              text2: "You are not Registered, Please register to start "
            });
          }
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        })
    }
    else {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please enter valid information in all fields.',
      });
      setLoading(false);
    }

  }

  const [password, setPassword] = useState('');


  return (
    <ScrollView contentContainerStyle={styles.container} >

      <View style={styles.imageContainer}>
        <Image style={styles.image} source={LoginImage} />
      </View>

      <KeyboardAvoidingView>

        <View style={styles.textContainer} >
          <Text style={styles.txt} > Login to your Account </Text>
        </View>

        <View style={styles.fieldsContainer} >

          <View style={{ borderWidth: 1, borderColor: "#0a42ec", borderRadius: 20, flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', paddingRight: 5 }}>
            <TextInput style={{ fontSize: 15, paddingHorizontal: 6, color: '#000', fontFamily: 'serif', width: 280, overflow: 'scroll' }} placeholder="Enter Your email" placeholderTextColor='#a6a6a6' value={email} onChangeText={(txt) => { setEmail(txt); checkEmail(txt); }} />
            {emailCheck == null ? null : emailCheck ? <Feather name="check-circle" size={20} color="green" /> : <MaterialIcons name='error-outline' color='red' size={20} />}
          </View>

          <View style={styles.passwordContainer}>
            <TextInput style={styles.password} placeholder="Enter Your password" placeholderTextColor='#a6a6a6' value={password} onChangeText={(txt) => { setPassword(txt) }} />
          </View>

        </View>

        <View style={styles.actions} >
          <Text style={{
            color: '#000', fontFamily: 'serif'
          }} > Keep me Logged in </Text>
          <Text style={{ color: '#0a42ec', textDecorationLine: 'underline', fontFamily: 'serif' }} > Forget Password? </Text>
        </View>

        <Pressable onPress={() => { handleLogin() }} style={{ backgroundColor: `${buttonColor}`, width: 230, height: 50, alignSelf: 'center', marginTop: 35, justifyContent: 'center', borderRadius: 20 }} >
          {loading ? <FastImage source={LoadingImage} style={{ height: 30, width: 30, alignSelf: 'center' }} /> : <Text style={{ textAlign: 'center', color: '#fff', fontSize: 20, fontFamily: 'serif' }} > Login </Text>}
        </Pressable>

        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 5 }} >
          <Text style={{ color: '#000', fontFamily: 'serif', fontSize: 16 }} > Haven't Account? </Text>
          <Pressable>
            <Text onPress={() => { navigation.navigate('Register') }} style={{ color: '#0a42ec', textDecorationLine: 'underline', fontFamily: 'serif', fontSize: 18 }} > Register </Text>
          </Pressable>
        </View>



      </KeyboardAvoidingView>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexGrow: 1
  },
  image: {
    height: 300,
    width: 430,
  },
  imageContainer: {
    marginTop: 60,
  },
  txt: {
    color: "#0a42ec",
    fontSize: 30,
    fontFamily: 'serif'
  },
  textContainer: {
    marginTop: 14,
    alignItems: 'center'
  },
  fieldsContainer: {
    marginTop: 35,
    width: 310

  },
  passwordContainer: {
    borderWidth: 1,
    borderColor: "#0a42ec",
    borderRadius: 20,
    marginTop: 25

  },
  password: {
    fontSize: 15,
    paddingHorizontal: 10,
    color: "#000",
    fontFamily: 'serif'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    paddingHorizontal: 5,
  },
})

export default LoginScreen;
export {getData , storeData};