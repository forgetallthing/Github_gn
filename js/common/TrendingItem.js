import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import HTMLView from 'react-native-htmlview'

export default class TrendingItem extends Component {
    render() {
        const { item } = this.props;
        if (!item) return null;
        let favoriteButton =
            <TouchableOpacity
                style={{ padding: 6 }}
                onPress={() => {

                }}
                underlayColor={'transparent'}
            >
                <FontAwesome
                    name={'star-o'}
                    size={24}
                    style={{ color: 'red' }}
                />
            </TouchableOpacity>
        let description = '<p>' + item.description + '</p>';
        return (
            <TouchableOpacity
                onPress={this.props.onSelect}
            >
                <View style={styles.cell_container}>
                    <Text>{item.fullName}</Text>
                    {/* <Text>{item.description}</Text> */}
                    <HTMLView
                        value={description}
                        onLinkPress={(url) => { }}
                        stylesheet={{
                            p: styles.description,
                            a: styles.description
                        }}
                    />
                    <View style={styles.row}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text>{'Built by:'}</Text>
                            {item.contributors.map((result, i, arr) => {
                                return <Image style={{ height: 22, width: 22, margin: 2 }}
                                    source={{ uri: arr[i] }}
                                    key={i}
                                />
                            })}
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text>{'Star:'}</Text>
                            <Text>{item.starCount}</Text>
                        </View>
                        {favoriteButton}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    cell_container: {
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
