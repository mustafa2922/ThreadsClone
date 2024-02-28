import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from "../screens/registerScreen";
import LoginScreen from '../screens/loginScreen'
import MyBottomTabs from "./bottomTab";


const Stack = createNativeStackNavigator();

function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }}  />
                <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }}  />
                <Stack.Screen name='Main' component={MyBottomTabs} options={{ headerShown: false }}  />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;
