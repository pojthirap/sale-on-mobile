import React, { useState } from 'react'
import { View, ScrollView, StyleSheet, FlatList, TouchableOpacity, Modal as DefaultModal, Dimensions } from 'react-native';
import { Icon } from 'native-base';
import { Text } from '../../components'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const FuccTable = (props) => {
    const [fullScreenModal, setFullScreenModal] = useState(props.isShow == true ? true : false)

    const handleChange = (status) => {
        // if (!props.onChange) setFullScreenModal(false)
        setFullScreenModal(status)
        props.onChange(status)
    }

    return (
        <View>
            <View style={{ justifyContent: 'center', alignItems: 'flex-end'}}>
                <TouchableOpacity onPress={() => handleChange(true)}>
                    <Icon type="MaterialCommunityIcons" name="arrow-expand-all" style={{  fontSize: 50, paddingBottom: 20 }} size={8}/>
                </TouchableOpacity>
            </View>
            <View>
                {props.children}
            </View>
            <DefaultModal
                animationType="slide"
                visible={fullScreenModal}
                onRequestClose={() => {
                    handleChange(false);
                }}
            >
                <View style={{ flex: 1, width: windowWidth, height: windowHeight }}>
                    <View style={{ justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'white', position: 'absolute', zIndex: 2, width: windowWidth, height: 80, paddingTop: 10, paddingRight: 20}}>
                        <TouchableOpacity onPress={() => handleChange(false)}>
                            <Icon type="MaterialCommunityIcons" name="arrow-collapse-all" style={{ fontSize: 50, paddingBottom: 20 }} size={9}/>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        horizontal
                        style={{
                            width: windowHeight, height: windowWidth,
                            transform: [{ rotate: '90deg' }],
                            paddingTop: 500,
                            paddingLeft: 100,
                            height: '100%',
                            paddingBottom: 50,
                            position: 'absolute',
                            zIndex: 1,
                            flexDirection: "row",
                        }}>
                        <ScrollView style={{ marginRight: 150, }}>
                            {props.children}
                        </ScrollView>
                    </ScrollView>
                </View>
            </DefaultModal>
        </View>
    )
}

export default FuccTable
