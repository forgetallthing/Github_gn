import React, { Component } from 'react'
import { Text, ActivityIndicator, StyleSheet, View, FlatList, RefreshControl } from 'react-native'
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
import NavigationBar from '../common/NavigationBar'
import Toast from 'react-native-easy-toast'

const URL = `https://api.github.com/search/repositories?q=`;
const QUERY_STR = `&sort=stars`;
const THEME_COLOR = "#678";
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
                screen: props => <PopularTabPage {...props} tabLabel={item} />,
                navigationOptions: {
                    title: item
                }
            }
        })
        return tabs;
    }
    render() {
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content'
        }
        let navigationBar = <NavigationBar
            title={"最热"}
            statusBar={statusBar}
            style={{ backgroundColor: THEME_COLOR }}
        />
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
        return <View style={{ flex: 1, marginTop: 0 }}>
            {navigationBar}
            <TabNavigator />
        </View>
    }
}

const pageSize = 15;
class PopularTab extends Component {
    constructor(props) {
        super(props);
        const { tabLabel } = this.props;
        this.storeName = tabLabel;
    }
    componentDidMount() {
        this.loadData()
    }
    _store() {
        const { popular } = this.props;
        let store = popular[this.storeName];
        if (!store) {
            store = {
                items: [],
                isLoading: false,
                projectModes: [],
                hideLoadingMore: true
            }
        }
        return store
    }
    loadData(loadMore) {
        const { onRefreshPopular, onLoadMorePopular } = this.props;
        const url = this.genFetchUrl(this.storeName);
        const store = this._store();
        if (loadMore) {
            onLoadMorePopular(this.storeName, ++store.pageIndex, pageSize, store.items, callback => {
                this.refs.toast.show('没有更多了')
            })
        } else {
            onRefreshPopular(this.storeName, url, pageSize)
        }
    }
    genFetchUrl(key) {
        return URL + key + QUERY_STR;
    }
    renderItem(data) {
        const item = data.item;
        return <PopularItem item={item} onSelect={() => {

        }}></PopularItem>
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
        const { popular } = this.props;
        let store = this._store();
        return (
            <View style={styles.container}>
                <FlatList
                    data={store.projectModes}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => "" + item.id}
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
        popular: state.popular
    }
}

const mapDispatchToProps = dispatch => ({
    onRefreshPopular: (storeName, url, pageSize) => dispatch(actions.onRefreshPopular(storeName, url, pageSize)),
    onLoadMorePopular: (storeName, pageIndex, pageSize, items, callback) => dispatch(actions.onLoadMorePopular(storeName, pageIndex, pageSize, items, callback))
})

const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab)

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
    },
    indicatorContainer: {
        alignItems: "center"
    },
    indicator: {
        color: "#208",
        margin: 10
    }
})
