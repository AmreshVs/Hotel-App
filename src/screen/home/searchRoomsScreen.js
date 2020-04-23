import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import RoomsListSmall from '../../components/rooms/roomsListSmall';
import TopNavSimple from '../../components/navigation/topNavSimple';
import ExclusiveRoomsSK from '../../components/skeletons/exclusiveRoomsSK';
import FindHotels from '../../redux/thunkActions/findHotels';
import { clearData } from '../../redux/actions/hotelDetailActions';

const SearchRoomsScreen = (props) => {

  const navigation = useNavigation();
  const [data, setData] = React.useState([]);

  useEffect(() => {
    async function loadDatas() {
      const response = await FindHotels({ dates: props.hotelDetail.dates, rooms: props.hotelDetail.rooms }, props.common.userData.access_token);
      setData(response);
    }
    loadDatas();
  }, []);

  const navigateHotelDetails = (alias, id, is_favorite) => {
    props.clearData();
    navigation.navigate('HotelsDetail', {
      alias: alias,
      hotelId: id,
      is_favorite: is_favorite
    });
  }

  const RenderSK = () => {
    return (
      <View>
        <ExclusiveRoomsSK />
        <ExclusiveRoomsSK />
        <ExclusiveRoomsSK />
        <ExclusiveRoomsSK />
      </View>
    )
  }

  return (
    <SafeAreaView>
      <TopNavSimple screenTitle="Find Rooms" backHandler={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: 20 }}>
        {data <= 0 ? <RenderSK /> : data.map((item) => <RoomsListSmall key={item.alias} navigate={() => navigateHotelDetails(item.alias, item.id, item.is_favourite)} image={item.image[0].file} rating={item.avg_rating} token={props.common.userData.access_token} hotelId={item.id} hotelName={item.title} address={item.alias} cost={item.price_start} oldCost={(item.price_start) + 200} is_favourite={item.is_favorite} />)}
        <View style={{ marginBottom: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ clearData: clearData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SearchRoomsScreen));