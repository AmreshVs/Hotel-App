import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import TopNavSimple from '../../components/navigation/topNavSimple';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { TopNavigationAction, Icon } from '@ui-kitten/components';
import Ripple from 'react-native-material-ripple';

import ConfirmBlock from '../../components/bookingDetails/confirmBlock';
import HelpBlock from '../../components/bookingDetails/helpBlock';
import BookedHotelDetails from '../../components/bookingDetails/BookedHotelDetails';

import ConfirmBlockSK from '../../components/skeletons/bookingDetails/confirmBlockSK';
import HelpBlockSK from '../../components/skeletons/bookingDetails/helpBlockSK';
import BookedDetailsSK from '../../components/skeletons/bookingDetails/bookedDetailsSK';
import LoadBookingDetails from '../../redux/thunkActions/loadBookingDetails';

const BookingDetails = (props) => {

    const [data, setData] = React.useState([]);

    useEffect(() => {
      async function loadDatas(){
        const response = await LoadBookingDetails(props.access_token, props.navigation.state.params.id);
        setData(response[0]);
      }
      loadDatas();
    }, []);

    const reloadData = async () => {
        setData([]);
        const response = await LoadBookingDetails(props.access_token, props.navigation.state.params.id);
        setData(response[0]);
    }

    const BackIcon = () => <Icon name='refresh-outline' fill='#FFF' />;

    const RefreshAction = () => (
        <Ripple onPress={reloadData}>
            <TopNavigationAction icon={BackIcon} />
        </Ripple>
    );

    return(
        <View style={styles.bodyContainer}>
            <TopNavSimple screenTitle='Booking Details' backHandler={() => props.navigation.navigate('BookingsScreen')} rightControl={true} rightControlFun={RefreshAction} />
            <ScrollView contentContainerStyle={styles.container}  showsVerticalScrollIndicator={false}>
                <View style={styles.contentContainer}>
                    {data.length <= 0 ? <ConfirmBlockSK/> : <ConfirmBlock booking_id={data.booking_id} total={data.total} status={data.status} status_label={data.status_label} transaction_id={data.transaction_id} />}
                    {data.length <= 0 ? <BookedDetailsSK/> : <BookedHotelDetails data={data} token={props.access_token} reloadData={reloadData} />}
                    {data.length <= 0 ? <HelpBlockSK/> : <HelpBlock/>}
                </View>
            </ScrollView>
        </View>
    );
}

const mapStateToProps = (state) => {
    return state.common.userData;
}

export default connect(mapStateToProps)(withNavigation(BookingDetails));

const styles = StyleSheet.create({
    bodyContainer:{
        backgroundColor: '#FAFAFA',
        height: '100%',
    },
    container:{
        alignItems: 'center',
    },
    contentContainer:{
        width: '96%',
    }
});