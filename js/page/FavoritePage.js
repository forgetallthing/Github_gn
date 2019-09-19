import React, { Component } from 'react'
import { DeviceInfo, Text, ActivityIndicator, StyleSheet, View, FlatList, RefreshControl } from 'react-native'
import {
    createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import { connect } from 'react-redux';
import actions from "../action/index";
import {
    createAppContainer
} from "react-navigation";
import NavigationUtil from '../navigator/NavigationUtil';
import PopularItem from '../common/PopularItem'
import TrendingItem from '../common/TrendingItem'
import NavigationBar from '../common/NavigationBar'
import Toast from 'react-native-easy-toast'
import FavoriteDao from '../expand/dao/FavoriteDao'
import { FLAG_STORAGE } from '../expand/dao/DataStore';
import FavoriteUtil from '../util/FavoriteUtil';
import EventBus from 'react-native-event-bus'
import EventTypes from '../util/EventTypes'

const THEME_COLOR = "#678";
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);

export default class FavoritePage extends Component {
    constructor(props) {
        super(props)
        this.tabNames = ["最热", "趋势"]
    }

    render() {
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content'
        }
        let navigationBar = <NavigationBar
            title={"收藏"}
            statusBar={statusBar}
            style={{ backgroundColor: THEME_COLOR }}
        />
        const TabNavigator = createAppContainer(createMaterialTopTabNavigator(
            {
                'Popular': {
                    screen: props => <FavoriteTabPage {...props} flag={FLAG_STORAGE.flag_popular} />,//初始化Component时携带默认参数 @https://github.com/react-navigation/react-navigation/issues/2392
                    navigationOptions: {
                        title: '最热',
                    },
                },
                'Trending': {
                    screen: props => <FavoriteTabPage {...props} flag={FLAG_STORAGE.flag_trending} />,//初始化Component时携带默认参数 @https://github.com/react-navigation/react-navigation/issues/2392
                    navigationOptions: {
                        title: '趋势',
                    },
                },
            }, {
            tabBarOptions: {
                tabStyle: styles.tabStyle,
                upperCaseLabel: false,
                style: {
                    backgroundColor: "#678",
                    height: 50
                },
                indicatorStyle: styles.indicatorStyle,
                labelStyle: styles.labelStyle,
            }
        }
        ))
        return <View style={{ flex: 1, marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0 }}>
            {navigationBar}
            <TabNavigator />
        </View>
    }
}

class FavoriteTab extends Component {
    constructor(props) {
        super(props);
        const { flag } = this.props;
        this.storeName = flag;
        this.favoriteDao = new FavoriteDao(flag);
    }
    componentDidMount() {
        this.loadData();
        EventBus.getInstance().addListener(EventTypes.bottom_tab_select, this.listener = data => {
            if (data.to === 2) {
                this.loadData(false)
            }
        })
    }
    componentWillUnmount() {
        EventBus.getInstance().removeListener(this.listener)
    }
    _store() {
        const { favorite } = this.props;
        let store = favorite[this.storeName];
        if (!store) {
            store = {
                items: [],
                isLoading: false,
                projectModels: [],
            }
        }
        return store
    }
    loadData(isShowLoading) {
        const { onLoadFavoriteData } = this.props;
        onLoadFavoriteData(this.storeName, isShowLoading);
    }
    onFavorite(item, isFavorite) {
        FavoriteUtil.onFavorite(this.favoriteDao, item, isFavorite, this.props.flag);
        if (this.storeName === FLAG_STORAGE.flag_popular) {
            EventBus.getInstance().fireEvent(EventTypes.favorite_changed_popular);
        } else {
            EventBus.getInstance().fireEvent(EventTypes.favoriteChanged_trending);
        }
    }
    renderItem(data) {
        const item = data.item;
        const Item = this.storeName === FLAG_STORAGE.flag_popular ? PopularItem : TrendingItem;
        return <Item
            projectModel={item}
            onSelect={(callback) => {
                NavigationUtil.goPage({
                    projectModel: item,
                    flag: this.storeName,
                    callback,
                }, 'DetailPage');
            }}
            onFavorite={(item, isFavorite) => this.onFavorite(item, isFavorite)}
        />;
    }
    render() {
        let store = this._store();
        return (
            <View style={styles.container}>
                <FlatList
                    data={store.projectModels}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => "" + (item.item.id || item.item.fullName)}
                    refreshControl={
                        <RefreshControl
                            title={"Loading"}
                            titleColor={THEME_COLOR}
                            colors={[THEME_COLOR]}
                            refreshing={store.isLoading}
                            onRefresh={() => this.loadData(true)}
                            tintColor={THEME_COLOR}
                        />
                    }
                />
                <Toast
                    ref={'toast'}
                    position={'center'}
                />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        favorite: state.favorite
    }
}

const mapDispatchToProps = dispatch => ({
    onLoadFavoriteData: (storeName, isShowLoading) => dispatch(actions.onLoadFavoriteData(storeName, isShowLoading))
})

const FavoriteTabPage = connect(mapStateToProps, mapDispatchToProps)(FavoriteTab)

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
        // minWidth: 50,
        padding: 0,
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'white'
    },
    labelStyle: {
        fontSize: 13,
        margin: 0
    },
    indicatorContainer: {
        alignItems: "center"
    },
    indicator: {
        color: "#208",
        margin: 10
    }
})
