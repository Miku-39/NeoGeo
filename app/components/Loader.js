import React, { Component } from 'react'
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native'

import { Metrics } from '../theme'

export default class Loader extends Component {
    render () {
        return (
            <View style={{flex: 1}}>
                { this.props.children }
                {
                    this.props.isLoading &&
                    <View style={styles.dialogContainer}>
                        <View style={styles.dialog}>
                            <ActivityIndicator size='large' />
                            <Text style={{marginRight: 10}}>Обновление заявок</Text>
                        </View>
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    dialogContainer: {
        position: 'absolute', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: Metrics.screenWidth, 
        height: Metrics.screenHeight - Metrics.navBarHeight, 
        backgroundColor: 'rgba(0,0,0,0)'
    },
    dialog: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: 210, 
        height: 50, 
        backgroundColor: 'rgba(0,0,0,0.1)', 
        borderRadius: 30,
    }
})