import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import {
    createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import {
    createAppContainer
} from "react-navigation";
import NavigationUtil from '../navigator/NavigationUtil'

export default class PopularPage extends Component {
    constructor(props) {
        super(props)
        this.tabNames = ["android", "ios", "python", "react", "java", "vue"]
    }
    _genTabs() {
        const tabs = {}
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                /**
                 * 使用参数保存props,保证screen运行时可取到props，
                 * 而item不用参数保存是因为箭头函数的this是共用forEach函数的this，所以能取到item。
                 */
                screen: props => <PopularTab {...props} tabLabel={item} />,
                navigationOptions: {
                    title: item
                }
            }
        })
        return tabs;
    }
    render() {
        const TabNavigator = createAppContainer(createMaterialTopTabNavigator(
            this._genTabs(), {
            tabBarOptions: {
                tabStyle: styles.tabStyle,
                upperCaseLabel: false,
                scrollEnabled: true,
                style: {
                    backgroundColor: "#678"
                },
                indicatorStyle: styles.indicatorStyle,
                labelStyle: styles.labelStyle,
            }
        }
        ))
        return <View style={{ flex: 1, marginTop: 20 }}>
            <TabNavigator />
        </View>
    }
}

class PopularTab extends Component {
    render() {
        const { tabLabel } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}> {tabLabel} </Text>
                <Text onPress={() => {
                    NavigationUtil.goPage({
                        navigation: this.props.navigation
                    }, 'DetailPage')
                }}>to DetailPage</Text>
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
    },
    tabStyle: {
        minWidth: 50
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'white'
    },
    labelStyle: {
        fontSize: 13,
        marginTop: 6,
        marginBottom: 6,
    }
})
