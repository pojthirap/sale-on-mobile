import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

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
const CardSaleVisitPlantrip = ({ isStatus = true,
    planTripData,
    onPressView,
    onPressAccept,
    isSaleVisitPlan = false,
}) => {
    const { getConfigLovReducer } = useSelector((state) => state);
    const { authReducer } = useSelector((state) => state);
    const dispatch = useDispatch();
    const today = new Date()
    const [dataData, setDateData] = useState(dayjs(today).locale('th').format('YYYY-MM-DDTHH:mm:ss'));

    useEffect(() => {
        if (getConfigLovReducer.lovKeyword_Loding) {
            dispatch(getConfigLov("PLAN_TRIP_STATUS"))
        }
    }, [])

    const findStatue = (Status) => {
        if (getConfigLovReducer.lovKeyword != '') {
            let findStatus = getConfigLovReducer.lovKeyword.find((item) => {
                return item.lovKeyvalue == Status
            })
            return findStatus.lovNameTh
        }
    };

    const TextStatusColor = (Status) => {
        if (getConfigLovReducer.lovKeyword != '') {
            let findStatusColor = getConfigLovReducer.lovKeyword.find((item) => {
                return item.lovKeyvalue == Status
            })
            let color = findStatusColor.condition1.split('|')
            return color[1]
        }
    };

    const backgroundStatus = (Status) => {
        if (getConfigLovReducer.lovKeyword != '') {
            let findStatusColor = getConfigLovReducer.lovKeyword.find((item) => {
                return item.lovKeyvalue == Status
            })
            let color = findStatusColor.condition1.split('|')
            return color[0]
        }
    }

    const CardArea = (planTripData) => {
        return (
            <View style={[styles.container, styles.styleShadow]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                    <View style={{ flexDirection: 'row', flex: 1.5 }}>
                        <View style={{ maxWidth: 300 }}>
                            <Text style={{ fontSize: FONT_SIZE.SUBTITLE, fontWeight: 'bold' }} numberOfLines={1}>{planTripData.item.planTripName}</Text>
                        </View>
                        <View style={{ paddingStart: 10, width: '35%', flex: 1 }}>
                            {isStatus ?
                                isSaleVisitPlan ?
                                    <View style={{ backgroundColor: backgroundStatus(planTripData.item.status), height: 40, width: 160, justifyContent: 'center', borderRadius: 40 }}>
                                        <Text style={{ color: TextStatusColor(planTripData.item.status), alignSelf: 'center', fontSize: 22 }}>{findStatue(planTripData.item.status)}</Text>
                                    </View>
                                    :
                                    null
                                :
                                null
                            }
                        </View>
                    </View>
                    <View style={{ alignSelf: 'center' }}>
                        <Text numberOfLines={1}>โดย {`${planTripData.item.firstName} ${planTripData.item.lastName}`}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                    <View>
                        <View style={{ paddingTop: 15 }}>
                            <Text>วันที่เข้าเยี่ยม : {dayjs(planTripData.item.planTripDate).locale('th').format(' dddd, D MMMM BBBB')}</Text>
                        </View>
                        <View>
                            <Text>วันที่สร้าง : {dayjs(planTripData.item.createDtm).locale('th').format(' dddd, D MMMM BBBB')}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {
                            planTripData.item.planTripDate > dataData ?
                                isSaleVisitPlan && planTripData.item.status === "7" ?
                                    <>
                                        <View style={{ alignSelf: 'center', paddingRight: 5 }}>
                                            <Button title={'Accept'} textSize={30} onPress={() => onPressAccept(planTripData.item)} />
                                        </View>
                                        <View style={{ alignSelf: 'center' }}>
                                            <Button title={'View'} textSize={30} onPress={() => onPressView(planTripData.item, planTripData.item.createUser == authReducer.userProfile.empId ? true : false)} />
                                        </View>
                                    </>
                                    :
                                    <View style={{ alignSelf: 'center' }}>
                                        <Button title={'View'} textSize={30} onPress={() => onPressView(planTripData.item, planTripData.item.createUser == authReducer.userProfile.empId ? true : false)} />
                                    </View>
                                :
                                <View style={{ alignSelf: 'center' }}>
                                    <Button title={'View'} textSize={30} onPress={() => onPressView(planTripData.item, planTripData.item.createUser == authReducer.userProfile.empId ? true : false)} />
                                </View>
                        }
                    </View>
                </View>
            </View>
        )
    }

    return (
        <FlatList
            data={planTripData}
            renderItem={(planTripData) => CardArea(planTripData)}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 40,
        height: 200,
        marginHorizontal: 30,
        marginBottom: 20
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

export default CardSaleVisitPlantrip;