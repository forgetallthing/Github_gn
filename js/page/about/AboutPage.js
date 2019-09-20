import React, { Component } from 'react'
import { ScrollView, Button, Text, StyleSheet, View, Linking } from 'react-native'
import { MORE_MENU } from '../../common/MORE_MENU';
import GlobalStyles from '../../res/styles/GlobalStyles';
import ViewUtil from '../../util/ViewUtil'
import NavigationUtil from '../../navigator/NavigationUtil'
import AboutCommon, { FLAG_ABOUT } from './AboutCommon'
import config from '../../res/data/config.json'

const THEME_COLOR = "#678";

export default class AboutPage extends Component {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.aboutCommon = new AboutCommon({
            ...this.params,
            navigation: this.props.navigation,
            flagAbout: FLAG_ABOUT.flag_about,
        }, data => this.setState({ ...data })
        );
        this.state = {
            data: config,
        }
    }

    getItem(menu) {
        // const {theme} = this.props;
        return ViewUtil.getMenuItem(() => this.onClick(menu), menu, THEME_COLOR);
    }

    onClick(menu) {
        let RouterName, params = {};
        switch (menu) {
            case MORE_MENU.Tutorial:
                RouterName = 'WebViewPage';
                params.title = '教程';
                params.url = 'https://coding.m.imooc.com/classindex.html?cid=89';
                break;
            case MORE_MENU.About_Author:
                RouterName = 'AboutMePage';
                break;
            case MORE_MENU.Feedback:
                const url = 'mailto://786014381@qq.com';
                Linking.canOpenURL(url)
                    .then(support => {
                        if (!support) {
                            console.log('can\'t handle url:' + url)
                        } else {
                            Linking.openURL(url)
                        }
                    }).catch(e => {
                        console.error(e)
                    })
                break;
        }
        if (RouterName) {
            NavigationUtil.goPage(params, RouterName);
        }
    }

    render() {
        const content = <View>
            {this.getItem(MORE_MENU.Tutorial)}
            <View style={GlobalStyles.line} />
            {this.getItem(MORE_MENU.About_Author)}
            <View style={GlobalStyles.line} />
            {this.getItem(MORE_MENU.Feedback)}
        </View>;

        return this.aboutCommon.render(content, this.state.data.app);
    }
}

