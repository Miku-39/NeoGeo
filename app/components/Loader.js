import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'




export default Loader = props => props.isLoading ? 
    <ActivityIndicator /> :
    props.children