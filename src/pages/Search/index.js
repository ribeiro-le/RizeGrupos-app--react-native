import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

function Search() {
    return (
        <View style={styles.Container}>
            <Text>Search</Text>
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

export default Search;