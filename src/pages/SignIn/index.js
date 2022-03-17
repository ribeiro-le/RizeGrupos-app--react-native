import React, { useState } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    Platform
} from 'react-native';

import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'


function SignIn() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState(false);




    function handleLogin() {
        if (type === true) {
            if (name === '' || email === '' || password === '') return;

            auth().createUserWithEmailAndPassword(email, password)
                .then((user) => {
                    user.user.updateProfile({
                        displayName: name,
                    })
                        .then(() => {
                            navigation.goBack();
                        })
                })
                .catch((error) => {
                    if (error.code === 'auth/email-already-in-use') {
                        console.log('Email já em uso!');
                    }

                    if (error.code === 'auth/invalid-email') {
                        console.log('Email invalido!');
                    }
                })

        } else {
            auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => {
                    navigation.goBack();
                })
                .catch(error => {
                    if (error.code === 'auth/invalid-email') {
                        console.log('Email invalido!');
                    }
                })

        }
    }




    return (
        <SafeAreaView style={styles.Container}>
            <Text style={styles.logo}>RizeGrupos</Text>
            <Text style={{ marginBottom: 20 }}>Ajude, colabore, faça networking!</Text>

            {type && (
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={text => setName(text)}
                    placeholder="Qual seu nome?"
                    placeholderTextColor="#99999B"
                />
            )}


            <TextInput
                style={styles.input}
                value={email}
                onChangeText={text => setEmail(text)}
                placeholder="Seu email"
                placeholderTextColor="#99999B"
            />
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={text => setPassword(text)}
                placeholder="Seu senha"
                placeholderTextColor="#99999B"
                secureTextEntry={true}
            />

            <TouchableOpacity

                onPress={(handleLogin)}
                style={[styles.buttonLogin, { backgroundColor: type ? "#F53745" : "#57DD86" }]}>
                <Text style={styles.buttonText}>
                    {type ? "Cadastrar" : "Acessar"}

                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={(() => setType(!type))}>
                <Text>{type ? "Já possuo uma conta" : "Criar uma nova conta"}</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    logo: {
        marginTop: Platform.OS === 'android' ? 55 : 80,
        fontSize: 28,
        fontWeight: 'bold'
    },
    input: {
        color: '#121212',
        backgroundColor: '#EBEBEB',
        width: '90%',
        borderRadius: 6,
        marginBottom: 10,
        paddingHorizontal: 8,
        height: 50
    },

    buttonLogin: {
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 6
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 19
    }


});

export default SignIn;