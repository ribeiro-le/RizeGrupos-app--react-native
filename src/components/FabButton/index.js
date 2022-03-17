import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

function FabButton({ setVisible, userStatus }) {

    const navigation = useNavigation();

    function handleNavigateButton() {
        userStatus ? setVisible() : navigation.navigate("SignIn")
    }




    return (
        <TouchableOpacity
            onPress={handleNavigateButton}
            activeOpacity={0.8}
            style={styles.containerButton}>

            <View>
                <Text style={styles.text}>+</Text>
            </View>
        </TouchableOpacity>
    )
}

export default FabButton;

const styles = StyleSheet.create({
    containerButton: {
        backgroundColor: '#2E54D4',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: '5%',
        right: '7%',
    },

    text: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold'
    }
})