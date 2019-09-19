import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import BaseItem from './BaseItem';
import Dimensions from 'Dimensions'

const width = Math.floor(Dimensions.get('window').width);

export default class PopularItem extends BaseItem {
    render() {
        const { projectModel } = this.props;
        const { item } = projectModel;
        if (!item || !item.owner) return null;
        return (
            <TouchableOpacity
                onPress={() => this.onItemClick()}
            >
                <View style={styles.cell_container}>
                    <Text style={{ flex: 1 }}>{item.full_name}</Text>
                    <Text>{item.description}</Text>
                    <View style={styles.row}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text>{'Author:'}</Text>
                            <Image style={{ height: 22, width: 22 }}
                                source={{ uri: item.owner.avatar_url }}
                            />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text>{'Star:'}</Text>
                            <Text>{item.stargazers_count}</Text>
                        </View>
                        {this._favoriteIcon()}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    cell_container: {
        width: width,
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderColor: '#dddddd',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2
    },
    row: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121',
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575',
    }
})
