import React, { Component } from 'react'
import { Button, Text, StyleSheet, View } from 'react-native'

export default class MyPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}> MyPage </Text>
                <Text onPress={() => {
                    NavigationUtil.goPage({
                        navigation: this.props.navigation
                    }, 'DetailPage')
                }}>to DetailPage</Text>
                <Button
                    title={'go fetch'}
                    onPress={() => {
                        NavigationUtil.goPage({
                            navigation: this.props.navigation
                        }, 'FetchDemoPage')
                    }}
                />
                <Button
                    title={'go AsyncStorage'}
                    onPress={() => {
                        NavigationUtil.goPage({
                            navigation: this.props.navigation
                        }, 'AsyncStorageDemoPage')
                    }}
                />
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
