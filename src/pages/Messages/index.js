import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

function Messages() {
    return (
        <View style={styles.Container}>
            <Text>Messages</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },


});

export default Messages;