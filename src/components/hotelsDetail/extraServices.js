import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text, CheckBox, Icon, Tooltip, StyleService, useStyleSheet } from '@ui-kitten/components';
import { View } from 'react-native';
import Ripple from 'react-native-material-ripple';

import { addServices, removeServices, serviceChecked } from '../../redux/actions/hotelDetailActions';
import LoadPrices from '../../redux/thunkActions/loadPrices';

const ExtraServices = (props) => {

  const styles = useStyleSheet(style);
  const count = 1;
  const [visible, setVisible] = React.useState(false);

  const checkChange = async () => {
    var check = false;
    const checkArr = props.hotelDetail.serviceChecked;

    if (!props.hotelDetail.serviceChecked.includes(props.id)) {
      checkArr.push(props.id);
      props.serviceChecked(checkArr);
      check = await props.addServices({ id: props.id, serviceId: props.service_id, qty: count });
      if (check) {
        setTimeout(function () {
          props.LoadPrices({ hotelId: props.hotelDetail.hotelIds.hotelId, roomId: props.hotelDetail.hotelIds.roomId, dates: props.hotelDetail.dates, rooms: props.hotelDetail.rooms, service: check.servicesArr, foods: props.hotelDetail.foods }, props.common.userData.access_token);
        }, 10);
      }
    }
    else {
      checkArr.splice(checkArr.indexOf(props.id), 1);
      props.serviceChecked(checkArr);
      var serviceArr = props.hotelDetail.services;
      delete serviceArr[props.id];
      check = await props.removeServices(serviceArr);
      setTimeout(function () {
        props.LoadPrices({ hotelId: props.hotelDetail.hotelIds.hotelId, roomId: props.hotelDetail.hotelIds.roomId, dates: props.hotelDetail.dates, rooms: props.hotelDetail.rooms, service: serviceArr, foods: props.hotelDetail.foods }, props.common.userData.access_token);
      }, 10);
    }

  }

  const countChange = (type) => {
    const checkArr = props.hotelDetail.services;
    if (type === 'add' && checkArr[props.id].qty > 0) {
      checkArr[props.id].qty++;
      props.addServices({ id: props.id, serviceId: checkArr[props.id].service_id, qty: checkArr[props.id].qty });
      setTimeout(function () {
        if (props.hotelDetail.serviceChecked.includes(props.id)) {
          props.LoadPrices({ hotelId: props.hotelDetail.hotelIds.hotelId, roomId: props.hotelDetail.hotelIds.roomId, dates: props.hotelDetail.dates, rooms: props.hotelDetail.rooms, service: props.hotelDetail.services, foods: props.hotelDetail.foods }, props.common.userData.access_token);
        }
      }, 5);
    }
    if (type === 'minus' && checkArr[props.id].qty > 1) {
      checkArr[props.id].qty--;
      props.addServices({ id: props.id, serviceId: checkArr[props.id].service_id, qty: checkArr[props.id].qty });
      setTimeout(function () {
        if (props.hotelDetail.serviceChecked.includes(props.id)) {
          props.LoadPrices({ hotelId: props.hotelDetail.hotelIds.hotelId, roomId: props.hotelDetail.hotelIds.roomId, dates: props.hotelDetail.dates, rooms: props.hotelDetail.rooms, service: props.hotelDetail.services, foods: props.hotelDetail.foods }, props.common.userData.access_token);
        }
      }, 5);
    }
  }

  const RenderQuantity = () => {
    return (
      <View style={styles.counterContainer}>
        <Ripple onPress={() => countChange('add')}>
          <Icon name='plus-outline' width={20} height={20} fill={styles.iconColor.color} />
        </Ripple>
        <Text style={styles.count}>{props.hotelDetail.services[props.id] !== undefined ? props.hotelDetail.services[props.id].qty : 1}</Text>
        <Ripple onPress={() => countChange('minus')}>
          <Icon name='minus-outline' width={20} height={20} fill={styles.iconColor.color} />
        </Ripple>
      </View>
    )
  }

  return (
    <View style={styles.cardContainer}>
      <View>
        <View style={styles.textInfo}>
          <Text>{props.name}</Text>
          {props.desc !== '' &&
            <Tooltip
              visible={visible}
              text={props.desc}
              placement='right'
              onBackdropPress={() => setVisible(!visible)}>
              <Icon name='info-outline' style={styles.infoIcon} fill={styles.tooltipColor.color} onPress={() => setVisible(!visible)} />
            </Tooltip>
          }
        </View>
      </View>
      <View style={styles.quantityText}>
        {props.quantity === true && props.hotelDetail.serviceChecked.includes(props.id) && <RenderQuantity />}
        <View style={styles.checkText}>
          <Text style={styles.price}>{props.price}</Text>
          <CheckBox
            checked={props.hotelDetail.serviceChecked.includes(props.id) ? true : false}
            onChange={checkChange}
          />
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addServices: addServices, removeServices: removeServices, serviceChecked: serviceChecked, LoadPrices: LoadPrices }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ExtraServices);

const style = StyleService.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quantityText: {
    flexDirection: 'row'
  },
  counterContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  price: {
    width: 70,
    marginRight: 10,
    textAlign: 'right'
  },
  count: {
    marginLeft: 10,
    marginRight: 10,
  },
  desc: {
    fontSize: 13,
  },
  textInfo: {
    flexDirection: 'row'
  },
  infoIcon: {
    width: 15,
    height: 15,
    marginLeft: 5,
  },
  checkText: {
    flexDirection: 'row',
  },
  tooltipColor: {
    color: 'color-basic-700'
  },
  iconColor: {
    color: 'color-basic-600'
  }
})