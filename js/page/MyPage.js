import React, { Component } from 'react'
import { ScrollView, Button, Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import NavigationBar from '../common/NavigationBar'
import { MORE_MENU } from '../common/MORE_MENU';
import Ionicons from 'react-native-vector-icons/Ionicons'
import GlobalStyles from '../res/styles/GlobalStyles';

const THEME_COLOR = "#678";

export default class MyPage extends Component {

    getItem(menu) {
        const {theme} = this.props;
        return ViewUtil.getMenuItem(() => this.onClick(menu), menu, THEME_COLOR);
    }

    onClick(menu) {

    }

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
            <View style={GlobalStyles.root_container}>
                {navigationBar}
                <ScrollView>
                    <TouchableOpacity
                        onPress={() => this.onClick(MORE_MENU.About)}
                    >
                        <View style={styles.about_left}>
                            <Ionicons
                                name={MORE_MENU.About.icon}
                                size={40}
                                style={{
                                    marginRight: 10,
                                    color: THEME_COLOR,
                                }}
                            />
                            <Text>GitHub Popular</Text>
                        </View>
                        <Ionicons
                            name={'ios-arrow-forward'}
                            size={16}
                            style={{
                                marginRight: 10,
                                alignSelf: 'center',
                                color: THEME_COLOR,
                            }} />
                    </TouchableOpacity>
                    <View style={GlobalStyles.line}></View>
                    {this.getItem(MORE_MENU.Tutorial)}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    about_left: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    item: {
        backgroundColor: 'white',
        padding: 10,
        height: 90,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    groupTitle: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 5,
        fontSize: 12,
        color: 'gray'
    }
});