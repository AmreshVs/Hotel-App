import React from 'react';
import { Text, StyleService, useStyleSheet } from '@ui-kitten/components';
import { FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { RFPercentage } from "react-native-responsive-fontsize";

import FoodItems from './foodItems';
import LoadFoodsBeverages from '../../redux/thunkActions/loadFoodsBeverages';

const FoodsBeverages = (props) => {
  
  const styles = useStyleSheet(style);
  const [refresh, setRefresh] = React.useState(false);
  const [data, setData] = React.useState(props.data.data);
  const [page, setPage] = React.useState(2);

  const loadMore = async () => {
    setRefresh(true);
    var backupData = data;
    const result = await LoadFoodsBeverages(props.token, props.hotelId, page);
    if(result && result.next_page_url !== null){
      setData([...backupData, ...result.data]);
      setPage(page + 1);
    }
    setRefresh(false);
  }

  return (
    <Animatable.View style={styles.cardContainer} animation="fadeInRight" direction="normal" duration={500} useNativeDriver={true} >
      <Text style={styles.heading}>Foods & Beverages</Text>
      <FlatList
        data={data}
        horizontal={true}
        onEndReachedThreshold={1}
        refreshing={refresh}
        onRefresh={loadMore}
        onEndReached={loadMore}
        renderItem={({ item, index }) => (
          <FoodItems item={item} index={index} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </Animatable.View>
  );
}

export default FoodsBeverages;

const style = StyleService.create({
  cardContainer: {
    width: '100%',
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: 'background-basic-color-1',
    padding: 13,
    borderWidth: 1,
    borderColor: 'color-basic-300',
  },
  heading: {
    fontSize: RFPercentage(2.5),
    marginBottom: 3,
    color: 'color-basic-700',
    fontWeight: '700',
  },
  scroll:{
    flex: 1,
    flexDirection: 'row',
  },
})