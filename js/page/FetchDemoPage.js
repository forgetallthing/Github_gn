import React, { Component } from 'react'
import { Button, Text, StyleSheet, View, TextInput } from 'react-native'

export default class FetchDemoPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showText: ""
        }
    }
    loadData() {
        //https://api.github.com/search/repositories?q=java
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`
        fetch(url)
            .then(response => {
                return response.text()
            })
            .then(responseText => {
                this.setState({
                    showText: responseText
                })
            })
    }
    loadData2() {
        //https://api.github.com/search/repositories?q=java
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`
        fetch(url)
            .then(response => {
                if(response.ok){
                    return response.text()
                }
                throw new Error('network response was not ok.')
            })
            .then(responseText => {
                this.setState({
                    showText: responseText
                })
            })
            .catch(e=>{
                this.setState({
                    showText: e.toString()
                })
            })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}> FetchDemoPage </Text>
                <View style={styles.input_container}>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => {
                            this.searchKey = text;
                        }}
                    />
                    <Button
                        title={'获取'}
                        onPress={() => {
                            this.loadData2()
                        }}
                    />
                </View>
                <Text>{this.state.showText}</Text>
            </View>
        )
    }
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
        flex: 1,
        borderColor: "#000",
        borderWidth: 1,
        marginRight: 10
    },
    input_container:{
        flexDirection:'row',
        alignItems:"center"
    }
})
