import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import {useDispatch, useSelector} from 'react-redux';
import { Switch } from 'native-base';

import { Text, Table, Button, Header,Dropdown, ModalWarning, SelectDropdown, LoadingOverlay, CheckBox,  FullTable} from '../../components'
import { FONT_SIZE } from '../../utility/enum';
import colors from '../../utility/colors'
import language from '../../language/th.json';
import { getQRAction, getQRCustomer, cancelMeter,getQRCustomerByCustCode } from '../../actions/masterAction';
import { getInputData } from '../../utility/helper';

const QRMaster = ({ route }) => {
    const disableSearch = route.params ? route.params.disableSearch : false;
    const prospectAccount = route.params ? route.params.prospectAccount : null;
    const navigation = useNavigation();
    const {masterReducer} = useSelector((state) => state);
    const dispatch = useDispatch();
    const inputRef = useRef({});

    const [isVisible , setIsVisible] = useState(false);
    const [selectedCust, setSelectedCust] = useState('');
    const [modalVisibleDelete, setmodalVisibleDelect] =useState(false);
    const [modalVisibleDeleteConfirm, setmodalVisibleDelectConfirm] =useState(false);
    const [removeItem, setRemoveItem] = useState();  
    const [valueCus, setValueCus] = useState();  
    const [modalVisibleError, setmodalVisibleError] = useState(false);
    // const [disableSearch, setdisableSearch] = useState(route.params && route.params.disableSearch ? route.params.disableSearch : null);
    // const [prospectAccount, setProspectAccount] = useState(route.params && route.params.prospectAccount ? route.params.prospectAccount : null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState('');
    const [selectCheckBox, setSelectCheckBox] = useState(false);
    const [isShowFullTable,setisShowFullTable] = useState(false);

    useEffect(() => {
        if (masterReducer.customer_loading) {
            dispatch(getQRCustomer()) 
        }
        if(route.params && route.params.disableSearch){
            getCustomerCustcode();
        }
    }, [])
    useEffect(() => {  
        if (!masterReducer.qr_loading) {}

        if (masterReducer.remove_loading && !masterReducer.remove_error) {
            dispatch(getQRAction({custCode: selectedCust.custCode}))
        }
        if (masterReducer.remove_loading && masterReducer.remove_error) {
            setmodalVisibleError(true)
        }
        
        setIsLoading(false)
    }, [masterReducer])

    const getCustomerCustcode =  async () =>{
        setCurrentPage(1)
        const data = await getQRCustomerByCustCode(`${prospectAccount.custCode}`)
        setSelectedCust(data)
        dispatch(getQRAction({custCode: data.custCode}))
    }

    const handleSubmit = (value) => {
        let totalValue = getInputData(inputRef);
        setIsVisible(false)
        let cust = totalValue.data.custCode;
        setCurrentPage(1)
        
        if (!totalValue.isInvalid && cust != null) {
            setIsVisible(true)
            let dataCustomer = masterReducer.customer.find((item) => cust == item.custCode)
            setIsLoading(true)
            setSelectedCust(dataCustomer);

            let flagActive = ''
            if (selectCheckBox == true) flagActive = "Y"

            dispatch(getQRAction({cust}, flagActive))
        }
    }

    const handleClear = (value) => {
        setIsVisible(false)
        inputRef.current.custCode.clear()
        setSelectCheckBox(false)
    }

    const handleDelete = (value) => {
        if (value == null) return

        setIsVisible(true)
        setmodalVisibleDelect(false);
        setmodalVisibleDelectConfirm(true);
        dispatch(cancelMeter(removeItem.meterId))
    }

    const onPressPage = (page) => {
        if (!page) return
        let totalValue = getInputData(inputRef);
        let data = totalValue.data;
        setCurrentPage(page)
        if(disableSearch) return  dispatch(getQRAction({page, custCode:selectedCust.custCode}))
        return dispatch(getQRAction({page, data: totalValue.data, ...data}))
    }

    const onPressDelete = (event, item) => {
        setmodalVisibleDelect(event);
        if (item) setRemoveItem(item)
    }

    const onPressDeleteConfirm = (event) => {
        setmodalVisibleDelectConfirm(event);
    }

    const onPressError = (event) => {
        setmodalVisibleError(event)
    }

    const [columnsHeader, setColumnsHeader] = useState([
        { key: "custCode", title: "รหัสลูกค้า" },
        { key: 'custNameTh', title: 'ชื่อลูกค้า' },
        { key: 'gasNameTh', title: 'ประเภทผลิตภัณฑ์' },
        { key: 'dispenserNo', title: 'ตู้น้ำมัน' ,isColumnCenter: true},
        { key: 'nozzleNo', title: 'มือจ่ายที่' ,isColumnCenter: true},
        { key: 'activeFlagStatus', title: 'สถานะ' ,isColumnCenter: true},
        { key: 'lastUpdate', title: 'last update' ,isColumnCenter: true},
    ]);

    const handleSelectCheckBox = (item) => {
        if (item == true) setSelectCheckBox(true)
        if (item == false) setSelectCheckBox(false)
    }

    const handleSelectCustomer = (value) => {
        if (value == true) {
            setSelectCheckBox(true);
        } else {
            setSelectCheckBox(false);
        }
    };

    return(
       
        <View style={{flex: 1, backgroundColor: colors.white}}>
            <Header/>
            <ScrollView style={{marginBottom: 10}}>
                {
                    disableSearch ? <View></View> : <View style={[styles.SearchArea,styles.styleShadow]}>
                    <View style={{borderBottomWidth:0.5, borderColor:colors.grayborder, marginBottom: 30}}>
                        <View style={{marginBottom: 10}}>
                            <Text style={{fontSize:FONT_SIZE.TITLE,fontWeight:'bold'}}>ค้นหา</Text>
                        </View>
                    </View>

                    <View style={{marginHorizontal: '10%'}}>                    
                        <SelectDropdown
                            dataList={masterReducer.customer}
                            titleDropdown={"ชื่อลูกค้า"}
                            titleAlert={"ชื่อลูกค้า"}
                            require
                            REQUIRETITLE
                            massageError={language.COUSTMER}
                            valueKey={"custCode"}
                            titleKey={"label"}
                            ref={el => inputRef.current.custCode = el}
                        />
                    </View>

                    <View style={{flexDirection: 'row', marginTop: 30, alignItems: 'center', marginBottom: 50}}>
                        <View style={{flex: 1, marginStart: '20%'}}>
                            <Button
                                onPress={handleSubmit}
                                title={'Search'}
                                typeIcon={'Ionicons'}
                                nameIcon={'search-outline'}
                                buttonHeigth={50}
                                width={180}
                            />
                        </View>
                        <View style={{flex: 1, marginEnd: '20%'}}>
                            <Button
                                onPress={handleClear}
                                title={'Clear'}
                                typeIcon={'Ionicons'}
                                nameIcon={'trash-outline'}
                                buttonHeigth={50}
                                color={colors.grayButton}
                                colorBorder={colors.grayButton}
                                width={180}
                            />
                        </View>
                    </View>
                    <View style={{alignItems: 'flex-end', marginTop: -25}}>
                        <View style={{flexDirection: 'row'}}>
                            <Switch
                                value = {selectCheckBox}
                                onValueChange = {(value) => handleSelectCustomer(value)} 
                                style={{marginLeft: 15}}
                            />
                            <View style={{marginLeft: 15}}>
                                <Text>ไม่รวมสถานะไม่ใช้งาน</Text>
                            </View>
                        </View>
                    </View>
                </View>
                }

                {
                    isVisible ?
                    <>
                    <View style={{marginBottom: 10,marginHorizontal:30}}>
                        <Text style={{fontSize: FONT_SIZE.SUBTITLE, fontWeight:'bold'}}>รหัสลูกค้า     :   {selectedCust.custCode}</Text>
                        <Text style={{fontSize: FONT_SIZE.SUBTITLE, fontWeight:'bold'}}>ชื่อลูกค้า       :   {selectedCust.custNameTh}</Text>
                        <Text style={{fontSize: FONT_SIZE.SUBTITLE, fontWeight:'bold'}}>แสดงผลการค้นหา</Text>
                    </View>
                        <View style={{alignItems: 'flex-end', marginBottom: 15,marginHorizontal:30}}>
                            <Button
                                onPress={() => navigation.navigate('AddEditQRMasterScreen', {customer: selectedCust})}
                                title={'Add'}
                                typeIcon={'Ionicons'}
                                nameIcon={'add-outline'}
                                buttonHeigth={50}
                                width={150}
                            />
                        </View>
                        <View style={{flex:1,marginHorizontal:30}}>
                            <FullTable isShow={isShowFullTable} onChange={(status) => setisShowFullTable(status)}> 
                            <Table 
                                data={masterReducer.data.records} 
                                columns={columnsHeader}
                                edittableonly
                                qrCode
                                spaceHorizontal={5}
                                recordDetail={masterReducer.data}
                                onPressPage={onPressPage}
                                onPressEditOnly={(item) => navigation.navigate('AddEditQRMasterScreen', {meter: item, customer: selectedCust})}
                                currentPage={currentPage}
                                hideEdit={isShowFullTable ? true : false}
                                isShowFullTable={isShowFullTable}
                            />
                            </FullTable>
                            <ModalWarning
                                visible={modalVisibleDelete}
                                onPressConfirm={handleDelete}
                                onPressCancel={()=> onPressDelete(false)}
                                detailText={language.DELETE}
                            />
                            <ModalWarning
                                visible={modalVisibleDeleteConfirm}
                                onPressClose={()=> onPressDeleteConfirm(false)}
                                onlyCloseButton
                                detailText={language.DELETESUCCESS}
                            />
                        </View> 
                    </>
                    :
                    disableSearch ? 
                    <View style={{marginTop:60}}>
                         <View style={{marginBottom: 10,marginHorizontal:30}}>
                        <Text style={{fontSize: FONT_SIZE.SUBTITLE, fontWeight:'bold'}}>รหัสลูกค้า     :  {selectedCust ? selectedCust.custCode : ''} </Text>
                        <Text style={{fontSize: FONT_SIZE.SUBTITLE, fontWeight:'bold'}}>ชื่อลูกค้า      :  {selectedCust ? selectedCust.custNameTh : ''}  </Text>
                        <Text style={{fontSize: FONT_SIZE.SUBTITLE, fontWeight:'bold'}}>แสดงผลการค้นหา</Text>
                    </View>
                        <View style={{alignItems: 'flex-end', marginBottom: 15,marginHorizontal:30}}>
                            <Button
                                onPress={() => navigation.navigate('AddEditQRMasterScreen', {customer: selectedCust})}
                                title={'Add'}
                                typeIcon={'Ionicons'}
                                nameIcon={'add-outline'}
                                buttonHeigth={50}
                                width={150}
                            />
                        </View>
                        <View style={{flex:1,marginHorizontal:30}}>
                    <FullTable isShow={isShowFullTable} onChange={(status) => setisShowFullTable(status)}> 
                    <Table 
                        data={masterReducer.data.records} 
                        columns={columnsHeader}
                        editable
                        qrCode
                        spaceHorizontal={5}
                        recordDetail={masterReducer.data}
                        onPressPage={onPressPage}
                        onPressRemove={(item)=> onPressDelete(true, item)}
                        onPressEdit={(item) => navigation.navigate('AddEditQRMasterScreen', {meter: item, customer: selectedCust})}
                        currentPage={currentPage}
                        hideEdit={isShowFullTable ? true : false}
                        isShowFullTable={isShowFullTable}
                    />
                     </FullTable>
                    <ModalWarning
                        visible={modalVisibleDelete}
                        onPressConfirm={handleDelete}
                        onPressCancel={()=> onPressDelete(false)}
                        detailText={language.DELETE}
                    />
                    <ModalWarning
                        visible={modalVisibleDeleteConfirm}
                        onPressClose={()=> onPressDeleteConfirm(false)}
                        onlyCloseButton
                        detailText={language.DELETESUCCESS}
                    />
                </View> 
                    </View>  :
                    null
                }  
            </ScrollView>
            <ModalWarning
                visible={modalVisibleError}
                onPressClose={()=> onPressError(false)}
                WARNINGTITLE
                onlyCloseButton
                detailText={masterReducer.metererrorMSG}
            />
            <LoadingOverlay
                visible={isLoading}
            />
        </View>
)}

const styles = StyleSheet.create({
    SearchArea : {
        borderRadius: 20, 
        backgroundColor: colors.grayMaster, 
        padding: 20, 
        marginVertical: 30,
        marginHorizontal:30
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
})

export default QRMaster;
