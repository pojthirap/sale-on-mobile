import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import Text from '../Text'
import colors from '../../utility/colors';

const tabAccTeamDetail = ({nameEmployee, roleEmployee, phoneEmployee, emailEmployee, saleGroup, saleTerritory}) => {
    
    return (
        <View style={{flex: 1, paddingHorizontal: 2, backgroundColor:colors.white}}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <View style={{marginEnd: 10}}>
                    <Image source={require('../../assets/images/submenu/Component-13.png')}/>
                </View>
                <View style={{flex: 1, marginVertical:10}}>
                    <View style={{ paddingBottom: 5}}>
                        <Text style={{fontWeight: 'bold', fontSize: 25}}>{nameEmployee}</Text>
                    </View>
                    <View>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
                            <View style={{flex: 1 / 5}}>
                                <Text style={{fontSize:22,fontWeight:'bold'}}>Party Role</Text>
                            </View>
                            <View style={{flex: 1 / 5}}>
                                <Text style={{fontSize:22,fontWeight:'bold'}}>เบอร์โทรศัพท์มือถือ</Text>
                            </View>
                            <View style={{flex: 1 / 5}}>
                                <Text style={{fontSize:22,fontWeight:'bold'}}>อีเมล</Text>
                            </View>
                            <View style={{flex: 1 / 5}}>
                                <Text style={{fontSize:22,fontWeight:'bold'}}>Sale Group</Text>
                            </View>
                            <View style={{flex: 1 / 5}}> 
                                <Text style={{fontSize:22,fontWeight:'bold'}}>Sale Territory</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
                            <View style={{flex: 1 / 5}}>
                                <Text style={{fontSize:22}}>{roleEmployee}</Text>
                            </View>
                            <View style={{flex: 1 / 5}}>
                                <Text style={{fontSize:22}}>{phoneEmployee}</Text>
                            </View>
                            <View style={{flex: 1 / 5}}>
                                <Text style={{fontSize:22}}>{emailEmployee}</Text>
                            </View>
                            <View style={{flex: 1 / 5}}>
                                <Text style={{fontSize:22}}>{saleGroup}</Text>
                            </View>

                            {/* {LoopSaleTerritory} */}
                            <View style={{flex: 1 / 5}}> 
                            {
                                saleTerritory && saleTerritory.length ?
                                saleTerritory.map((item)=>{
                                    return <Text numberOfLines={1} style={{fontSize:22}}>{item.territoryNameTh}</Text>
                                    // return <Text>{item.territoryNameTh}</Text>
                                })
                                :
                                <Text> - </Text>
                            }
                            </View>   
                        </View>
                    </View>        
                </View>
            </View>
        </View>
    )
}

export default tabAccTeamDetail;