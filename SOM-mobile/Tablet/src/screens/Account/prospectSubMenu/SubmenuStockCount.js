import React, { useState,useEffect } from 'react';
import  { View, StyleSheet, TouchableOpacity } from 'react-native';
import  { Icon } from 'native-base';

import { TableStockCount, Text, FullTable } from '../../../components';
import { FONT_SIZE } from '../../../utility/enum';
import colors from '../../../utility/colors'
import {stockCount } from '../../../actions/StockCountAction'
import {useDispatch, useSelector} from 'react-redux';
const SubmenuStockCount = () =>{
  const {prospectSelectInfoReducer} = useSelector((state) => state);
  const [prospect,setProspect] = useState(prospectSelectInfoReducer.dataSelect);
  const [isShowFullTable,setisShowFullTable] = useState(false);
      const [data,setData] = useState([]);
      useEffect(()=>{
        getData();
      },[])
      const getData = async () =>{
         const data = await stockCount(`${prospect.prospect.prospectId}`);
         setData(data)
      }
      const getTitle = () => {
        if (!prospectSelectInfoReducer.dataSelect) return ''

        return prospectSelectInfoReducer?.dataSelect?.prospectAccount?.accName || ''
    }
      
    return(
        <View style={{flex:1, backgroundColor:colors.white}}>
           <View style={styles.topLabel}>
              <Text style={{fontSize: FONT_SIZE.HEADER, fontWeight:'bold'}}>{getTitle()}</Text>
              <Text style={{fontSize: FONT_SIZE.TITLE, fontWeight:'bold'}}>Stock Count</Text> 
            </View>
           
              {/* <TouchableOpacity>
                <View style={{alignSelf:'flex-end',paddingHorizontal: 50,paddingBottom:10,flexDirection:'row'}}>
                  <Icon type='Ionicons' name='expand-outline' style={{color:colors.grayDark, paddingRight:5}}/>
                  <Text>Full Screen</Text>
                </View>
              </TouchableOpacity> */}
              <View style={{marginHorizontal:30}}>
              <FullTable isShow={isShowFullTable} onChange={(status) => setisShowFullTable(status)}> 
                  <TableStockCount isShowFullTable={isShowFullTable} data={data}/>
              </FullTable> 
              </View>
          
        </View>
    )
}

const styles = StyleSheet.create({
    topLabel: {
      marginVertical: 30,
      paddingHorizontal: 40
    },
});

export default SubmenuStockCount;