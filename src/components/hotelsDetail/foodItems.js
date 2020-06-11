import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text, StyleService, useStyleSheet, Button, Icon } from '@ui-kitten/components';
import { Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { addFoods, removeFoods } from '../../redux/actions/hotelDetailActions';
import LoadPrices from '../../redux/thunkActions/loadPrices';

const FoodItems = (props) => {

  const styles = useStyleSheet(style);
  const [add, setAdd] = React.useState(false);
  const [count, setCount] = React.useState(1);
  var result = '';

  const PlusIcon = (props) => (
    <Icon {...props} name='plus-outline' width={15} height={15} />
  );

  const MinusIcon = (props) => (
    <Icon {...props} name='minus-outline'/>
  );

  const addFood = () => {
    setAdd(!add);
    setCount(1);
    result = props.addFoods({index: props.index, foods: { id: props.item.id, qty: count }});
    loadPrice(result);
  }

  const removeFood = () => {
    setAdd(!add);
    result = props.removeFoods({index: props.index});
    loadPrice(result);
  }

  const qtyChange = (type) => {
    if(type === 'add'){
      setCount(count + 1);
      result = props.addFoods({index: props.index, foods: { id: props.item.id, qty: count + 1 }});
      loadPrice(result);
    }
    else{
      setCount(count - 1);
      result = props.addFoods({index: props.index, foods: { id: props.item.id, qty: count - 1 }});
      loadPrice(result);
    }
  }

  const loadPrice = (result) => {
    props.LoadPrices({ hotelId: props.hotelDetail.hotelIds.hotelId, roomId: props.hotelDetail.hotelIds.roomId, dates: props.hotelDetail.dates, rooms: props.hotelDetail.rooms, service: props.hotelDetail.services, foods: result.foodsArr, coupons: props.hotelDetail.coupons.code || '' }, props.common.userData.access_token);
  } 

  return(
    <Animatable.View style={styles.foodsContainer} animation="fadeInRight" direction="normal" duration={500} useNativeDriver={true} delay={props.index * 80} >
      <Image
        style={styles.foodsImg}
        source={{ uri: props.item.image }}
      />
      <Text style={styles.foodName}>{props.item.name}</Text>
      <Text style={styles.caption}>₹{props.item.price}</Text>
      { add === false
        ? 
          <Animatable.View animation="fadeInRight" duration={500}>
            <Button status='success' size='small' onPress={addFood}>Add</Button>
          </Animatable.View>
        : 
          <Animatable.View style={styles.btnContainer} animation="fadeInRight" duration={500}>
            <Button style={styles.btn} status='success' size='small' icon={MinusIcon} onPress={() => count > 1 ? qtyChange('minus') : removeFood()}/>
            <Text style={styles.caption}>{count}</Text>
            <Button style={styles.btn} status='success' size='small' icon={PlusIcon} onPress={() => qtyChange('add')}/>
          </Animatable.View>
      }
    </Animatable.View>
  )
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => { 
  return bindActionCreators({addFoods: addFoods, removeFoods: removeFoods, LoadPrices: LoadPrices}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodItems);

const style = StyleService.create({
  foodsContainer:{
    width: 150,
    margin: 10
  },
  foodName:{
    color: 'color-basic-700',
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 3
  },
  caption:{
    color: 'color-basic-600',
    paddingBottom: 5
  },
  foodsImg:{
    width: 150,
    height: 150,
    borderRadius: 5,
    backgroundColor: 'color-basic-400',
    borderWidth: 1,
    borderColor: 'color-basic-300'
  },
  btn:{
    width: 35
  },
  btnContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})