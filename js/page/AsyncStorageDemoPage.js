import React, { Component } from 'react'
import { Button, Text, StyleSheet, View, TextInput } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
const KEY = 'save_key';

export default class AsyncStorageDemoPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showText: ""
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}> AsyncStorage </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => {
                        this.value = text;
                    }}
                />
                <View style={styles.input_container}>
                    <Text onPress={() => {
                        this.doSave()
                    }}>
                        存储
                    </Text>
                    <Text onPress={() => {
                        this.doRemove()
                    }}>
                        删除
                    </Text>
                    <Text onPress={() => {
                        this.getData()
                    }}>
                        获取
                    </Text>
                </View>
                <Text>{this.state.showText}</Text>
            </View>
        )
    }

    // doSave() {
    //     AsyncStorage.setItem(KEY, this.value, e => {
    //         e && console.log(e.toString())
    //     })
    // }

    // doRemove() {
    //     AsyncStorage.removeItem(KEY, e => {
    //         e && console.log(e.toString())
    //     })
    // }

    // getData() {
    //     AsyncStorage.getItem(KEY, (e, value) => {
    //         this.setState({
    //             showText: value
    //         })
    //         e && console.log(e.toString())
    //     })
    // }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FCFF"
    },
    welcome: {
        fontSize: 20,
        alignItems: 'center',
        margin: 10
    },
    input: {
        height: 50,
        borderColor: "#000",
        borderWidth: 1,
        marginRight: 10
    },
    input_container: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent:"space-around"
    }
})
