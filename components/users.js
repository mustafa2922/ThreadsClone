import { Image, Pressable, Text, View } from 'react-native'
import defaultUser from '../assets/images/defaultUser.png'
import { useContext, useState } from 'react';
import userContext from '../context/userContext';
import axios from 'axios';

function User({ item }) {

    const { userID, setUserID } = useContext(userContext);
    const [requestSent, setRequestSent] = useState(false);

    const followUser = (followerID, selectedID) => {

        const obj = {
            followerID: followerID,
            selectedID: selectedID
        };

        axios.post('http://192.168.0.127:8000/api/user/follow', obj)
            .then((res) => {
                setRequestSent(true);
            })
            .catch((err) => {
                console.log("Error occured in User.js ", err);
            })
    }

    const unfollowUser = (unfollowerID, selectedID) => {

        const obj = {
            unfollowerID: unfollowerID,
            selectedID: selectedID
        };

        axios.post('http://192.168.0.127:8000/api/user/unfollow', obj)
            .then((res) => {
                setRequestSent(false);
            })
            .catch((err) => {
                console.log("Error occured in User.js ", err);
            })

    }

    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <Image source={item?.imageURL == "3" ? defaultUser : item.imageURL} style={{ width: 45, height: 45 }} />
                    <Text style={{ fontSize: 18, color: '#000', fontFamily: 'serif', marginLeft: 5 }} > {item?.name} </Text>
                </View>

                {requestSent || item.followers.includes(userID) ? (
                    <Pressable onPress={() => { unfollowUser(userID, item._id); }} style={{ width: 80, borderColor: '#0a42ec', borderWidth: 1, padding: 6, borderRadius: 5 }} >
                        <Text style={{ color: '#0a42ec', textAlign: 'center' }}> Following </Text>
                    </Pressable>
                ) : (
                    <Pressable onPress={() => { followUser(userID, item._id); }} style={{ width: 80, borderColor: '#0a42ec', borderWidth: 1, padding: 6, borderRadius: 5 }} >
                        <Text style={{ color: '#0a42ec', textAlign: 'center' }}> Follow </Text>
                    </Pressable>
                )}


            </View>
        </View>
    )
}

export default User