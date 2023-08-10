import React from 'react';
import { View } from 'react-native';
import { Icon } from 'native-base';
import { useSelector } from 'react-redux';

import Text from '../Text'
import colors from '../../utility/colors';


const tabFeedDetail = ({tabEdit, editBy, hoursTime}) => {

    const {prospectSelectInfoReducer} = useSelector((state) => state);

    const accountCompany = prospectSelectInfoReducer?.dataSelect?.prospectAccount?.accName || ''

    return(
        <View style={{paddingHorizontal: 15, paddingVertical: 10, backgroundColor:colors.white }}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', width: '100%'}}>
                    <View style={{marginTop: 5, flexDirection: 'row', justifyContent: 'flex-start'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Icon 
                                type="MaterialCommunityIcons" 
                                name="clock-time-four-outline"/>
                            <View style={{marginStart: 10}}>
                                <Text >{hoursTime}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop: 5, flexDirection: 'row', marginLeft: '2%', flex: 1}}>
                        <View style={{marginEnd: 10}}>
                            <Text>: แก้ไข</Text>
                        </View>
                        <View style={{marginEnd: 20}}>
                            <Text>{tabEdit}</Text>
                        </View>
                    </View>
                    <View style={{marginTop: 5, flexDirection: 'row', marginLeft: '5%', width: '18%'}}>
                        <Text>โดย</Text>
                        <View style={{marginStart: 10}}>
                            <Text numberOfLines={2}>{editBy}</Text>
                        </View>                   
                    </View>
                </View>
            </View> 
        </View>   
    )
}

export default tabFeedDetail;