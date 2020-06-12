import React from 'react';
import { connect } from 'react-redux';
import { Text, Icon, Button, StyleService, useStyleSheet } from '@ui-kitten/components';
import { View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import RangeSlider from 'rn-range-slider';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const SearchHotelCard = (props) => {

  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const [low, setLow] = React.useState(props.data !== undefined ? props.data.minCost : 0);
  const [high, setHigh] = React.useState(props.data !== undefined ? props.data.maxCost : 0);

  if (props.hotelDetail.rooms !== undefined) {
    var rooms = props.hotelDetail.rooms;
    var length = Object.keys(rooms).length;
    var roomNum = 0; var guests = 0;
    for (var i = 1; i <= length; i++) {
      roomNum++;
      if (rooms[i] !== undefined) {
        guests += rooms[i].adult + rooms[i].children;
      }
    }
  }

  const StarIcon = (style) => (
    <Icon {...style} name='search-outline' />
  );

  return (
    <View style={styles.searchCard}>
      <View style={styles.container}>
        <Animatable.View animation="fadeInDown" direction="normal" duration={500} useNativeDriver={true} >
          <Ripple style={styles.datesContainer} rippleDuration={600} onPress={() => navigation.navigate('SearchDates', { index: 0 })}>
            <Icon name='log-in-outline' width={32} height={32} fill={styles.iconFill.color} />
            <Text style={styles.heading}>Check In</Text>
            <Text style={styles.dateCaption}>{moment(props.hotelDetail.dates.startDate).format("DD MMM YYYY")}</Text>
          </Ripple>
        </Animatable.View>
        <View style={styles.seperator} />
        <Animatable.View animation="fadeInDown" direction="normal" duration={500} useNativeDriver={true} >
          <Ripple style={styles.datesContainer} rippleDuration={600} onPress={() => navigation.navigate('SearchDates', { index: 0 })}>
            <Icon name='log-out-outline' width={32} height={32} fill={styles.iconFill.color} />
            <Text style={styles.heading}>Check Out</Text>
            <Text style={styles.dateCaption}>{moment(props.hotelDetail.dates.endDate).format("DD MMM YYYY")}</Text>
          </Ripple>
        </Animatable.View>
        <View style={styles.seperator} />
        <Animatable.View animation="fadeInDown" direction="normal" duration={500} useNativeDriver={true} >
          <Ripple style={styles.datesContainer} rippleDuration={600} onPress={() => navigation.navigate('SearchDates', { index: 1 })}>
            <Icon name='people-outline' width={32} height={32} fill={styles.iconFill.color} />
            <Text style={styles.heading}>Rooms - Guest</Text>
            <Text style={styles.dateCaption}>{roomNum} - {guests}</Text>
          </Ripple>
        </Animatable.View>
      </View>
      <Animatable.View animation="fadeInDown" direction="normal" duration={500} useNativeDriver={true} >
        <View style={styles.price}>
          <Text style={styles.dateCaption}>{'₹' + low}</Text>
          <Text style={styles.heading}>Price Range</Text>
          <Text style={styles.dateCaption}>{'₹' + high}</Text>
        </View>
        <RangeSlider
          style={styles.slider}
          gravity={'center'}
          min={props.data !== undefined ? props.data.minCost : 0}
          max={props.data !== undefined ? props.data.maxCost : 0}
          step={50}
          selectionColor={styles.range.color}
          blankColor={styles.range.blank}
          labelStyle="none"
          onValueChanged={(low, high) => {
            setLow(low);
            setHigh(high);
          }}
        />
      </Animatable.View>
      <Animatable.View animation="bounceInRight" direction="normal" duration={500} useNativeDriver={true} >
        <Button style={styles.button} status='primary' size='small' icon={StarIcon} onPress={() => navigation.push('SearchRooms', { price: low + ',' + high})}>Search Rooms</Button>
      </Animatable.View>
    </View>
  );
}


const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(React.memo(SearchHotelCard));

const themedStyles = StyleService.create({
  searchCard: {
    marginTop: -95,
    margin: '5%',
    padding: 15,
    marginBottom: 30,
    borderRadius: 10,
    backgroundColor: 'background-basic-color-1',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headBlock: {
    width: '100%',
    height: 250,
    borderBottomRightRadius: 50,
  },
  datesContainer: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99999
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  seperator: {
    width: 1,
    height: 100,
    backgroundColor: 'color-basic-300'
  },
  heading: {
    fontSize: hp('2.3%'),
    fontWeight: '700',
    color: 'color-primary-500',
    marginBottom: 5,
  },
  dateCaption: {
    fontSize: hp('2.2%'),
    color: 'color-basic-600'
  },
  iconFill: {
    color: 'color-primary-500'
  },
  range:{
    color: 'color-success-500',
    blank: 'color-basic-300'
  },
  slider:{
    width: '100%',
    height: 40,
    marginBottom: 10,
    // paddingBottom: 10,
  },
  price:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});