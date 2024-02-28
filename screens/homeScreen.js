import { Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import userContext from "../context/userContext";
import { getData } from "./loginScreen";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

function HomeScreen() {
    const { userID, setUserID } = useContext(userContext);

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const token = await getData('authToken');
                const decodedToken = jwtDecode(token);
                const LoadeduserID = decodedToken.userId;
                setUserID(LoadeduserID);
            }
            catch (error) {
                console.log("error-->", error);
            }
        }

        fetchUsers();

    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }} >
            <Text style={{ fontSize: 35, color: '#04278f', fontFamily: 'serif' }} > This is Home Screen </Text>
        </View>
    )
}

export default HomeScreen;
