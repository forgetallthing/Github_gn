import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import {
    BottomTabBar,
    createBottomTabNavigator,
} from 'react-navigation-tabs';
import {
    createAppContainer
} from "react-navigation";
import PopularPage from '../page/PopularPage'
import TrendingPage from '../page/TrendingPage'
import FavoritePage from '../page/FavoritePage'
import MyPage from '../page/MyPage'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import NavigationUtil from '../navigator/NavigationUtil'

const TABS = {
    PopularPage: {
        screen: PopularPage,
        navigationOptions: {
            tabBarLabel: "最热",
            tabBarIcon: ({ tintColor, focused }) => (
                <MaterialIcons
                    name={'whatshot'}
                    size={26}
                    style={{ color: tintColor }}
                />
            )
        }
    },
    TrendingPage: {
        screen: TrendingPage,
        navigationOptions: {
            tabBarLabel: "趋势",
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                    name={'md-trending-up'}
                    size={26}
                    style={{ color: tintColor }}
                />
            )
        }
    },
    FavoritePage: {
        screen: FavoritePage,
        navigationOptions: {
            tabBarLabel: "收藏",
            tabBarIcon: ({ tintColor, focused }) => (
                <MaterialIcons
                    name={'favorite'}
                    size={26}
                    style={{ color: tintColor }}
                />
            )
        }
    },
    MyPage: {
        screen: MyPage,
        navigationOptions: {
            tabBarLabel: "我的",
            tabBarIcon: ({ tintColor, focused }) => (
                <Entypo
                    name={'user'}
                    size={26}
                    style={{ color: tintColor }}
                />
            )
        }
    },
}

//动态配置底部tabbar
export default class DynamicTabNavigator extends Component {
    _tanNabigator() {
        const { PopularPage, TrendingPage, FavoritePage, MyPage } = TABS;
        //此处可通过用户权限控制底部tab的显示
        const tabs = { PopularPage, TrendingPage, FavoritePage, MyPage }
        return createBottomTabNavigator(tabs, {
            tabBarComponent: TabBarComponent
        })
    }
    render() {
        NavigationUtil.navigation = this.props.navigation;
        const Tab = createAppContainer(this._tanNabigator());
        return <Tab />
    }
}

class TabBarComponent extends React.Component {
    constructor(props) {
        super(props)
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime: new Date().getTime(),
        }
    }
    render() {
        const { routes, index } = this.props.navigation.state;
        if (routes[index].params) {
            const { theme } = routes[index].params;
            //以最新的更新时间为主，防止被其他tab之前的修改覆盖掉
            if (theme && theme.updateTime > this.theme.updateTime) {
                this.theme = theme;
            }
        }
        return <BottomTabBar
            {...this.props}
            activeTintColor={this.theme.tintColor || this.props.activeTintColor}
        />
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
