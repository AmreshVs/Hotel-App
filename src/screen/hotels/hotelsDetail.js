import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SnackBar from 'react-native-snackbar-component';

import TopNavSimple from '../../components/navigation/topNavSimple';
import ThumbImg from '../../components/hotelsDetail/thumbImg';
import NameBlock from '../../components/hotelsDetail/nameBlock';
import HotelDescription from '../../components/hotelsDetail/hotelDescription';
import RoomsCategory from '../../components/hotelsDetail/roomsCategory';
import Amenities from '../../components/hotelsDetail/amenities';
import ChooseDates from '../../components/hotelsDetail/chooseDates';
import GuestDetails from '../../components/hotelsDetail/guestDetails';
import ReviewsRatings from '../../components/hotelsDetail/reviewsRatings';
import RulesPolicies from '../../components/hotelsDetail/rulesPolicies';
import PricingDetails from '../../components/hotelsDetail/pricingDetails';
import BookHotel from '../../components/hotelsDetail/bookHotel';
import FoodsBeverages from '../../components/hotelsDetail/foodsBeverages';
import LoadHotelDetailsData from '../../redux/thunkActions/loadHotelDetails';
import LoadFoodsBeverages from '../../redux/thunkActions/loadFoodsBeverages';
import LoadPrices from '../../redux/thunkActions/loadPrices';
import Loader from '../../components/loader';

// Skeletons
import PriceDetailsBlockSK from '../../components/skeletons/hotelDetail/priceDetailsBlockSK';
import TotalPriceSK from '../../components/skeletons/hotelDetail/totalPriceSK';


const HotelsDetail = (props) => {

  const navigation = useNavigation();
  var errors = props.hotelDetail.prices_services;
  const [data, setData] = React.useState({});
  const [foods, setFoods] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [loadPrices, setLoadPrices] = React.useState(null);
  const [showSnack, setShowSnack] = React.useState(false);

  const priceCond = props.hotelDetail.prices_services !== undefined && props.hotelDetail.prices_services !== null && props.hotelDetail.prices_services.pricesLoading === false;

  useEffect(() => {
    async function loadDatas() {
      const response = await LoadHotelDetailsData(props.route.params.alias, props.common.userData.access_token);
      setData(response.data[0]);
      setLoading(false);
      setLoadPrices(true);
      const result = await LoadFoodsBeverages(props.common.userData.access_token, response.data[0].nameBlock.id);
      setFoods(result);
    }
    
    loadDatas();
    
  }, []);

  if (loadPrices === true) {
    setLoadPrices(false);
    if (props.hotelDetail.services.length <= 0) {
      props.LoadPrices({ hotelId: data.nameBlock.id, roomId: data.roomsBlock[0].id, dates: props.hotelDetail.dates, rooms: props.hotelDetail.rooms }, props.common.userData.access_token);
    }
    else {
      props.LoadPrices({ hotelId: data.nameBlock.id, roomId: data.roomsBlock[0].id, dates: props.hotelDetail.dates, rooms: props.hotelDetail.rooms, service: props.hotelDetail.services }, props.common.userData.access_token);
    }
  }

  if (props.hotelDetail.prices_services !== undefined && props.hotelDetail.prices_services !== null) {
    var prices = props.hotelDetail.prices_services;
  }

  const RenderPriceBlock = () => {
    if(errors !== undefined && errors !== null && errors.error !== ''){
      setShowSnack(true);
    }
    return (
      priceCond ? <PricingDetails data={prices.data} /> : <PriceDetailsBlockSK />
    );
  }

  const RenderTotal = () => (
    priceCond ?
      <View>
        <BookHotel data={prices.data.data} hotelId={data.nameBlock !== undefined ? data.nameBlock.id : null} alias={props.route.params.alias} is_favorite={props.route.params.is_favorite} />
        {errors !== undefined && errors !== null && errors.error !== undefined ?
          <View style={styles.snackbar}>
            <SnackBar visible={showSnack} textMessage={errors.error} />
          </View>
          : null}
      </View>
      : <TotalPriceSK />
  );

  return (
    <SafeAreaView style={styles.background}>
      {loading === true ? 
        <Loader/>
        :
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TopNavSimple screenTitle={loading === false ? data.nameBlock.title : ''} backHandler={() => navigation.goBack()} />
            <ThumbImg route={props.route.params} images={data.imageBlock} />
            <View style={styles.bodyContainer}>
              <NameBlock data={data.nameBlock} />
              <HotelDescription description={data.descriptionBlock.desc} />
              <Amenities data={data.amenitiesBlock} />
              <RoomsCategory hotelId={data.nameBlock.id} data={data.roomsBlock} />
              <ChooseDates alias={props.route.params.alias} />
              {props.common.userData.type === 'editor' ? <GuestDetails /> : null}
              <ReviewsRatings data={data.reviewsRatingsBlock} hotelId={data.nameBlock.id} />
              {foods.data !== undefined && foods.data.length > 0 ? <FoodsBeverages data={foods} token={props.common.userData.access_token} hotelId={data.nameBlock.id} /> : null}
              <RenderPriceBlock />
              <RulesPolicies />
            </View>
            <View style={{ marginBottom: 10 }} />
          </ScrollView>
          <RenderTotal />
        </>
      }
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ LoadPrices: LoadPrices }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(HotelsDetail));

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FAFAFA',
    height: '100%',
  },
  bodyContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  },
  snackbar: {
    height: 45,
    overflow: 'hidden',
  }
});