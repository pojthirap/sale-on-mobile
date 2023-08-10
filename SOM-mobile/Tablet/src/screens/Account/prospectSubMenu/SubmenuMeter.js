import React,{useState,useEffect} from 'react';

import {useSelector} from 'react-redux';
import ImageView from 'react-native-image-view';

import { View, FlatList, ScrollView, StyleSheet,Dimensions,TouchableOpacity,Image, FullTable} from 'react-native';
import { Text,Button,Modal } from '../../../components';
import colors from '../../../utility/colors';
import { FONT_SIZE } from '../../../utility/enum';
import { useNavigation } from '@react-navigation/native'
import {searchMeterTab } from '../../../actions/MeterTabAction' 
const {width,height} = Dimensions.get('window')
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import {baseUrl} from '../../../api/Axios'
var buddhistEra = require('dayjs/plugin/buddhistEra')
dayjs.extend(buddhistEra)

require('dayjs/locale/th')
const SubmenuMeter = () => {
    const {prospectSelectInfoReducer} = useSelector((state) => state);
    const [modalVisible, setmodalVisible] = useState(false);
    const [list,setList] = useState([]);
    const [showImages,setShowImages] = useState([]);
    const onPressModal = (event) => {
        setmodalVisible(event);
    }
    useEffect(()=>{
        getData();
    },[])

    const getData = async () =>{
        // ${prospectSelectInfoReducer.dataSelect.prospect.prospectId}
        const data  = await searchMeterTab(`${prospectSelectInfoReducer.dataSelect.prospect.prospectId}`);
        setList(data)

    }
    const navigation = useNavigation();

    const getTitle = () => {
        if (!prospectSelectInfoReducer.dataSelect) return ''

        return prospectSelectInfoReducer?.dataSelect?.prospectAccount?.accName || ''
    }
    const gotoQRMaster = () => {
        navigation.navigate('QRMasterScreen',{disableSearch:true,prospectAccount:prospectSelectInfoReducer.dataSelect.prospectAccount});
    }
    const renderHeader = () =>{
        return <View style={[{flex:1,flexDirection:'row',backgroundColor:colors.primary,padding:20,borderTopLeftRadius:10,borderTopRightRadius:10,marginLeft:20, marginRight:20}]}>
             
                <View style={{width:width*0.08,marginLeft:10}}>
                <Text style={{color:'white',fontSize:22,textAlign:'center',fontWeight:'bold'}}>ตู้น้ำมัน</Text>
                </View>
                <View style={{width:width*0.08,marginLeft:10}}>
                <Text style={{color:'white',fontSize:22,textAlign:'center',fontWeight:'bold'}}>มือจ่ายที่</Text>
                </View>
                <View style={{width:width*0.2,marginLeft:10}}>
                <Text style={{color:'white',fontSize:22,textAlign:'center',fontWeight:'bold'}}>ประเภทผลิตภัณฑ์</Text>
                </View>
                <View style={{width:width*0.1,marginLeft:10}}>
                <Text style={{color:'white',fontSize:22,textAlign:'center',fontWeight:'bold'}}>เลขมิเตอร์</Text>
                </View>
                <View style={{width:width*0.1,marginLeft:10}}>
                <Text style={{color:'white',fontSize:22,textAlign:'center',fontWeight:'bold'}}>วันที่</Text>
                </View>
                <View style={{width:width*0.15,marginLeft:10}}>
                <Text style={{color:'white',fontSize:22,textAlign:'center',fontWeight:'bold'}}>โดย</Text>
                </View>
                <View style={{width:width*0.1,marginLeft:10}}>
                <Text style={{color:'white',fontSize:22,textAlign:'center',fontWeight:'bold'}}></Text>
                </View>
        </View>
    }
    const getImageUrl = (url) =>{
        return `${baseUrl}${url.substring(1)}`
    }
    const renderList = ({item,index}) =>{
        const {dispenserNo,fileId,gasNameTh,nozzleNo,createDtm,createUser,recRunNo,urlFile} = item;
        let img = [{source: { uri: `${baseUrl}${urlFile}`}}]
        return <View style={[{flex:1,flexDirection:'row',padding:20,marginLeft:20, marginRight:20},index % 2 == 0 ? {backgroundColor:'#eeeeee'} : {}]}>
             
                <View style={{width:width*0.08,marginLeft:10}}>
                <Text style={{color:'black',fontSize:22,textAlign:'center'}}>{dispenserNo}</Text>
                </View>
                <View style={{width:width*0.08,marginLeft:10}}>
                <Text style={{color:'black',fontSize:22,textAlign:'center'}}>{nozzleNo}</Text>
                </View>
                <View style={{width:width*0.2,marginLeft:10}}>
                <Text style={{color:'black',fontSize:22,textAlign:'center'}}>{gasNameTh}</Text>
                </View>
                <View style={{width:width*0.1,marginLeft:10}}>
                <Text style={{color:'black',fontSize:22,textAlign:'center'}}>{recRunNo ? recRunNo : '0'}</Text>
                </View>
                <View style={{width:width*0.1,marginLeft:10}}>
                <Text style={{color:'black',fontSize:22,textAlign:'center'}}>{dayjs(createDtm).locale('th').format('D/M/BBBB')}</Text>
                </View>
                <View style={{width:width*0.15,marginLeft:10}}>
                <Text style={{color:'black',fontSize:22,textAlign:'center'}}>{createUser}</Text>
                </View>
                <TouchableOpacity style={{marginLeft:width*0.05,marginStart: 5, justifyContent: 'center'}} disabled ={urlFile == null ? true : false} onPress={() => {
                    onPressModal(true)
                    setShowImages(img)
                }}>
                    <Image source={require('../../../assets/images/meter.png')}/>
                  {/* <Modal
                            visible={modalVisible}
                            onPressCancel={onPressModal}
                            
                            title={''}>
                                <View>
                                    <Image source={{uri:getImageUrl(urlFile)}} style={{width:'100%',height:500}} resizeMode="contain" />
                                </View>
                        </Modal> */}
                         <ImageView
                            images={showImages}
                            imageIndex={0}
                            isVisible={modalVisible}
                            onClose={()=>
                                {
                                setmodalVisible(false)
                                }}
                        />
                    </TouchableOpacity>
        </View> 
    }

    return (
        <View style={{backgroundColor: colors.white, flex: 1}}>
            <ScrollView>
                <View style={{flexDirection: 'row'}}>
                    <View style={[styles.topLabel,{ flex: 0.8}]}>
                        <View style={{marginLeft: 15}}>
                            <Text style={{fontSize: FONT_SIZE.HEADER, fontWeight:'bold'}}>{getTitle()}</Text>
                        </View>
                    </View>
                    <View style={[styles.topLabel,{ flex: 1/5}]}>
                        <Button 
                            onPress={gotoQRMaster}
                            title={'QR Master'}
                            buttonHeigth={50}/>
                    </View>
                </View>
                {list.length != 0 ? 
                    <FlatList
                    data={list}
                    ListEmptyComponent={()=>{
                        return(
                            <View>
                                <Text style={{textAlign:'center'}}>ไม่พบข้อมูล</Text>
                            </View>
                        );
                    }}
                    ListHeaderComponent={renderHeader}
                    renderItem={renderList}/>
                :
                <View style={{alignSelf:'center', marginTop:40}}>
                    <Text style={{fontSize:25}}>ไม่พบข้อมูล</Text>
                </View>
                }
               
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    topLabel: {
        width: '100%',
        flex: 1,
        marginVertical: 20,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        flexDirection: 'row'
    },
    dateLabel: {
        backgroundColor: colors.grayborder,
        paddingVertical: 15,
        marginVertical: 10,
        paddingHorizontal: 30
    },
    flatStyle: {
        borderTopWidth: 1, 
        borderTopColor: colors.grayborder, 
        marginHorizontal:30, 
        flex: 1
    },
})

export default SubmenuMeter;