import React,{ useState } from 'react';
import { View, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base'
import {useDispatch, useSelector} from 'react-redux';

import { delVisitHour } from '../../actions/prospectAction';
import { Text, ModalWarning } from '../../components'
import colors from '../../utility/colors';
import language from '../../language/th.json';

const CardVisitHour = ({data}) => {

    const {prospectSelectInfoReducer,prospectReducer,getConfigLovAccountReducer} = useSelector((state) => state);
    const dispatch = useDispatch();
    const [modalVisibleAlert, setmodalVisibleAlert] = useState(false);
    const [modalVisibleDeleteSuccess, setmodalVisibleDeleteSuccess] = useState(false);
    const [deleteItem, setDeleteItem] = useState('')

    const findDay = (data) => {
        if(getConfigLovAccountReducer.lovKeywordDay != ''){ 
          let findDay = getConfigLovAccountReducer.lovKeywordDay.find((item) => {
          return item.lovKeyvalue == data
      })
      return findDay.lovNameTh}
    }

    const onRemove = (DeleteItem) =>{
        setmodalVisibleAlert(true)
        setDeleteItem(DeleteItem)
    }

    const onPressModalDelete = (event) => {
        setmodalVisibleAlert(event);
        setmodalVisibleDeleteSuccess(false);
    }
    const onPressModalDeleteSuccess = (event) => {
        setmodalVisibleDeleteSuccess(event);
        setmodalVisibleAlert(false);
    }

    const handleRemove = () =>{
        let prospectId = prospectSelectInfoReducer.dataSelect.prospect.prospectId
        //  let prospectId = 1
            dispatch(delVisitHour(prospectId,deleteItem))
            if(prospectReducer.delVisitHourSucess)
                setmodalVisibleAlert(false)
                setmodalVisibleDeleteSuccess(true)
    }

    const CardItem = (data) => {
        return(
            <View style={styles.cardArea}>
                <View style={{flexDirection:'row',marginHorizontal:80}}>
                    <View style={{justifyContent:'center',paddingRight:30}}>
                        <Image source={require('../../assets/images/Clock.png')} style={{height:100, width:100}}/>   
                    </View>
                    <View>
                            <View>
                                <Text style={{fontWeight:'bold',fontSize:30}}>{findDay(data.item.date)}</Text>
                            </View> 
                            <FlatList
                                data={data.item.item}
                                // numColumns={3}
                                renderItem={ (visitHour) => {
                                    return (
                                        <View style={{flexDirection:'row',marginHorizontal:15,marginTop:15,marginBottom:5,width:150,justifyContent:'space-between'}}>
                                            <View style={{alignSelf:'center',paddingRight:5}}>
                                                <Icon type='MaterialCommunityIcons' name='clock-time-four-outline' style={{fontSize:28, color:colors.gray}}/>
                                            </View>
                                            {prospectSelectInfoReducer.dataSelect.isOther || prospectSelectInfoReducer.dataSelect.isRecommandBUProspect? 
                                              <View style={{alignSelf:'center'}}>
                                                <Text style={{fontSize:25, color:colors.gray}}>{`${visitHour.item.hourStart} - ${visitHour.item.hourEnd}`}</Text>
                                              </View>
                                            :
                                            <TouchableOpacity onPress={() => onRemove(visitHour.item)}>
                                                <View style={{flexDirection:'row',alignSelf:'center'}}>
                                                    <Text style={{fontSize:25, color:colors.gray}}>{`${visitHour.item.hourStart} - ${visitHour.item.hourEnd}`}</Text>
                                                    <Icon type="Ionicons" name="trash-outline" style={{fontSize:28, color:colors.gray, paddingLeft:15}}/>
                                                </View>
                                            </TouchableOpacity>   
                                            }
                                            
                                        </View>
                                    )
                                } }
                            />
                    </View>
                </View>   
            </View>
        )
    }   

    return(
        <>
        <ScrollView>
            {prospectReducer.visitHourData.records != 0 ? 
                <FlatList 
                    data = {data}
                    renderItem={CardItem}
                />  
            : 
            <View style={{alignSelf:'center', marginTop:20}}>
                <Text style={{fontSize:25}}>ไม่พบข้อมูล</Text>
            </View>
            }
            
        </ScrollView> 
            <ModalWarning
                visible={modalVisibleAlert}
                detailText={language.DELETE}
                onPressConfirm={()=> handleRemove(deleteItem)}
                onPressCancel={()=> onPressModalDelete(false)}/>
            <ModalWarning
                visible={modalVisibleDeleteSuccess}
                detailText={language.DELETESUCCESS}
                onlyCloseButton={true}
                onPressClose={()=> onPressModalDeleteSuccess(false)}/>    
        </>
       
        )
}

const styles =  StyleSheet.create({
    cardArea: {
        flex: 1,
        marginBottom:'5%'
    }
});

export default CardVisitHour;