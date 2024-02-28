import { useContext, useEffect, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { getData } from "./loginScreen";
import { jwtDecode } from "jwt-decode";
import userContext from "../context/userContext";
import "core-js/stable/atob";
import axios from "axios";
import User from "../components/users";

function ActivityScreen() {

    const { userID, setUserID } = useContext(userContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const token = await getData('authToken');
                console.log(token);
                const decodedToken = jwtDecode(token);
                console.log(decodedToken);
                const LoadeduserID = decodedToken.userId;
                setUserID(LoadeduserID);

                axios.get(`http://192.168.0.127:8000/api/getUsers/${LoadeduserID}`)
                    .then((res) => {
                        console.log("Successfully got users data", res.data);
                        setUsers(res.data.data)
                    })
                    .catch((err) => {
                        console.error("Error getting users data ", err);
                    })
            }
            catch (error) {
                console.log("error-->", error);
            }
        }

        fetchUsers();

    }, [])

    const [selectedButton, setSelectedButton] = useState('people');
    const HandleBtnClick = (btnName) => {
        setSelectedButton(btnName)
    }

    return (
        <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: '#fff' }} >
            <View style={{ padding: 10 }}>
                <Text style={{ color: '#000', fontFamily: 'serif', marginTop: 10, fontWeight: '300', fontSize: 20 }} > Activity </Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, justifyContent: 'space-between' }} >

                    <TouchableOpacity onPress={() => { HandleBtnClick('people') }} style={{ paddingHorizontal: 30, paddingVertical: 5, borderRadius: 6, borderColor: '#0a42ec', backgroundColor: selectedButton === "people" ? "#0a42ec" : "#fff", borderWidth: 1 }} >
                        <Text style={{ textAlign: 'center', fontFamily: 'serif', color: selectedButton === "people" ? "#fff" : "#0a42ec", fontSize: 15 }} > People </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { HandleBtnClick('all') }} style={{ paddingHorizontal: 30, paddingVertical: 5, borderRadius: 6, borderColor: '#0a42ec', backgroundColor: selectedButton === "all" ? "#0a42ec" : "#fff", borderWidth: 1 }} >
                        <Text style={{ textAlign: 'center', fontFamily: 'serif', color: selectedButton === "all" ? "#fff" : "#0a42ec", fontSize: 15 }} > All </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { HandleBtnClick('requests') }} style={{ paddingHorizontal: 30, paddingVertical: 5, borderRadius: 6, borderColor: '#0a42ec', backgroundColor: selectedButton === "requests" ? "#0a42ec" : "#fff", borderWidth: 1 }} >
                        <Text style={{ textAlign: 'center', fontFamily: 'serif', color: selectedButton === "requests" ? "#fff" : "#0a42ec", fontSize: 15 }} > Requests </Text>
                    </TouchableOpacity>

                </View>

                <View>
                    {selectedButton == "people" && (
                        <View style={{marginTop:25}}>
                            {users.map((item, index) => {
                                return <User key={index} item={item} />
                            })}
                        </View>
                    )}
                </View>

            </View>
        </ScrollView>
    )
}

export default ActivityScreen;  