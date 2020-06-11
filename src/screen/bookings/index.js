import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Text, Tab, TabView, StyleService, useStyleSheet } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import TopNavSimple from '../../components/navigation/topNavSimple';
import LoadBookingHistory from '../../redux/thunkActions/loadBookingsHistory';
import CheckUserData from '../../commonFunctions/checkUserData';
import BookingsOverview from '../../components/bookings/index';
import Loader from '../../components/loader';

const NoBookings = (props) => {

  const styles = useStyleSheet(style);

  return (
    <View style={styles.noDataContainer}>
      <Text style={styles.noDataText}>No Bookings has been {props.txt} yet!</Text>
    </View>
  );
}

const BookingssScreen = (props) => {

  const navigation = useNavigation();
  const styles = useStyleSheet(style);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [refresh, setRefresh] = React.useState(false);
  const shouldLoadComponent = (index) => index === selectedIndex;

  useEffect(() => {
    CheckUserData(props.userData);
    async function loadDatas() {
      const response = await LoadBookingHistory(props.userData.access_token);
      setData(response);
      setLoading(false);
    }
    loadDatas();
    navigation.addListener('focus', () => {
      reloadData();
    });

    return () => {
      navigation.removeListener('focus');
    }
  }, []);

  const reloadData = async () => {
    CheckUserData(props.userData);
    setRefresh(true);
    const response = await LoadBookingHistory(props.userData.access_token);
    setData(response);
    setRefresh(false);
  }

  return (
    <View style={styles.bodyContainer}>
      <TopNavSimple screenTitle='Your Bookings' />
      <TabView
        selectedIndex={selectedIndex}
        shouldLoadComponent={shouldLoadComponent}
        onSelect={setSelectedIndex}>
        <Tab style={styles.tabs} title='Upcoming'>
          {loading === true ? <Loader topBottom={true} /> : (data.upcoming.length > 0 ? <BookingsOverview data={data.upcoming} refresh={refresh} reloadData={reloadData} /> : <NoBookings txt='made' />)}
        </Tab>
        <Tab style={styles.tabs} title='Completed'>
          {loading === true ? <Loader topBottom={true} /> : (data.complete.length > 0 ? <BookingsOverview data={data.complete} refresh={refresh} reloadData={reloadData} /> : <NoBookings txt='completed' />)}
        </Tab>
        <Tab style={styles.tabs} title='Cancelled'>
          {loading === true ? <Loader topBottom={true} /> : (data.cancelled.length > 0 ? <BookingsOverview data={data.cancelled} refresh={refresh} reloadData={reloadData} /> : <NoBookings txt='cancelled' />)}
        </Tab>
      </TabView>
    </View>
  );
}

const mapStateToProps = (state) => {
  return state.common;
}

export default connect(mapStateToProps)(BookingssScreen);

const style = StyleService.create({
  bodyContainer: {
    backgroundColor: 'background-basic-color-2',
    height: '100%',
  },
  noDataContainer: {
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: 'color-basic-700',
  },
  tabs: {
    padding: 10,
  },
});