import React, { Component } from 'react'
import {
    DeviceInfo, Text, ActivityIndicator, StyleSheet,
    View, FlatList, RefreshControl, TouchableOpacity, DeviceEventEmitter
} from 'react-native'
import {
    createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import { connect } from 'react-redux';
import actions from "../action/index";
import {
    createAppContainer
} from "react-navigation";
import NavigationUtil from '../navigator/NavigationUtil';
import TrendingItem from '../common/TrendingItem'
import NavigationBar from '../common/NavigationBar'
import Toast from 'react-native-easy-toast'
import TrendingDialog, { TimeSpans } from '../common/TrendingDialog'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FavoriteDao from '../expand/dao/FavoriteDao'
import { FLAG_STORAGE } from '../expand/dao/DataStore';
import FavoriteUtil from '../util/FavoriteUtil';
import EventBus from 'react-native-event-bus'
import EventTypes from '../util/EventTypes'
import { FLAG_LANGUAGE } from '../expand/dao/LanguageDao'
import ArrayUtil from '../util/ArrayUtil'

const EVENT_TYPE_TIME_SPAN_CHANGE = "EVENT_TYPE_TIME_SPAN_CHANGE";
const URL = `https://github.com/trending/`;
const QUERY_STR = `&sort=stars`;
const THEME_COLOR = "#678";
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_trending);

class TrendingPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timeSpan: TimeSpans[0]
        }
        const { onLoadLanguage } = this.props;
        onLoadLanguage(FLAG_LANGUAGE.flag_language)
        this.preKeys = []
    }
    _genTabs() {
        const tabs = {}
        const { keys } = this.props;
        this.preKeys = keys;
        keys.forEach((item, index) => {
            if (item.checked) {
                tabs[`tab${index}`] = {
                    /**
                     * 使用参数保存props,保证screen运行时可取到props，
                     * 而item不用参数保存是因为箭头函数的this是共用forEach函数的this，所以能取到item。
                     */
                    screen: props => <TrendingTabPage {...props} timeSpan={this.state.timeSpan} tabLabel={item.name} />,
                    navigationOptions: {
                        title: item.name
                    }
                }
            }
        })
        return tabs;
    }
    renderTitleView() {
        return <View>
            <TouchableOpacity
                underlayColor='transparent'
                onPress={() => this.dialog.show()}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{
                        fontSize: 18,
                        color: '#FFFFFF',
                        fontWeight: '400',
                    }}>趋势 {this.state.timeSpan.showText}</Text>
                    <MaterialIcons
                        name={'arrow-drop-down'}
                        size={22}
                        style={{ color: 'white' }}
                    />
                </View>
            </TouchableOpacity>
        </View>;
    }
    onSelectTimeSpan(tab) {
        this.dialog.dismiss();
        this.setState({
            timeSpan: tab,
        });
        DeviceEventEmitter.emit(EVENT_TYPE_TIME_SPAN_CHANGE, tab);
    }
    renderTrendingDialog() {
        return <TrendingDialog
            ref={dialog => this.dialog = dialog}
            onSelect={tab => this.onSelectTimeSpan(tab)}
        />;
    }

    _tabNav() {
        if (!this.tabNav || !ArrayUtil.isEqual(this.preKeys, this.props.keys)) {
            this.tabNav = createAppContainer(createMaterialTopTabNavigator(
                this._genTabs(), {
                tabBarOptions: {
                    tabStyle: styles.tabStyle,
                    upperCaseLabel: false,
                    scrollEnabled: true,
                    style: {
                        backgroundColor: "#678",
                        height: 50
                    },
                    indicatorStyle: styles.indicatorStyle,
                    labelStyle: styles.labelStyle,
                }
            }
            ))
        }
        return this.tabNav
    }
    render() {
        const { keys } = this.props;
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content'
        }
        let navigationBar = <NavigationBar
            titleView={this.renderTitleView()}
            statusBar={statusBar}
            style={{ backgroundColor: THEME_COLOR }}
        />
        let TabNavigator = keys.length > 0 ? this._tabNav() : null;
        return <View style={{ flex: 1, marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0 }}>
            {navigationBar}
            {TabNavigator && <TabNavigator />}
            {this.renderTrendingDialog()}
        </View>
    }
}


const mapTrendingStateToProps = state => {
    return {
        keys: state.language.languages
    }
}

const mapTrendingDispatchToProps = dispatch => ({
    onLoadLanguage: (flag) => dispatch(actions.onLoadLanguage(flag)),
})

