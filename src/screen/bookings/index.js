import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Text, Tab, TabView, StyleService, useStyleSheet } from '@ui-kitten/components';
import TopNavSimple from '../../components/navigation/topNavSimple';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import LoadBookingHistory from '../../redux/thunkActions/loadBookingsHistory';
import { NavigationEvents } from 'react-navigation';
import CheckUserData from '../../commonFunctions/checkUserData';
import BookingsOverview from '../../components/bookings/index';
import BookingsOverviewSK from '../../components/skeletons/bookingsOverviewSK';

const NoBookings = (props) => {
    const styles = useStyleSheet(style);
    return(
        <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No Bookings has been {props.txt} yet!</Text>
        </View>
    );
}

const BookingssScreen = (props) => {
    const styles = useStyleSheet(style);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const shouldLoadComponent = (index) => index === selectedIndex;
    const [data, setData] = React.useState({});

    useEffect(() => {
      CheckUserData(props.userData);
      async function loadDatas(){
        const response = await LoadBookingHistory(props.userData.access_token);
        setData(response);
      }
      loadDatas();
    }, []);

    const reloadData = async () => {
        CheckUserData(props.userData);
        setData([]);
        const response = await LoadBookingHistory(props.userData.access_token);
        setData(response);
    }

    return(
        <View style={styles.bodyContainer}>
            <NavigationEvents
                onWillFocus={reloadData}
            />
            <TopNavSimple screenTitle='Your Bookings' backHandler={() => props.navigation.goBack()} />
            <TabView
                selectedIndex={selectedIndex}
                shouldLoadComponent={shouldLoadComponent}
                onSelect={setSelectedIndex}>
                <Tab style={styles.tabs} title='Upcoming'>
                    {data.upcoming === undefined ? <BookingsOverviewSK/> : (data.upcoming.length > 0 ? <BookingsOverview data={data.upcoming}/> : <NoBookings txt='made'/>)}
                </Tab>
                <Tab style={styles.tabs} title='Completed'>
                    {data.complete === undefined ? <BookingsOverviewSK/> : (data.complete.length > 0 ? <BookingsOverview data={data.complete} /> : <NoBookings txt='completed'/>)}
                </Tab>
                <Tab style={styles.tabs} title='Cancelled'>
                    {data.cancelled === undefined ? <BookingsOverviewSK/> : (data.cancelled.length > 0 ? <BookingsOverview data={data.cancelled} /> : <NoBookings txt='cancelled'/>)}
                </Tab>
            </TabView>
        </View>
    );
}

const mapStateToProps = (state) => {
    return state.common;
}

export default connect(mapStateToProps)(withNavigation(BookingssScreen));

const style = StyleService.create({
    bodyContainer:{
        backgroundColor: 'background-basic-color-2',
        height: '100%',
    },
    noDataContainer:{
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataText:{
        fontSize: 16,
        color: 'color-basic-700',
    },
    tabs:{
        padding: 10,
    },
});