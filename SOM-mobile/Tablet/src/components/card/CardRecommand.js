import React from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Icon } from 'native-base';
import { useSelector} from 'react-redux'; 

import Text from '../Text'
import colors from '../../utility/colors'

const CardRecommand = ({data, onRemove}) =>{

    const {prospectSelectInfoReducer,prospectReducer} = useSelector((state) => state);

    const Card = (data) =>{
        return(
        <View style={styles.container}>
            <View style={{flexDirection:'row',marginHorizontal:15,marginBottom: 30}}>
                <View style={[styles.iconBeforTextinput,styles.styleShadow]} />
                    <View style={[styles.inputbox,styles.styleShadow]}>
                        <Text style={{fontSize:22,fontWeight:'bold'}} numberOfLines={2}>{data.item.buNameTh}</Text>
                    </View>
                    <View style={[styles.BorderEndTextinput,styles.styleShadow]}>
                        {prospectSelectInfoReducer.dataSelect.isProspect ? 
                            <TouchableOpacity  onPress={()=>onRemove(data)}>
                                <Icon type="MaterialCommunityIcons" name="close" style={{fontSize:30,color: colors.grayDark}}/>
                            </TouchableOpacity>
                            : 
                            null
                        }
                    </View>
            </View>
        </View>
        )
    }
    return(
        <>
        {prospectReducer.dataSubReccomentBU.records != 0 ? 
            <FlatList
                data={data}
                renderItem={(data)=> Card(data)}
                numColumns={3}
                keyExtractor={(item, index) => index}
            /> 
        :
            <View style={{alignSelf:'center', marginTop:20}}>
                <Text style={{fontSize:25}}>ไม่พบข้อมูล</Text>
            </View>
        }
           
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1 / 3,
    },
    styleShadow: {
        shadowOffset: {
            height: 3,
            width: 5
        },
        shadowRadius: 20,
        shadowOpacity: 0.6,
        shadowColor: colors.gray,
        elevation: 10,
      },
      inputbox: {
        backgroundColor: colors.grayborder,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.grayborder,
        paddingVertical: 8,
        paddingHorizontal: 5,
        marginTop: 5,
        height: 80,
        width: 160,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconBeforTextinput: {
        backgroundColor: colors.grayborder,
        borderStartWidth: 1, 
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.grayborder,
        borderTopLeftRadius: 20, 
        borderBottomLeftRadius: 20,
        height: 80,
        marginTop: 5,
        width: 20
    },
    BorderEndTextinput: {
        backgroundColor: colors.grayborder,
        borderTopRightRadius: 20, 
        borderBottomRightRadius: 20, 
        borderEndWidth: 1, 
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.grayborder,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 80,
        marginTop: 5
    }

});
export default CardRecommand;