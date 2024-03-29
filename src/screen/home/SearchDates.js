import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SafeAreaView, StyleSheet, ScrollView, Dimensions, View } from 'react-native';
import { Layout, Tab, TabView, Button } from '@ui-kitten/components';
import { RangeCalendar } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import SelectGuest from '../../components/hotelsDetail/selectGuest';
import { removeGuests, addGuests, chooseDates } from '../../redux/actions/hotelDetailActions';
import LoadPrices from '../../redux/thunkActions/loadPrices';

const SearchDates = (props) => {

  const navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = React.useState(props.route.params.index);
  const dates = props.hotelDetail.dates;
  const [range, setRange] = React.useState({ startDate: dates.startDate, endDate: dates.endDate });

  const ClosePage = () => {
    navigation.goBack();
    setTimeout(function () {
      props.chooseDates({ dates: range });
    }, 10);
  }

  const roomsLength = Object.keys(props.hotelDetail.rooms).length;
  const rooms = [];
  for (var i = 1; i <= roomsLength; i++) {
    rooms.push(i);
  }
  const [roomsArray, setRoomsArray] = React.useState(rooms);

  var lastNum = roomsArray.slice(-1);

  const addRoom = () => {
    setRoomsArray(roomsArray.concat(JSON.parse(lastNum[0] + 1)));
    props.addGuests({ room: lastNum[0] + 1, guests: { adult: 1, children: 0 } });
  }

  const removeRoom = () => {
    setRoomsArray(roomsArray.slice(0, -1));
    var guestsArr = props.hotelDetail.rooms;
    delete guestsArr[roomsArray.length];
    props.removeGuests(guestsArr);
  }

  const setDateRange = (obj) => {
    setRange({ startDate: obj.startDate, endDate: obj.endDate });
  }

  return (
    <SafeAreaView >
      <TabView
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
        style={styles.tabs}
      >
        <Tab title='Check In / Out' style={styles.title}>
          <Layout style={styles.tabContainer}>
            <RangeCalendar
              style={styles.calender}
              range={range}
              onSelect={setDateRange}
            />
          </Layout>
        </Tab>
        <Tab title='Guests' style={styles.title}>
          <ScrollView contentContainerStyle={[styles.dates, styles.guests]} showsVerticalScrollIndicator={false}>
            {roomsArray.map((item) => {
              if (props.hotelDetail.rooms[item] !== undefined) {
                return <SelectGuest key={item} roomNum={item} adult={props.hotelDetail.rooms[item].adult} children={props.hotelDetail.rooms[item].children} removeRoom={removeRoom} ClosePage={ClosePage} />
              }
            })}
            <Animatable.View animation="bounceInRight" direction="normal" duration={500} useNativeDriver={true}>
              <Button style={styles.addRoom} appearance='outline' status='primary' onPress={addRoom}>Add Room</Button>
            </Animatable.View>
          </ScrollView>
        </Tab>
      </TabView>
      <View style={styles.btnContainer}>
        <Button onPress={ClosePage} status='primary'>Confirm</Button>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ removeGuests: removeGuests, addGuests: addGuests, chooseDates: chooseDates, LoadPrices: LoadPrices }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SearchDates));

const styles = StyleSheet.create({
  tabContainer: {
    minHeight: 64,
  },
  title: {
    padding: 10,
  },
  guests: {
    margin: 20,
    marginBottom: 0,
  },
  btnContainer:{
    padding: 5,
    width: '100%',
    position: 'absolute',
    bottom: 5,
  },
  calender: {
    width: '100%',
  },
  tabs:{
    height: Dimensions.get('window').height - 20
  },
  addRoom:{
    marginBottom: 130
  }
});