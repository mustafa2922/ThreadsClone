import { View, Text, StyleSheet, Image, KeyboardAvoidingView, TextInput, Pressable, ScrollView } from "react-native"
import RegisterImage from '../assets/images/RegiserImage.jpg'
import { useState } from "react"
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-toast-message';
import axios from "axios";
import LoadingImage from '../assets/images/loading.gif';
import FastImage from 'react-native-fast-image';
import { storeData } from "./loginScreen";
import defaultUser from '../assets/images/defaultUser.png'

function RegisterScreen() {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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

  const handelRegister = async () => {
    setLoading(true)
    if (buttonColor == '#0a42ec') {
      setButtonColor('#04278f')
    }
    else {
      setButtonColor('#0a42ec')
    }

    if (emailCheck && passwordCheck && name.length >= 6) {
      const user = {
        name: name,
        email: email,
        password: password,
        imageURL:defaultUser
      }

      axios.post('http://192.168.0.127:8000/api/user/register', user)
        .then(async (res) => {

          Toast.show({
            type: 'success',
            text1: 'Registration Successfull',
            text2: 'Say Hello To World 👋',
          });

          console.log("Registration Successful - Status Code:", res.status);
          console.log("Response Data:", res.data);

          const token = res.data.token;
          try {
            await storeData('authToken', token);
          }
          catch (err) {
            console.log("Error Saving Token --> ", err);
          }

          navigation.navigate('Main');

          setPassword('');
          setEmail('');
          setName('');
          setEmailCheck(null);
          setPasswordCheck(null);
          setLoading(false);


        })

        .catch((error) => {

          console.log("Error Response Data:", error.response.data.message);

          const errMsg = error.response.data.message;
          if (errMsg == "Email Already Registerd") {
            Toast.show({
              type: 'error',
              text1: 'Duplicacy Error',
              text2: errMsg,
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
  const [passwordCheck, setPasswordCheck] = useState(null)

  const checkPassword = (txt) => {
    if (txt.trim() == '') {
      setPasswordCheck(null)
    }
    else if (passwordRegex.test(txt)) {
      setPasswordCheck(true)
    }
    else {
      setPasswordCheck(false)
    }
  }

  const [name, setName] = useState('')

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

      <View style={styles.imageContainer}>
        <Image style={styles.image} source={RegisterImage} />
      </View>

      <KeyboardAvoidingView>

        <View style={styles.textContainer} >
          <Text style={styles.txt} > Register to publish Online </Text>
        </View>

        <View style={styles.fieldsContainer} >

          <View style={{ borderWidth: 1, borderColor: "#0a42ec", borderRadius: 20, flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', paddingRight: 5 }}>
            <TextInput style={{ fontSize: 15, paddingHorizontal: 6, color: '#000', fontFamily: 'serif', width: 280, overflow: 'scroll' }} placeholder="Enter Your name" placeholderTextColor='#a6a6a6' value={name} onChangeText={(txt) => { setName(txt) }} />
            {name.trim() == '' ? null : name.length >= 6 ? <Feather name="check-circle" size={20} color="green" /> : <MaterialIcons name='error-outline' color='red' size={20} />}
          </View>
          <View style={{ height: 13 }} >
            {name.trim() == '' ? null : name.length >= 6 ? null : <Text style={{ color: 'red', fontSize: 11, paddingLeft: 4, fontFamily: 'serif' }} > Name must contain six characters </Text>}
          </View>

          <View style={{ borderWidth: 1, borderColor: "#0a42ec", borderRadius: 20, flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', paddingRight: 5, marginTop: 5 }}>
            <TextInput style={{ fontSize: 15, paddingHorizontal: 6, color: '#000', fontFamily: 'serif', width: 280, overflow: 'scroll' }} placeholder="Enter Your email" placeholderTextColor='#a6a6a6' value={email} onChangeText={(txt) => { setEmail(txt); checkEmail(txt); }} />
            {emailCheck == null ? null : emailCheck ? <Feather name="check-circle" size={20} color="green" /> : <MaterialIcons name='error-outline' color='red' size={20} />}
          </View>

          <View style={{ borderWidth: 1, borderColor: "#0a42ec", borderRadius: 20, flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', paddingRight: 5, marginTop: 20 }}>
            <TextInput style={{ fontSize: 15, paddingHorizontal: 6, color: '#000', fontFamily: 'serif', width: 280, overflow: 'scroll' }} placeholder="Enter Your password" placeholderTextColor='#a6a6a6' value={password} onChangeText={(txt) => { setPassword(txt); checkPassword(txt); }} />
            {passwordCheck == null ? null : passwordCheck ? <Feather name="check-circle" size={20} color="green" /> : <MaterialIcons name='error-outline' color='red' size={20} />}
          </View>
          <View style={{ height: 23 }} >
            {passwordCheck == null ? null : passwordCheck ? null : <Text style={{ color: 'red', fontSize: 11, paddingLeft: 4, fontFamily: 'serif' }} > The password must have at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long </Text>}
          </View>

        </View>

        <Pressable onPress={() => { handelRegister() }} style={{ backgroundColor: `${buttonColor}`, width: 230, height: 50, alignSelf: 'center', marginTop: 20, justifyContent: 'center', borderRadius: 20 }} >
          {loading ? <FastImage source={LoadingImage} style={{ height: 30, width: 30, alignSelf: 'center' }} /> : <Text style={{ textAlign: 'center', color: '#fff', fontSize: 20, fontFamily: 'serif' }} > Register </Text>}
        </Pressable>

        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 5 }} >
          <Text style={{ color: '#000', fontFamily: 'serif', fontSize: 16 }} > Already have Account? </Text>
          <Pressable>
            <Text onPress={() => { navigation.navigate('Login') }} style={{ color: '#0a42ec', textDecorationLine: 'underline', fontFamily: 'serif', fontSize: 18 }} > Login </Text>
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
    width: 350,
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
    marginTop: 30,
    width: 310

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

export default RegisterScreen
