import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, FlatList, PermissionsAndroid, Dimensions } from 'react-native';
import { Icon } from 'native-base'

import colors from '../../utility/colors';
import { Text, Modal, Button, SelectDropdown, Table, CheckBox, TextInput as CTextInput, ModalWarning, LoadingOverlay } from '../../components'
import { FONT_SIZE } from '../../utility/enum';
import { ScrollView } from 'react-native-gesture-handler';
import dayjs from 'dayjs';
const { width, height } = Dimensions.get('window')
const localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)
dayjs.locale('TH')
import { useNavigation } from '@react-navigation/native'
import { setPlantrip, updateRemind, setCheckout, updateCheckout, getTaskTemplate, getTaskSpecial, addTemplateProspectAdHoc, setTaskReload, delPlanTripTaskAdHoc } from '../../actions/SaleVIsit'
import Meter from '../template/Meter'
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, RadioButton } from 'react-native-paper';
import language from '../../language/th.json'

function ViewPlanTripTask(props) {
    const { saleVisit } = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [isCompleteTask, setIsCompleteTask] = useState(false);
    const [isShowMeter, setIsShowmeter] = useState(false)
    const [isShowAddAdHoc, setIsShowAddAdHoc] = useState(false)
    const [isShowAddAdHocConfirm, setIsShowAddAdHocConfirm] = useState(false)
    const [remind, setRemind] = useState(props.planTrip ? props.planTrip.remind ? props.planTrip.remind : '' : '')
    const [isSpecial, setIsSpecial] = useState(true)
    const [template, setTemplate] = useState([])
    const [special, setSpecial] = useState([])
    const [isShowModalAddPlan, setIsShowModalAddPlan] = useState(true);
    const [selectAdhoc, setSelectAdHoc] = useState(null);
    const [modalDeleteTask, setModalDeleteTask] = useState(false)
    const [modalDeleteTaskConfirm, setModalDeleteTaskConfirm] = useState(false)
    const [itemDeleteTask, setItemDeleteTask] = useState(null)
    const [errorMSGDelete, setErrorMSGDelete] = useState('');
    const [saveLoad,setSaveLoad] = useState(false)

    useEffect(() => {
        let status = true;
        props.taskList.map(task => {
            if (status) {
                if (task.requireFlag === "Y" && task.completedFlag === 'N') status = false
                else status = true
            }
        })
        setIsCompleteTask(status)
        getTemplate();
        getSpecial();
    }, [props.taskList])

    const getTemplate = async () => {
        let prospId = props?.planTrip?.prospId || ''
        const data = await getTaskTemplate(`${prospId}`);
        let list = data.filter(val => val.taskType === 'A')
        list = list.filter(val => {
            const special = props.taskList.find(task => `${task.tpAppFormId}` === val.code)
            if (!special)
                return val
        })
        setTemplate(list)
    }

    const getSpecial = async () => {
        let prospId = props?.planTrip?.prospId || ''
        const data = await getTaskSpecial(`${prospId}`);
        let list = data;
        if (!props.planTrip?.custCode) {
            list = list.filter(obj => obj.taskType === 'T')
        }
        list = list.filter(val => {
            let isMeter = val.taskType === 'M' && props.taskList.find(task => {
                if (`${task.taskType}` === 'M')
                    return task
            })
            let isSa = val.taskType === 'S' && props.taskList.find(task => {
                if (`${task.taskType}` === 'S')
                    return task
            })
            let isT = val.taskType === 'T' && props.taskList.find(task => {
                if (`${task.taskType}` === 'T' && `${task.tpSaFormId}` === val.code)
                    return task
            })
            let special = props.taskList.find(task => {
                if (`${task.taskType}` === val.taskType && `${task.tpAppFormId}` === val.code)
                    return task
            })
            if (!special && !isMeter && !isSa && !isT)
                return val
        })
        setSpecial(list)
    }

    const renderItemTemplate = ({ item, index }) => {
        return <View style={[{ flex: 1, flexDirection: 'row' }, index == 0 ? { borderTopWidth: 0.8, borderRightWidth: 0.6, borderColor: 'grey' } : { borderRightWidth: 0.6, borderColor: 'grey' }]}>
            <View style={{ flex: 0.1, borderLeftWidth: 0.6, borderBottomWidth: 0.6, borderColor: 'grey' }}>
                <View style={{ margin: 10 }}>
                    <Text style={{ textAlign: 'center', fontSize: 25, color: item.completedFlag === 'Y' ? colors.primary : 'black' }}>{index + 1}</Text>
                </View>
            </View>
            <View style={{ flex: 0.4, borderLeftWidth: 0.6, borderBottomWidth: 0.6, borderColor: 'grey' }}>
                <View style={{ margin: 10 }}>
                    <Text style={{ fontSize: 20, fontSize: 25, color: item.completedFlag === 'Y' ? colors.primary : 'black' }}>{item.templateName}</Text>
                </View>
            </View>
            <View style={{ flex: 0.25, borderLeftWidth: 0.6, borderBottomWidth: 0.6, borderColor: 'grey' }}>
                <View style={{ margin: 10 }}>
                    <Text style={{ fontSize: 20, alignSelf: 'center', fontSize: 25, color: item.completedFlag === 'Y' ? colors.primary : 'black' }}>{`${item.updateDtm ? dayjs(item.updateDtm).add(543, 'year').locale('th').format('D/M/YYYY') : '-'} `}</Text>
                </View>
            </View>
            <View style={{ flex: 0.15, alignItems: 'center', borderLeftWidth: 0.6, borderBottomWidth: 0.6, borderColor: 'grey' }}>
                <View style={{ margin: 10 }}>
                    <CheckBox
                        SelectDefault={item.requireFlag === 'Y' ? true : false}
                    // onPress = {() => console.log('select box')}
                    />
                </View>

            </View>
            <View style={{ flex: 0.2, borderLeftWidth: 0.6, borderBottomWidth: 0.6, borderColor: 'grey' }}>
                <TouchableOpacity onPress={() => {
                    dispatch(setPlantrip(props.planTrip))
                    if (item.taskType === "M") {
                        navigation.navigate('Meter', { planTrip: props.planTrip ? props.planTrip : saleVisit.planTrip, obj: item })
                    }
                    if (item.taskType === "A") {
                        navigation.navigate('Appfrom', { planTrip: props.planTrip ? props.planTrip : saleVisit.planTrip, obj: item })
                    }
                    if (item.taskType === "S") {
                        navigation.navigate('StockCard', { planTrip: props.planTrip ? props.planTrip : saleVisit.planTrip, obj: item })
                    }
                    if (item.taskType === "T") {
                        navigation.navigate('SaForm', { planTrip: props.planTrip ? props.planTrip : saleVisit.planTrip, obj: item })
                    }
                    props.onPressCancel();
                }}>
                    <View style={{ backgroundColor: colors.primary, borderRadius: 10, margin: 10 }}>
                        <Text style={{ fontSize: 20, alignSelf: 'center', fontSize: 25, color: 'white' }}>open</Text>

                    </View>
                </TouchableOpacity>
                {
                    item.adhocFlag == 'Y' ?
                        <TouchableOpacity onPress={() => onPressDeleteTask(item, true)}>
                            <View style={{ backgroundColor: colors.white, borderRadius: 10, marginHorizontal: 10, marginBottom: '5%', borderWidth: 2, borderColor: colors.redButton }}>
                                <Text style={{ fontSize: FONT_SIZE.TEXT, alignSelf: 'center', color: colors.redButton }}>Delete</Text>
                            </View>
                        </TouchableOpacity>
                        : null
                }
            </View>
        </View>
    }

    const renderHeader = () => {
        return <View style={[{ flex: 1, flexDirection: 'row', borderLeftWidth: 0.6, borderRightWidth: 0.6, borderTopWidth: 0.8, borderColor: 'grey' }]}>
            <View style={{ flex: 0.1, textAlign: 'center' }}>
                <View style={{ marginTop: 10, marginBottom: 10 }}>
                    <Text style={{ textAlign: 'center', fontSize: 25 }}>ลำดับ</Text>
                </View>
            </View>
            <View style={{ flex: 0.4, borderLeftWidth: 0.6, borderColor: 'grey' }}>
                <View style={{ marginTop: 10, marginBottom: 10 }}>
                    <Text style={{ fontSize: 20, fontSize: 25, textAlign: 'center' }}>Template Name</Text>
                </View>
            </View>
            <View style={{ flex: 0.25, borderLeftWidth: 0.6, borderColor: 'grey' }}>
                <View style={{ marginTop: 10, marginBottom: 10 }}>
                    <Text style={{ fontSize: 20, fontSize: 25, textAlign: 'center' }}>Last Update</Text>
                </View>
            </View>
            <View style={{ flex: 0.15, alignItems: 'center', borderLeftWidth: 0.6, borderColor: 'grey' }}>
                <View style={{ marginTop: 10, marginBottom: 10 }}>
                    <Text style={{ fontSize: 20, fontSize: 25, textAlign: 'center' }}>Require</Text>

                </View>
            </View>
            <View style={{ flex: 0.2, borderLeftWidth: 0.6, borderColor: 'grey' }}></View>
        </View>
    }

    const updateRemindPlantrip = async () => {
        await updateRemind(props.planTrip.planTripProspId, remind)
        dispatch(setCheckout())
        props.onPressCancel(true)
    }

    const onPressModal = () => {
        setIsShowAddAdHoc(false);
    }

    const onPressAdd = async () => {
        setSaveLoad(true); 
        const { taskType, code } = selectAdhoc
        const { planTripId, planTripProspId, prospId, adhocFlag } = props.planTrip
        const payload = {
            planTripProspId: `${planTripProspId}`,
            taskType,
            tpStockCardId: taskType === 'S' ? `${code}` : null,
            tpSaFormId: taskType === 'T' ? `${code}` : null,
            tpAppFormId: taskType === 'A' ? `${code}` : null,
            tpMeterId: taskType === 'M' ? `${code}` : null,
            requireFlag: 'Y',
            adhocFlag,
        }
        await addTemplateProspectAdHoc(payload)
        setSaveLoad(false); 
        // updasdkl
        dispatch(setTaskReload())
        setIsShowAddAdHoc(false);
        setIsShowAddAdHocConfirm(false);
        setSelectAdHoc(null);
    }

    const onPressAddModalConfirm = () => {
        if (!selectAdhoc) return
        setIsShowAddAdHocConfirm(true);
        setIsShowAddAdHoc(false);
    }
    const onPressAddModalCancel = () => {
        setIsShowAddAdHocConfirm(false);
        setIsShowAddAdHoc(true);
        setSelectAdHoc(null);
    }

    //START function modal delete task
    const onPressDeleteTask = (item, event) => {
        setModalDeleteTask(event)
        setModalDeleteTaskConfirm(!event)
        setItemDeleteTask(item)
    }

    const onPressDeleteTaskSuccess = async (event) => {
        setSaveLoad(true); 
        setModalDeleteTask(event)
        setModalDeleteTaskConfirm(!event)

        const res = await delPlanTripTaskAdHoc(`${itemDeleteTask.planTripTaskId}`);
        setSaveLoad(false); 
        if(res.errorCode != 'S_SUCCESS') {
            setErrorMSGDelete(`${res.errorMessage}`)
        }
    }

    const onPressDeleteTaskSuccessClose = () => {
        setModalDeleteTaskConfirm(false);
        setItemDeleteTask(null);
        setErrorMSGDelete('');
        dispatch(setTaskReload())
    }
    //END FUNCTION

    return (
        <Modal
            visible={props.show}
            onPressCancel={() => props.onPressCancel()}
            onPressConfirm={() => { }}
            title={`${props.planTrip ? props.planTrip.accName : ''}`}
            TWOBUTTON={false}
            containerWidth="90%"
        >
            <Modal
                visible={isShowAddAdHoc}
                onPressCancel={onPressModal}
                onPressConfirm={onPressAddModalConfirm}
                title={'Template'}
                TWOBUTTON={true}
                cancelText={'Close'}
                confirmText={'Add'}
                cancelTextColor={colors.primary}
                cancelButtonColor={colors.white}
                confirmButtonColor={colors.primary}
                confirmTextColor={colors.white}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ margin: 20, flexDirection: 'row' }}>
                        <RadioButton
                            status={isSpecial ? 'checked' : 'unchecked'}
                            color={colors.primary}
                            onPress={() => {
                                setSelectAdHoc(null)
                                setIsSpecial(true)
                            }}
                        />
                        <Text style={{ fontSize: 30 }}>
                            Special Task
                        </Text>
                    </View>
                    <View style={{ margin: 20, flexDirection: 'row' }}>
                        <RadioButton
                            status={isSpecial ? 'unchecked' : 'checked'}
                            color={colors.primary}
                            onPress={() => {
                                setSelectAdHoc(null)
                                setIsSpecial(false)
                            }}
                        />
                        <Text style={{ fontSize: 30 }}>
                            Template
                        </Text>
                    </View>

                </View>
                <View style={{ padding: 20 }}>
                    <SelectDropdown
                        titleAlert={isSpecial ? 'Special Task' : 'Template'}
                        titleDropdown={isSpecial ? 'Special Task' : 'Template'}
                        dataList={isSpecial ? special : template}
                        titleKey={'description'}
                        valueKey={'code'}
                        onPress={(e) => setSelectAdHoc(e)}
                        NotFillter
                    />
                </View>
            </Modal>
            <ModalWarning
                visible={isShowAddAdHocConfirm}
                onPressConfirm={onPressAdd}
                onPressCancel={onPressAddModalCancel}
                detailText={language.ADD}
            />
            <View style={{ marginTop: 20, padding: 10, maxHeight: 1000 }}>
                <ScrollView>
                    <FlatList
                        data={props.taskList}
                        renderItem={renderItemTemplate}
                        ListHeaderComponent={renderHeader}
                    />
                </ScrollView>
                <View style={{ marginTop: 10 }}>
                    <CTextInput
                        value={remind}
                        title={'Remind'}
                        onChangeText={(e) => setRemind(e)}
                    />
                </View>
            </View>
            <View style={{ width: width, flexDirection: 'row', padding: 5 }}>
                <View style={{ width: width * 0.35 }}>
                    <TouchableOpacity style={{ backgroundColor: colors.primary, borderRadius: 10, margin: 10, width: 120, padding: 5 }} onPress={() => setIsShowAddAdHoc(true)}>
                        <Text style={{ textAlign: 'center', fontSize: 25, color: 'white' }}>Ad-Hoc</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: width * 0.53, alignItems: 'flex-end' }}>
                    <Button disabled={!isCompleteTask} title={'Done'} buttonHeigth={45} width={80} fontColor={colors.primary} color={colors.white} onPress={() => updateRemindPlantrip()} />
                </View>
            </View>
            <ModalWarning
                visible={modalDeleteTask}
                detailText={`ต้องการลบ ${itemDeleteTask && itemDeleteTask.templateName ? itemDeleteTask.templateName : ''} ใช่หรือไม่`}
                onPressConfirm={() => onPressDeleteTaskSuccess(false)}
                onPressCancel={() => { setModalDeleteTask(false), setItemDeleteTask(null) }}
            />
            <ModalWarning
                visible={modalDeleteTaskConfirm}
                detailText={errorMSGDelete != '' ? errorMSGDelete : language.DELETESUCCESS}
                onlyCloseButton={true}
                onPressClose={() => onPressDeleteTaskSuccessClose()}
            />
            <LoadingOverlay
                visible={saveLoad}
            />
        </Modal>
    );
}

export default ViewPlanTripTask;
