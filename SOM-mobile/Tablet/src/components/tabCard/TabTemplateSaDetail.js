import React, {useState,useEffect} from 'react';
import { View, Image } from 'react-native';
import { Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs';
import 'dayjs/locale/th';

import Text from '../Text'
import Button from '../Button'

import colors from '../../utility/colors';
import { FONT_SIZE } from '../../utility/enum';
import TemplateSa from '../template/TemplateSa'
import {viewTemplateSaResult} from '../../actions/TemplateSaAction'

var buddhistEra = require('dayjs/plugin/buddhistEra')
dayjs.extend(buddhistEra)

require('dayjs/locale/th')


const tabTemplateSaDetail = ({nameProject, userBy,tpSaFormId,recSaFormId, timeUpdate, dateUpdate, Nav, title, children}) => {
    const navigation = useNavigation();
    const [modalShow,setModalShow] = useState(false)
    const [viewTempate,setViewTemplate] = useState(null);
    useEffect(()=>{
        viewResult();
    },[])
    const viewResult = async () =>{
        const data = await viewTemplateSaResult(tpSaFormId,recSaFormId)
        setViewTemplate(data)
    }
    const onPressView = () =>{
        if(viewTempate){
            setModalShow(true)
        }
    }
    return (
        <View style={{paddingHorizontal: 5, paddingVertical: 5, backgroundColor:colors.white, flex: 1}}>
            <TemplateSa  nameProject={nameProject} show={modalShow} onPressCancel={()=>setModalShow(false)} data={viewTempate} userBy={userBy}/>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <View style={{marginEnd: 20}}>
                    <Image source={require('../../assets/images/submenu/Component-15.png')}/>
                </View>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            {/* <View style={{marginEnd: 10}}>
                                <Text style={{fontWeight:'bold', fontSize: FONT_SIZE.TEXT}}>ชื่อโครงการ</Text>
                            </View> */}
                            <View style={{marginEnd: 20, flex: 1}}>
                                <Text style={{fontWeight:'bold', fontSize: FONT_SIZE.TEXT}}>{nameProject}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{marginEnd: 10}}>
                                <Text>โดย</Text>
                            </View>
                            <View>
                                <Text>{userBy}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{marginStart: 5}}>
                                    <Icon 
                                        type="MaterialCommunityIcons" 
                                        name="clock-time-four-outline"/>
                                </View>
                                <View >
                                    <Icon 
                                        type="MaterialCommunityIcons" 
                                        name="circle-medium"/>
                                </View>
                                <View style={{marginStart: 5}}>
                                    <Text>{dayjs(dateUpdate).locale('th').format('D/M/BBBB')}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <Button 
                                onPress={onPressView}
                                title={'View'}
                                width= {150}
                                buttonHeigth={50}/>
                        </View>  
                    </View>
                </View>
            </View>            
        </View>
    )
}

export default tabTemplateSaDetail;