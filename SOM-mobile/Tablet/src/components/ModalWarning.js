import React from 'react';
import { View, StyleSheet, Modal, ScrollView } from 'react-native';
import { Icon } from 'native-base';

import colors from '../utility/colors';
import Text from './Text';
import Button from './Button';

import { FONT_SIZE } from '../utility/enum';

const modalWarning = ({visible, 
                    onPressCancel, 
                    onPressConfirm,
                    onPressClose,
                    onlyCloseButton= false, 
                    WARNINGTITLE = false ,
                    buttonWidth = 200,
                    detailText,
                    cancelButtonColor = colors.white,
                    cancelTextColor = colors.primary,
                    confirmTextColor,
                    confirmButtonColor,
                    buttonClose = 'Close',
                    ButtonCancel = 'Cancel',
                    ButtonConfirm = 'Confirm',
                    backgroundColor = colors.primary,
                    detailOject 
                }) =>{

    return(
        <View style={{flex: 1}}>
            <Modal
                animationType = 'slide'
                transparent = {true}
                visible = {visible}>
                <View style={styles.modaltBox}>
                    <View style={styles.container}>
                        {WARNINGTITLE ?
                            <View style={[styles.alertTitle,{backgroundColor:backgroundColor}]}>
                                <Icon type="FontAwesome" name="exclamation-triangle"  style={{color:colors.white, fontSize:30}}/>
                                <Text style={styles.modalTitle}>เกิดความผิดพลาด</Text>
                            </View>
                            :
                            <View style={[styles.alertTitle,{backgroundColor:backgroundColor}]}>
                                <Text style={styles.modalTitle}>แจ้งเตือน</Text>
                            </View>
                        }
                        <ScrollView>
                            <View style={{paddingHorizontal: 30, marginVertical: 20}}>
                                {detailOject ? 
                                    detailOject
                                :
                                    <Text>{detailText}</Text>
                                }
                            </View>
                        </ScrollView>
                        {onlyCloseButton ?
                            <View style={styles.bottom}>
                                <Button
                                    onPress={onPressClose}
                                    width={buttonWidth}
                                    title={buttonClose}
                                    buttonHeigth={50}
                                    width={120}/>
                            </View>
                            :
                            <View style={styles.bottom}>
                                <View style={{marginEnd: 5}}>
                                    <Button
                                        onPress={onPressCancel}
                                        title={ButtonCancel}  
                                        fontColor={cancelTextColor}
                                        color={cancelButtonColor}
                                        buttonHeigth={50}
                                        width={120}/>
                                </View>
                                <View>
                                    <Button
                                        onPress={onPressConfirm}
                                        title={ButtonConfirm}
                                        color={confirmButtonColor}
                                        fontColor={confirmTextColor}
                                        buttonHeigth={50}
                                        width={120}/>
                                </View>
                            </View>
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
        maxHeight: 500,
    },
    modaltBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'rgba(0,0,0,0.6)',
    },
    alertTitle: {
        height: 70,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalTitle:{
        color: colors.white,
        marginHorizontal: 10,
        alignSelf:'center',
        fontSize: FONT_SIZE.SUBTITLE,
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    }
});

export default modalWarning;