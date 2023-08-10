import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import colors from '../../utility/colors';
import { SALEVISIT_STATUS, FONT_SIZE, SALEVISITPLAN_STATUS } from '../../utility/enum';
import Text from '../Text';
import Button from '../Button';

import { FlatList } from 'react-native-gesture-handler';
import dayjs from 'dayjs'
var buddhistEra = require('dayjs/plugin/buddhistEra')
dayjs.extend(buddhistEra)
import { getConfigLov } from '../../actions/getConfigLovAction';

require('dayjs/locale/th')

const CardSaleVisit = ({isStatus = true,
                        planTripData,
                        onPressView,
                        onPressAccept,
                        isSaleVisitPlan = false,
                        onPressViewWaitApprove,
                        navigation,
                        goBack,
                    }) =>{

    const { getConfigLovReducer, authReducer } = useSelector((state) => state);
    const dispatch = useDispatch();
    let listPermission = authReducer.userProfile.listPermObjCode;

    const [perButtonView,setPerButtonView] = useState(false);

    useEffect(() => {
        if (getConfigLovReducer.lovKeyword_Loding) {
            dispatch(getConfigLov("PLAN_TRIP_STATUS")) 
        }
        // if(listPermission){
        //     findPermission()
        // }
    }, [])

   

    const backgroundStatus= (Status) =>  {
        if(getConfigLovReducer.lovKeyword != ''){ 
            let findStatusColor = getConfigLovReducer.lovKeyword.find((item) => {
            return item.lovKeyvalue == Status
        })
            let color = findStatusColor.condition1.split('|')
            return color[0]
        }
    } 
    const findPermission = () =>{
        let ButtonView = listPermission.find((item) => {
            return item.permObjCode == "FE_VISIT_S01_VIEW"
        })
        if(ButtonView.permObjCode  == "FE_VISIT_S01_VIEW"){
            setPerButtonView(true)
        }
    }

    const findStatue = (Status) => {
        if(getConfigLovReducer.lovKeyword != ''){ 
            let findStatus = getConfigLovReducer.lovKeyword.find((item) => {
            return item.lovKeyvalue == Status
        })
        if (!findStatus.lovNameTh) return
        return findStatus.lovNameTh
    }};

    const TextStatusColor = (Status) =>  {
        if(getConfigLovReducer.lovKeyword != ''){ 
            let findStatusColor = getConfigLovReducer.lovKeyword.find((item) => {
            return item.lovKeyvalue == Status
        })
            let color = findStatusColor.condition1.split('|')
            return color[1]
        }
    };


    

    const CardArea =(planTripData) =>{
        return (
            <View style={[styles.container,styles.styleShadow]}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View style={{flex:1,flexDirection:'row'}}>
                    <View style={{width:380}}>
                        <Text style={{fontSize:FONT_SIZE.SUBTITLE, fontWeight:'bold'}} numberOfLines={1}>{planTripData.item.planTripName}</Text>
                    </View>
                    <View style={{paddingStart: 10, width: '35%'}}>                    
                        {isStatus ?
                            isSaleVisitPlan ?
                                // planTripData.item.status === 2 ?                                    
                                <View style={{backgroundColor:backgroundStatus(planTripData.item.status) || colors.redBGStatus,height:40,width:'95%',justifyContent:'center',borderRadius:40}}>
                                    {/* <Text style={{color:'red',alignSelf:'center',fontSize:22}}>{SALEVISITPLAN_STATUS[planTripData.item.status]}</Text> */}
                                    <Text style={{color:TextStatusColor(planTripData.item.status) || 'red',alignSelf:'center',fontSize:22}}>{findStatue(planTripData.item.status)}</Text>
                                </View>
                                // :
                                // planTripData.item.status === 1 || 3 ?
                                // <View style={{backgroundColor:colors.orangeBGStatus,height:40,width:'95%',justifyContent:'center',borderRadius:40}}>
                                //     <Text style={{color:colors.orange,alignSelf:'center',fontSize:22}}>{SALEVISITPLAN_STATUS[planTripData.item.status]}</Text>                    
                                // </View>
                            :
                            planTripData.item.status === 1 ?                                    
                                <View style={{backgroundColor: colors.greenBGStatus,height:40,width:'95%',justifyContent:'center',borderRadius:40}}>
                                    <Text style={{color:colors.primary,alignSelf:'center',fontSize:22}}>{SALEVISIT_STATUS[planTripData.item.status]}</Text>                    
                                </View>
                            :
                            planTripData.item.status === 2 ?
                                <View style={{backgroundColor:colors.orangeBGStatus,height:40,width:'95%',justifyContent:'center',borderRadius:40}}>
                                    <Text style={{color:colors.orange,alignSelf:'center',fontSize:22}}>{SALEVISIT_STATUS[planTripData.item.status]}</Text>                    
                                </View>
                            :
                            null
                            :
                            null
                            // :
                            // null
                        }
                    </View> 
                </View>
                <View style={{alignSelf:'center'}}>
                    <Text>โดย {`${planTripData.item.firstName} ${planTripData.item.lastName}`}</Text>
                </View>
            </View>
           
           <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View>
                    <View style={{paddingTop:15}}>
                        <Text>วันที่เข้าเยี่ยม : {dayjs(planTripData.item.planTripDate).locale('th').locale('th').format(' dddd, D MMMM BBBB')}</Text>
                    </View>
                    <View>
                        <Text>วันที่สร้าง : {dayjs(planTripData.item.createDtm).locale('th').locale('th').format(' dddd, D MMMM BBBB')}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row', flex:1, justifyContent: 'flex-end'}}>
                    {
                    // perButtonView == true ? 
                    isSaleVisitPlan &&  planTripData.item.status === "A" ?
                    <>
                        {/* <View style={{alignSelf:'center', paddingRight:5}}>
                            <Button title={'Accept'} textSize={30} onPress={onPressAccept}/>
                        </View> */}
                        <View style={{alignSelf:'center'}}>
                            <Button title={'View'} textSize={30} onPress={()=>navigation.navigate('SaleVisitPlanTripScreen',{planTrip:planTripData.item})}/>
                        </View>
                    </>  
                    :
                    isSaleVisitPlan &&  planTripData.item.status === "A" ?
                        <View style={{alignSelf:'center'}}>
                            <Button title={'View'} textSize={30} onPress={onPressViewWaitApprove}/>
                        </View>
                    :
                        <View style={{alignSelf:'flex-end',alignItems:'flex-end'}}>
                            <View style={{flexDirection:'row',marginLeft:20}}>
                            <View style={{backgroundColor:backgroundStatus(planTripData.item.status),height:40,width:160,justifyContent:'center',borderRadius:40,marginRight:10,marginTop:5}}>
                                        <Text style={{color:TextStatusColor(planTripData.item.status),alignSelf:'center',fontSize:22}}>{planTripData.item.statusDesc}</Text>
                            </View>
                            <Button title={'View'} textSize={30} onPress={()=>navigation.navigate('SaleVisitPlanTripScreen',{planTrip:planTripData.item})} width="40%"/>
                                </View>
                            
                        </View>
                    // :
                    // null
                    }
                    
                </View>
               
           </View>
        </View>
        )}
    
    return(
        <FlatList 
            data={planTripData}
            renderItem={(planTripData) => CardArea(planTripData)}
            ListEmptyComponent={()=>{
                return (<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text>ไม่พบข้อมูล</Text>
                </View>)
            }}
        />
        )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:colors.white,
        borderRadius:20,
        padding: 40,
        height: 200,
        marginHorizontal:30,
        marginBottom:20
    },
    styleShadow: {
        shadowOffset: {
            height: 3,
            width: 5
        },
        shadowRadius: 20,
        shadowOpacity: 0.6,
        shadowColor: colors.grayDark,
        elevation: 10,
      },
});

export default CardSaleVisit;