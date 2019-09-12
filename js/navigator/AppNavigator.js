import { createStackNavigator } from 'react-navigation-stack';
import {
    createSwitchNavigator, createAppContainer
} from "react-navigation";
import WelcomePage from '../page/WelcomePage'
import HomePage from '../page/HomePage'
import DetailPage from '../page/DetailPage'

const InitNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            header: null //禁用bar
        }
    }
})

const MainNavigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            header: null //禁用bar
        }
    },
    DetailPage: {
        screen: DetailPage,
        navigationOptions: {
            // header: null //禁用bar
        }
    }
})

export default createSwitchNavigator({
    Init: InitNavigator,
    Main: MainNavigator,
}, {
    navigationOptions: {
        initialRouteName :'Init',
        header: null //禁用bar
    }
})