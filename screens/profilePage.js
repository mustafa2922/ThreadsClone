import { Text, View } from "react-native";

function ProfileScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }} >
            <Text style={{ fontSize: 35, color: '#04278f', fontFamily: 'serif' }} > This is Profile Screen </Text>
        </View>
    )
}

export default ProfileScreen;
