import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SafeAreaView, ScrollView, View } from 'react-native';
import RoomsListAllLarge from '../../components/rooms/roomsListAllLarge';
import TopNavSimple from '../../components/navigation/topNavSimple';
import { withNavigation } from 'react-navigation';
import LoadRecommendedRoomsData from '../../redux/thunkActions/loadRecommendedRoomsData';
import RecommendedRoomsSK from '../../components/skeletons/recommendedRoomsSK';
import { loadPrices } from '../../redux/actions/hotelDetailActions';

const HotelsLargeListScreen = (props) => {

  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([1, 2]);

  useEffect(() => {
    async function loadDatas(){
      const response = await LoadRecommendedRoomsData(props.common.userData.access_token);
      setData(response);
      setLoading(false);
    }
    if(loading === true){
        loadDatas();
    }
  }, [])

  const navigateHotelDetails = (alias) => {
    props.navigation.navigate('HotelsDetail',{
      alias: alias
    });
    props.loadPrices({});
  }

  const RenderSK = () => {
    return(
      <View style={{alignItems: 'center', paddingTop: 20,}}>
        <RecommendedRoomsSK/>
        <RecommendedRoomsSK/>
      </View>
    )
  }

  return (
    <SafeAreaView>
      <TopNavSimple screenTitle="Recommended Rooms" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading === true ? <RenderSK/> : data.map((item) => <RoomsListAllLarge key={item.alias} navigate={() => navigateHotelDetails(item.alias)} image={item.image[0].file} rating={item.avg_rating} token={props.common.userData.access_token} hotelId={item.id} hotelName={item.title} cost={item.price_start} oldCost={(item.price_start) + 200} is_favourite={item.is_favorite} /> )}
        <View style={{marginBottom: 80}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ loadPrices: loadPrices}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(HotelsLargeListScreen));