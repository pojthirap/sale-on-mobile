import React, {useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import {useDispatch, useSelector} from 'react-redux';
import Text from './Text';
import colors from '../utility/colors';
import { FONT_SIZE } from '../utility/enum';


const subMenu = ({titleSubMenu, ScreenName, iconPhoto, isFocus = true, heightBox=150, widthBox=200, heightPhoto= 90, widthPhotot=90, marginPhoto=20, sizeFont=FONT_SIZE.TEXT}, prosp) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();


    return (
        <TouchableOpacity  onPress={()=> navigation.navigate('AccountTab', {'screen' : ScreenName})}>
            <View  style={[styles.container, {height : heightBox, width: widthBox}]}>
                <View  style={{ flex: 1,justifyContent:'center',alignItems:'center'}}>
                    <View  style={{justifyContent: 'center', alignItems:'center', marginHorizontal: '1%'}}>
                        <Image key={Math.random()}  source={iconPhoto} style={[{tintColor: isFocus ? false : colors.gray}, {width: widthPhotot, height: heightPhoto, marginBottom: marginPhoto }]}/>
                    </View>
                    <View style={{alignSelf: 'center', justifyContent:'center'}}>
                        <Text style={{fontSize: sizeFont}}>{titleSubMenu}</Text>
                    </View>  
                </View>              
            </View>     
        </TouchableOpacity>
    )
}

const styles =  StyleSheet.create({
    container: {
        flex: 1/5,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        marginVertical: 10,
    },
})

export default subMenu;