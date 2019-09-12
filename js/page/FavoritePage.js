import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class FavoritePage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}> FavoritePage </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#F5FCFF"
    },
    welcome: {
        fontSize: 20,
        alignItems: 'center',
        margin: 10
    }
})
