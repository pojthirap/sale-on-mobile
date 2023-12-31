import React,{useEffect,useState} from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import {useDispatch,useSelector} from 'react-redux';

import { CardSaleVisit, Text, Header } from '../../components';
import colors from '../../utility/colors';
import { FONT_SIZE } from '../../utility/enum';
import { saleVisit,resetAllTrip } from '../../actions/SaleVIsit';

const SaleVisit = () =>{

    const dispatch = useDispatch();
    const [data,setData] = useState([])

    useFocusEffect(
        React.useCallback(() => {
            dispatch(resetAllTrip())
            getData();
        }, [])
      );

    useEffect(()=>{
        getData();
    },[])
    
    const getData = async () =>{
        const data = await saleVisit();
        let mock = [{"planTripId":499,"planTripName":"24Oct for Prite","planTripDate":"2021-10-24T00:00:00","assignEmpId":"10000112","remark":"","startCheckinLocId":null,"startCheckinMileNo":null,"startCheckinDtm":null,"startCheckoutDtm":null,"stopCheckinLocId":null,"stopCheckinMileNo":null,"stopCheckinDtm":null,"status":"7","createUser":"10000071","createDtm":"2021-10-24T12:21:13","updateUser":"10000071","updateDtm":"2021-10-24T12:21:13","stopCalcKm":null,"firstName":"ประดิษฐ์พร","lastName":"ไทยเจริญ","statusDesc":"Assigned"}]
        setData(data)
    }
    const navigation = useNavigation()

    return(
        <View style={{flex: 1, backgroundColor: colors.grayborder}}>
            <Header/>
            <View style={{height:200, paddingHorizontal:40, paddingVertical:20}}>
                <Text style={{fontSize:35}}>Good morning,</Text>
                <Text style={{fontSize:55, fontWeight:'bold'}}>Sales Visit</Text>
            </View>
            <ScrollView style={{backgroundColor: colors.white}}>
                <View style={{marginHorizontal: 40, marginVertical: 30}}>
                    <Text style={{fontSize:FONT_SIZE.HEADER, fontWeight:'bold'}}>Plan</Text>
                </View>
                <CardSaleVisit planTripData={data} onPressView={() => {
                    dispatch(resetAllTrip())
                    navigation.navigate('SaleVisitPlanTripScreen',{planTrip:data})
                }} navigation={navigation} />
            </ScrollView>

        </View>
        )
}

export default SaleVisit;