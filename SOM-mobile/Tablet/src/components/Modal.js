import React from 'react';
import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types'
import { Icon } from 'native-base';

import colors from '../utility/colors';
import Text from './Text';
import Button from './Button';


const modalPop = ({visible, 
                    title, 
                    cancelText = 'Cancel', 
                    onPressCancel, 
                    confirmText = 'Confirm', 
                    onPressConfirm, 
                    onPressUplode,
                    onPressSelectUplode,
                    BUTTON= false, 
                    TWOBUTTON = false ,
                    buttonWidth = 200,
                    onPressButton,
                    children,
                    cancelButtonColor = colors.white,
                    cancelTextColor = colors.primary,
                    confirmTextColor,
                    confirmButtonColor,
                    containerWidth,
                    closeHeaderButton = true,
                    disabledUplodeButton,
                    closeText
                }) =>{

    return(
        <View style={{flex: 1}}>
            <Modal
                animationType = 'slide'
                transparent = {true}
                visible = {visible}>
                <View style={styles.modaltBox}>
                    <View style={[styles.container,{width:containerWidth ? containerWidth : '70%'}]}>
                        <View style={styles.alertTitle}>
                        <Text style={styles.modalTitle}>{title}</Text>
                        {closeHeaderButton ? 
                         <TouchableOpacity onPress={() => onPressCancel(false)} style={{marginHorizontal: 15, justifyContent:'center'}}>
                            {closeText ? <Text style={{color:'white',fontSize:30}}>{closeText}</Text> : <Icon type="MaterialCommunityIcons" name="close"  style={{color:colors.white, fontSize:40}}/>}
                         </TouchableOpacity>
                        :
                        null
                        }  
                        </View>
                        <View>
                           {children}
                        </View>
                        {TWOBUTTON ?
                            <>
                            <View style={{flexDirection: 'row' ,paddingHorizontal: 20, justifyContent: 'center'}}>
                                <View style={[styles.buttonLow, {alignItems: 'flex-end'}]}>
                                    <Button
                                        onPress={onPressSelectUplode ? onPressSelectUplode : () => onPressCancel(false)}
                                        width={'80%'}
                                        title={cancelText}  
                                        fontColor={cancelTextColor}
                                        color={cancelButtonColor}/>
                                </View>
                                <View style={[styles.buttonLow, {alignItems: 'flex-start'}]}>
                                    <Button
                                        disabled={disabledUplodeButton ? disabledUplodeButton: false}
                                        onPress={ onPressUplode ? onPressUplode : () => onPressConfirm(false)}
                                        width={'80%'}
                                        title={confirmText}
                                        color={confirmButtonColor}
                                        fontColor={confirmTextColor}/>
                                </View>
                            </View>
                            </>
                            :
                            BUTTON ?
                            <View style={[styles.buttonLow, {alignItems:'center', justifyContent:'center'}]}>
                                <Button
                                    onPress={onPressButton}
                                    width={buttonWidth}
                                    title={confirmText}/>
                            </View>
                        :
                        null
                        }
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles =  StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: colors.white,
        borderRadius: 10,
        width: '70%',
    },
    modaltBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'rgba(0,0,0,0.6)',
    },
    alertTitle: {
        backgroundColor: colors.primary,
        height: 70,
        width: "100%",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    modalTitle:{
        backgroundColor: colors.primary,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        color: colors.white,
        paddingHorizontal: 10,
        fontSize: 28,
        alignSelf:'center',
    },
    buttonLow: {
        flex: 1,
        marginBottom:'10%',
        paddingHorizontal: 20,
        marginVertical: 10,
    },
});

export default modalPop;

modalPop.propsTypes = {
    onPressCancel: PropTypes.string,
    visible: PropTypes.string,
    title: PropTypes.string,
    detail: PropTypes.string,
    cancelText: PropTypes.string,
    confirmText: PropTypes.string,
}