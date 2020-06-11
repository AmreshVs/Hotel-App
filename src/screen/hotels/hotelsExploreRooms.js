import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import RoomsListSmall from '../../components/rooms/roomsListSmall';
import TopNavSimple from '../../components/navigation/topNavSimple';
import LoadExclusiveRoomsData from '../../redux/thunkActions/loadExclusiveRoomsData';
import { clearData } from '../../redux/actions/hotelDetailActions';
import Loader from '../../components/loader';

const HotelsLargeListScreen = (props) => {

  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    async function loadDatas() {
      const response = await LoadExclusiveRoomsData(props.common.userData.access_token);
      setData(response);
      setLoading(false);
    }
    if (loading === true) {
      loadDatas();
    }
  }, []);

  const navigateHotelDetails = (alias, id, is_favorite) => {
    props.clearData();
    navigation.navigate('HotelsDetail', {
      alias: alias,
      hotelId: id,
      is_favorite: is_favorite
    });
  }

  return (
    <SafeAreaView>
      <TopNavSimple screenTitle="Explore Rooms" backHandler={() => navigation.goBack()} />
      {loading === true ? 
        <Loader topBar={true} />
        :
        <ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: 20 }}>
          {data.map((item, index) => <RoomsListSmall key={item.alias} delay={index} navigate={() => navigateHotelDetails(item.alias, item.id, item.is_favourite)} image={item.image[0].file} rating={item.avg_rating} token={props.common.userData.access_token} hotelId={item.id} hotelName={item.title} address={item.alias} cost={item.price_start} oldCost={(item.price_start) + 200} is_favourite={item.is_favorite} />)}
          <View style={{ marginBottom: 80 }} />
        </ScrollView>
      }
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ clearData: clearData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(HotelsLargeListScreen));