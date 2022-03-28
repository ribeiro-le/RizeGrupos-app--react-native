import React, { useState, useEffect } from 'react';

import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
    FlatList,
    Alert
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { useNavigation, useIsFocused } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import FabButton from '../../components/FabButton';
import ModalNewRoom from '../../components/ModalNewRoom';
import ChatList from '../../components/ChatList';




function ChatRoom() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [user, setUser] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const [threads, setThreads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updateScreen, setUpdateScreen] = useState(false);

    useEffect(() => {
        const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null;
        //console.log(hasUser);

        setUser(hasUser);

    }, [isFocused])


    useEffect(() => {
        let isActive = true;

        function getChats() {
            firestore()
                .collection('MESSAGE_THREADS')
                .orderBy('lastMessage.createdAt', 'desc')
                .limit(10)
                .get()
                .then((snapshot) => {
                    const threads = snapshot.docs.map(documentSnapshot => {
                        return {
                            _id: documentSnapshot.id,
                            name: '',
                            lastMessage: { text: '' },
                            ...documentSnapshot.data()

                        }
                    })

                    if (isActive) {
                        setThreads(threads);
                        setLoading(false);

                        //console.log(threads)
                    }

                })
        }
        getChats();


        return () => {
            isActive = false;
        }

    }, [isFocused, updateScreen])


    function handleSignOut() {
        auth()
            .signOut()
            .then(() => {
                setUser(null);
                navigation.navigate("SignIn")
            })
            .catch(() => {
                console.log("nao possui nenhum usuario")
            })
    }

    function deleteRoom(ownerId, idRoom) {

        if (ownerId !== user?.uid) return;

        Alert.alert(
            "Atenção!",
            "Você tem certeza que deseja deletar essa sala?",
            [
                {
                    text: "Cancel",
                    onPress: () => { },
                    style: "cancel"

                },
                {
                    text: "OK",
                    onPress: () => handleDeleteRoom(idRoom)
                }
            ]
        )

    }

    async function handleDeleteRoom(idRoom) {
        await firestore()
            .collection('MESSAGE_THREADS')
            .doc(idRoom)
            .delete();

        setUpdateScreen(!updateScreen);
    }


    if (loading) {
        return (
            <ActivityIndicator size="large" color="#555" />
        );
    }
    return (


        <SafeAreaView style={styles.container}>
            <View style={styles.headerRoom}>
                <View style={styles.headerRoomLeft}>
                    {user && (
                        <TouchableOpacity onPress={handleSignOut}>
                            <MaterialIcons name="arrow-back" size={28} color="#fff" />
                        </TouchableOpacity>
                    )}
                    <Text style={styles.title}>Grupos</Text>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                    <MaterialIcons name="search" size={28} color="#FFF" />
                </TouchableOpacity>

            </View>

            <FlatList
                data={threads}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <ChatList data={item} deleteRoom={() => deleteRoom(item.owner, item._id)} userStatus={user} />
                )}
            />



            <FabButton setVisible={() => setModalVisible(true)} userStatus={user} />

            <Modal visible={modalVisible} animationType="fade" transparent={true}>
                <ModalNewRoom
                    setVisible={() => setModalVisible(false)}
                    setUpdateScreen={() => setUpdateScreen(!updateScreen)}

                />
            </Modal>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'

    },

    headerRoom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: '#2E54D4',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20

    },
    headerRoomLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FFF',
        paddingLeft: 10
    }


});

export default ChatRoom;