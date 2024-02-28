import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ActivityScreen from '../screens/activityPage';
import ProfileScreen from '../screens/profilePage';
import HomeScreen from '../screens/homeScreen';
import ThreadsScreen from '../screens/threadsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const MyBottomTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home', tabBarLabelStyle: { color: '#000', fontFamily: 'serif', fontSize: 15 , marginBottom:5}, headerShown: false, tabBarIcon: ({ focused }) => { return focused ? (<Ionicons name="home" size={20} style={{ color: '#000' }} />) : (<Ionicons name='home-outline' size={20}  style={{ color: '#000' }} />) } }} />
            <Tab.Screen name="Thread" component={ThreadsScreen} options={{ tabBarLabel: 'Create', tabBarLabelStyle: { color: '#000', fontFamily: 'serif', fontSize: 15 , marginBottom:5 }, headerShown: false, tabBarIcon: ({ focused }) => { return focused ? (<Ionicons name="create" size={20}  style={{ color: '#000' }} />) : (<Ionicons name='create-outline' size={20}  style={{ color: '#000' }} />) } }} />
            <Tab.Screen name="Activity" component={ActivityScreen} options={{ tabBarLabel: 'Activity', tabBarLabelStyle: { color: '#000', fontFamily: 'serif', fontSize: 15 , marginBottom:5 }, headerShown: false, tabBarIcon: ({ focused }) => { return focused ? (<AntDesign name="heart" size={20}  style={{ color: '#000' }} />) : (<AntDesign name='hearto' size={20}  style={{ color: '#000' }} />) } }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile', tabBarLabelStyle: { color: '#000', fontFamily: 'serif', fontSize: 15 , marginBottom:5}, headerShown: false, tabBarIcon: ({ focused }) => { return focused ? (<Ionicons name='person' size={20}  style={{ color: '#000' }} />) : (<Ionicons name="person-outline" size={20}  style={{ color: '#000' }} />) } }} />
        </Tab.Navigator>
    );
}

export default MyBottomTabs;