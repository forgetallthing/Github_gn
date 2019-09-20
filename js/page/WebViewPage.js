import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, DeviceInfo } from 'react-native'
import WebView from 'react-native-webview'
import NavigationBar from '../common/NavigationBar'
import ViewUtil from '../util/ViewUtil'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import BackPressComponent from '../common/BackPressComponent'
import NavigationUtil from '../navigator/NavigationUtil';

const THEME_COLOR = "#678";

export default class WebViewPage extends Component {
    constructor(props) {
        super(props)
        this.params = this.props.navigation.state.params;
        const { title, url } = this.params
        this.state = {
            title: title,
            url: url,
            canGoBack: false,
        }
        this.backPress = new BackPressComponent({
            backPress: () => this.onBackPress()
        })
    }

    componentDidMount() {
        this.backPress.componentDidMount();
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    /** * 处理 Android 中的物理返回键 * https://reactnavigation.org/docs/en/redux-integration.html#handling-the-hardware-back-button-in-android * @returns {boolean} */
    onBackPress = () => {
        this.onBack();
        return true;
    };

    onBack() {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            NavigationUtil.goBack(this.props.navigation);
        }
    }

    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url,
        })
    }

    render() {
        let navigationBar = <NavigationBar
            title={this.state.title}
            style={{ backgroundColor: THEME_COLOR }}
            leftButton={ViewUtil.getLeftBackButton(()=>this.onBackPress())}
        />
        return (
            <View style={styles.container}>
                {navigationBar}
                <WebView
                    // style={{ marginTop: NAVIGATION_BAR_HEIGHT }}
                    ref={webView => this.webView = webView}
                    startInLoadingState={true}//进度条
                    onNavigationStateChange={e => this.onNavigationStateChange(e)}
                    source={{ uri: this.state.url }}
                ></WebView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0,
    },
})
