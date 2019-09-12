import React, { Component } from 'react'
import { Button,Text, StyleSheet, View } from 'react-native'

export default class TrendingPage extends Component {
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}> TrendingPage </Text>
                <Button
                    title={"change color"}
                    onPress={()=>{
                        navigation.setParams({
                            theme:{
                                tintColor:'red',
                                updateTime: new Date().getTime()
                            }
                        })
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
