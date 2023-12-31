import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Icon } from 'native-base';
import { Calendar } from 'react-native-big-calendar'
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import {useDispatch, useSelector} from 'react-redux';

import colors from '../utility/colors'
import { Header, Text } from '../components';
import { FONT_SIZE } from '../utility/enum';
import { getSearchPlanTrip, getEmpForAssignPlanTrip, mergPlanTrip } from '../actions/SaleVisitPlanAction';
import { getConfigLovPlanStatus } from '../actions/getConfigLovAction';
import { getSearchEmailJobForPlanTrip } from '../actions/homeAction';

const HomeScreen = () => {
    const navigation = useNavigation()
    const [SelectDate, setSelectDate] = useState(dayjs())
    const [selectMonth, setSelectMonth] = useState(dayjs())
    const onPressNext = () => { 
        setSelectMonth(dayjs(selectMonth).add( 1, 'month')) 
    }
    const onPressBack = () => {
        setSelectMonth(dayjs(selectMonth).add( -1, 'month'))
    }
    const {saleVisitPlanReducer, } = useSelector((state) => state);
    const {getConfigLovReducer} = useSelector((state) => state);
    const {homeReducer} = useSelector((state) => state);
    const dispatch = useDispatch();
    const [dataEventList, setDataEventList] = useState([]);

    useEffect(() => {
        createEventList()
    },[saleVisitPlanReducer.dataPlanTrip])

    useEffect(() => {
        let dateCalendar = dayjs(selectMonth).locale('th').format('YYYYMM');
        dispatch(getSearchPlanTrip(dateCalendar))
        dispatch(getSearchEmailJobForPlanTrip(dateCalendar))

    },[selectMonth])

    useFocusEffect(
        React.useCallback(() => {
            setSelectDate(dayjs())
            setSelectMonth(dayjs())
            setTimeout(() => {
                dispatch(getConfigLovPlanStatus("PLAN_TRIP_STATUS"))
                dispatch(getEmpForAssignPlanTrip()) 
                
            }, 1000)
            return () => {
                //when unFocus
            };
        }, [])
    );

    const handleNavigateScreen = (date) => {
        navigation.navigate('SaleVisitPlanScreen', {SelectDatePlan : date, SelectMonthPlan: selectMonth})

    }

    const createEventList = () => {
        if (!saleVisitPlanReducer.dataPlanTrip) return
        let eventList = saleVisitPlanReducer.dataPlanTrip.map((item)=>{
            var timeAdd = new Date(item.planTripDate);
            timeAdd.setHours(timeAdd.getHours() + 1);

            return {
                title: item.planTripName,
                start: timeAdd,
                end: timeAdd,
                status: item.status
            }
        })
        return setDataEventList(eventList);
    };

    const TextStatusColor = (Status) =>  {
        if(getConfigLovReducer.lovKeywordPlanStatus != ''){ 
            let findStatusColor = getConfigLovReducer.lovKeywordPlanStatus.find((item) => {
            return item.lovKeyvalue == Status
        })
            let color = findStatusColor.condition1.split('|')
            return color[1]
        }
    };

    const backgroundStatus= (Status) =>  {
        if(getConfigLovReducer.lovKeywordPlanStatus != ''){ 
            let findStatusColor = getConfigLovReducer.lovKeywordPlanStatus.find((item) => {
            return item.lovKeyvalue == Status
        })
            let color = findStatusColor.condition1.split('|')
            return color[0]
        }
    }


    return (
        <View style={styles.container}>
            <Header/>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View style={{paddingHorizontal:40, paddingTop:25}}>
                    <Text style={{fontSize:35}}>Good morning,</Text>
                </View>
            </View>
            {/* {Notification Area} */}
            <View style={[styles.styleShadow,{backgroundColor:'white',marginHorizontal:50, marginBottom: 50, height:350, borderRadius:20}]}>
                <ScrollView>
                    <View style={{paddingHorizontal:30,paddingTop:30,paddingBottom:5,flexDirection:'row'}}>
                        <View style={{justifyContent:'center',paddingRight:5}}>
                            <Icon  type="FontAwesome" name="bell" style={{ color: colors.primary, fontSize: 25 }}/>
                        </View>
                        <View style={{justifyContent:'center'}}>
                            <Text style={{color:colors.primary, fontSize:35}}>Notification</Text>
                        </View> 
                    </View>
                    <View style={{paddingHorizontal:65}}>
                        <FlatList 
                            data={homeReducer.dataEmail}
                            renderItem={(data, index)=> {
                                if(data.item.emailTemplateName == "Waiting for approve") {
                                    return (
                                        <View>
                                            <Text style={{color: data.index % 2 == 0 ? colors.black : colors.primary, marginBottom: 5}}>{`Wait for approve: ${data.item.saleRepName}, ${data.item.planTripName}[${data.item.planTripId}], ${dayjs(data.item.planTripDate).locale('th').format('D MMMM BBBB')}`}</Text>                                         
                                        </View>
                                    )
                                }
                                if(data.item.emailTemplateName == "Approve") {
                                    return (
                                        <View>
                                            <Text style={{color: data.index % 2 == 0 ? colors.black : colors.primary, marginBottom: 5}}>{`Approve: ${data.item.planTripName}[${data.item.planTripId}], ${dayjs(data.item.planTripDate).locale('th').format('D MMMM BBBB')}`}</Text>                                         
                                        </View>
                                    )
                                }
                                if(data.item.emailTemplateName == "Reject") {
                                    return (
                                        <View>
                                            <Text style={{color: data.index % 2 == 0 ? colors.black : colors.primary, marginBottom: 5}}>{`Reject: ${data.item.planTripName}[${data.item.planTripId}], ${dayjs(data.item.planTripDate).locale('th').format('D MMMM BBBB')}`}</Text>                                         
                                        </View>
                                    )
                                }
                                if(data.item.emailTemplateName == "Assign") {
                                    return (
                                        <View>
                                            <Text style={{color: data.index % 2 == 0 ? colors.black : colors.primary, marginBottom: 5}}>{`Assign: ${data.item.saleSupName}, ${data.item.planTripName}[${data.item.planTripId}], ${dayjs(data.item.planTripDate).locale('th').format('D MMMM BBBB')}`}</Text>                                         
                                        </View>
                                    )
                                }

                                
                            }} 
                        />
                    </View>
                </ScrollView>
            </View>

            <View style={{height: '49%'}}>
                {/* {Calenda Area} */}
                <View style={{flexDirection:'row', marginLeft:50}}>
                    <View style={{flexDirection:'row', paddingRight:20}}>
                        <View style={{backgroundColor:colors.white,width: 230,borderRadius:10,height: 60}}>
                            <View style={{flexDirection:'row', justifyContent:'center', marginHorizontal:10,paddingTop:13}}>
                                <View style={{paddingRight:3}}>
                                    <Icon type="MaterialCommunityIcons" name="calendar-blank-outline" style={{ color: colors.gray, fontSize: 30 }}/>
                                </View>
                                <View>
                                    <Text style={{fontSize: 24}}>{dayjs(SelectDate).locale('th').format('dddd, D MMM BBBB')}</Text>
                                </View>                                  
                            </View>                               
                        </View>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={{justifyContent:'center'}} onPress={() => onPressBack()}>
                            <Icon type='Ionicons' name='caret-back-circle-outline' style={{fontSize:30,alignSelf:'center'}}/>
                        </TouchableOpacity>
                        <View style={{justifyContent:'center', paddingHorizontal:20}}>
                            <Text style={{alignSelf:'center', fontSize:FONT_SIZE.TITLE, fontWeight:'bold'}}>{dayjs(selectMonth).locale('th').format('MMMM,BBBB')}</Text>
                        </View>
                        <TouchableOpacity style={{justifyContent:'center'}} onPress={() => onPressNext()}>
                            <Icon type='Ionicons' name='caret-forward-circle-outline' style={{fontSize:30,alignSelf:'center'}}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor:colors.white , marginHorizontal:35, borderRadius:20, marginVertical:40}}>
                    <Calendar 
                        events={dataEventList} 
                        height={80} 
                        date={selectMonth}
                        mode={'month'}
                        swipeEnabled={false}
                        locale="th"
                        renderEvent={(item) => {
                            return <View style={{ height: 15, backgroundColor: backgroundStatus(item.status), marginTop: 3, borderRadius: 5, justifyContent: 'center'}}>
                                <Text style={{ fontSize: 13, color: TextStatusColor(item.status), paddingLeft: 5 }}>{item.title}</Text>
                            </View>
                        }}
                        maxVisibleEventCount={2}
                        style={{ marginTop: -320}}
                        onPressCell={(date) => handleNavigateScreen(date)}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: colors.greenBGStatus,
    },
    styleShadow: {
        shadowOffset: {
            height: 3,
            width: 5
        },
        shadowRadius: 20,
        shadowOpacity: 0.6,
        shadowColor: colors.black,
        elevation: 10,
      },
});


export default HomeScreen;
