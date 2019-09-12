/**
 * @format
 */

import {AppRegistry,YellowBox} from 'react-native';
import AppNavigator from './js/navigator/AppNavigator';
import {name as appName} from './app.json';
import {
    createAppContainer
} from "react-navigation";

console.disableYellowBox = true;
YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
    'Remote debugger is in a background tab which may cause apps to perform slowly.'
]);

AppRegistry.registerComponent(appName, () => createAppContainer(AppNavigator));
