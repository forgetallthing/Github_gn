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
import { connect } from 'react-redux'

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
class DynamicTabNavigator extends Component {
    _tabNabigator() {
        if (this.Tabs) { 
            return this.Tabs 
        }
        const { PopularPage, TrendingPage, FavoritePage, MyPage } = TABS;
        //此处可通过用户权限控制底部tab的显示
        const tabs = { PopularPage, TrendingPage, FavoritePage, MyPage }
        return this.Tabs = createAppContainer(createBottomTabNavigator(tabs, {
            tabBarComponent: props => {
                return <TabBarComponent
                    theme={this.props.theme}
                    {...props}
                />
            }
        }))
    }
    render() {
        const Tab = this._tabNabigator();
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

        return <BottomTabBar
            {...this.props}
            activeTintColor={this.props.theme}
        />
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,//v2
});

/** * 3.连接 React 组件与 Redux store */
export default connect(mapStateToProps)(DynamicTabNavigator);
