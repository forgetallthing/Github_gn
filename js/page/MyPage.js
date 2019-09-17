import React, { Component } from 'react'
import { Button, Text, StyleSheet, View } from 'react-native'
import NavigationBar from '../common/NavigationBar'

const THEME_COLOR = "#678";

export default class MyPage extends Component {
    render() {
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content',
        };
        let navigationBar =
            <NavigationBar
                title={'我的'}
                statusBar={statusBar}
                style={{ backgroundColor: THEME_COLOR }}
            />;
        return (
            <View>
                {navigationBar}
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
