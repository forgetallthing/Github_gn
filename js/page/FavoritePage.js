import React, { Component } from 'react';
import { Button,Text, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import actions from "../action/index";

class FavoritePage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}> FavoritePage </Text>
                <Button
                    title={"change color"}
                    onPress={() => {
                        this.props.onThemeChange('#206')
                    }}
                />
            </View>
        )
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

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme))
})

export default connect(mapStateToProps, mapDispatchToProps)(FavoritePage)