export default connect(mapTrendingStateToProps, mapTrendingDispatchToProps)(TrendingPage)

const pageSize = 15;
class TrendingTab extends Component {
    constructor(props) {
        super(props);
        const { tabLabel, timeSpan } = this.props;
        this.storeName = tabLabel;
        this.timeSpan = timeSpan;
        this.isFavoriteChange = false;
    }
    componentDidMount() {
        this.loadData();
        this.timeSpanChangeListener = DeviceEventEmitter.addListener(EVENT_TYPE_TIME_SPAN_CHANGE, (timeSpan) => {
            this.timeSpan = timeSpan;
            this.loadData();
        })
        EventBus.getInstance().addListener(EventTypes.favoriteChanged_trending, this.favoriteChangeListener = () => {
            this.isFavoriteChanged = true;
        });
        EventBus.getInstance().addListener(EventTypes.bottom_tab_select, this.bottomTabSelectListener = (data) => {
            if (data.to === 1 && this.isFavoriteChanged) {
                this.loadData(null, true);
            }
        })
    }
    componentWillUnmount() {
        if (this.timeSpanChangeListener) this.timeSpanChangeListener.remove();
        EventBus.getInstance().removeListener(this.favoriteChangeListener);
        EventBus.getInstance().removeListener(this.bottomTabSelectListener);
    }
    _store() {
        const { trending } = this.props;
        let store = trending[this.storeName];
        if (!store) {
            store = {
                items: [],
                isLoading: false,
                projectModels: [],
                hideLoadingMore: true
            }
        }
        return store
    }
    loadData(loadMore, refreshFavorite) {
        const { onRefreshTrending, onLoadMoreTrending, onFlushTrendingFavorite } = this.props;
        const url = this.genFetchUrl(this.storeName);
        const store = this._store();
        if (loadMore) {
            onLoadMoreTrending(this.storeName, ++store.pageIndex, pageSize, store.items, favoriteDao, callback => {
                this.refs.toast.show('没有更多了')
            })
        } else if (refreshFavorite) {
            onFlushTrendingFavorite(this.storeName, store.pageIndex, pageSize, store.items, favoriteDao)
        } else {
            onRefreshTrending(this.storeName, url, pageSize, favoriteDao)
        }
    }
    genFetchUrl(key) {
        if (key === "All") {
            return URL + "?" + this.timeSpan.searchText;
        }
        return URL + key + "?" + this.timeSpan.searchText;
    }
    renderItem(data) {
        const item = data.item;
        return <TrendingItem projectModel={item} onSelect={(callback) => {
            NavigationUtil.goPage({
                projectModel: item,
                flag: FLAG_STORAGE.flag_trending,
                callback,
            }, "DetailPage")
        }}
            onFavorite={(item, isFavorite) => FavoriteUtil.onFavorite(favoriteDao, item, isFavorite, FLAG_STORAGE.flag_trending)}
        ></TrendingItem>
    }
    genIndicator() {
        return this._store().hideLoadingMore ? null :
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={styles.indicator}
                />
                <Text>正在加载更多</Text>
            </View>
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
                            onRefresh={() => this.loadData()}
                            tintColor={THEME_COLOR}
                        />
                    }
                    ListFooterComponent={() => this.genIndicator()}
                    onEndReached={() => {
                        //滚动到底部触发,设置canLoadMore标志位基础法多次,setTimeout防止onMomentumScrollBegin更新标志位有延迟
                        setTimeout(() => {
                            if (this.canLoadMore) {
                                this.loadData(true);
                                this.canLoadMore = false;
                            }
                        }, 100)
                    }}
                    onEndReachedThreshold={0.5}
                    onMomentumScrollBegin={() => {
                        //滚动开始设置为true
                        this.canLoadMore = true;
                    }}
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
        trending: state.trending
    }
}

const mapDispatchToProps = dispatch => ({
    onRefreshTrending: (storeName, url, pageSize, favoriteDao) => dispatch(actions.onRefreshTrending(storeName, url, pageSize, favoriteDao)),
    onLoadMoreTrending: (storeName, pageIndex, pageSize, items, favoriteDao, callback) => dispatch(actions.onLoadMoreTrending(storeName, pageIndex, pageSize, items, favoriteDao, callback)),
    onFlushTrendingFavorite: (storeName, pageIndex, pageSize, items, favoriteDao) => dispatch(actions.onFlushTrendingFavorite(storeName, pageIndex, pageSize, items, favoriteDao)),
})

const TrendingTabPage = connect(mapStateToProps, mapDispatchToProps)(TrendingTab)

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

