import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
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
import LoadHotelDetailsData from '../../redux/thunkActions/loadHotelDetails';
import LoadPrices from '../../redux/thunkActions/loadPrices';

// Skeletons
import ThumbImageSK from '../../components/skeletons/thumbImageSK';
import NameBlockSK from '../../components/skeletons/hotelDetail/nameBlockSK';
import DescriptionBlockSK from '../../components/skeletons/hotelDetail/descriptionBlockSK';
import ChooseRoomsBlockSK from '../../components/skeletons/hotelDetail/chooseRoomsBlockSK';
import GuestDetailsBlockSK from '../../components/skeletons/hotelDetail/guestDetailsBlockSK';
import RulesBlockSK from '../../components/skeletons/hotelDetail/rulesBlockSK';
import AmenitiesBlockSK from '../../components/skeletons/hotelDetail/amenitiesBlockSK';
import RoomsBlockSK from '../../components/skeletons/hotelDetail/roomsBlockSK';
import ReviewRatingBlockSK from '../../components/skeletons/hotelDetail/reviewsRatingsSK';
import PriceDetailsBlockSK from '../../components/skeletons/hotelDetail/priceDetailsBlockSK';
import TotalPriceSK from '../../components/skeletons/hotelDetail/totalPriceSK';


const HotelsDetail = (props) => {

  var errors = props.hotelDetail.prices_services;
  const [data, setData] = React.useState({});
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
    }
    if (loading === true) {
      loadDatas();
    }
  }, [])

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
    errors !== undefined && errors !== null && errors.error !== '' ? setShowSnack(true) : false;
    return (
      priceCond ? <PricingDetails data={prices.data} /> : <PriceDetailsBlockSK />
    );
  }

  const RenderTotal = () => (
    priceCond ?
      <View>
        <BookHotel data={prices.data.data} />
        {errors !== undefined && errors !== null && errors.error !== undefined ?
          <View style={styles.snackbar}>
            <SnackBar visible={showSnack} textMessage={errors.error} actionText="Ok" actionHandler={() => setShowSnack(false)} />
          </View>
          : null}
      </View>
      : <TotalPriceSK />
  );

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopNavSimple screenTitle={loading === false ? data.nameBlock.title : ''} />
        {loading === true ? <ThumbImageSK /> : <ThumbImg route={props.route.params} images={data.imageBlock} />}
        <View style={styles.bodyContainer}>
          {loading === true ? <NameBlockSK /> : <NameBlock data={data.nameBlock} />}
          {loading === true ? <DescriptionBlockSK /> : <HotelDescription description={data.descriptionBlock.desc} />}
          {loading === true ? <AmenitiesBlockSK /> : <Amenities data={data.amenitiesBlock} />}
          {loading === true ? <RoomsBlockSK /> : <RoomsCategory hotelId={data.nameBlock.id} data={data.roomsBlock} />}
          {loading === true ? <ChooseRoomsBlockSK /> : <ChooseDates alias={props.route.params.alias} />}
          {loading === true ? <GuestDetailsBlockSK /> : <GuestDetails />}
          {loading === true ? <ReviewRatingBlockSK /> : <ReviewsRatings data={data.reviewsRatingsBlock} hotelId={data.nameBlock.id} />}
          <RenderPriceBlock />
          {loading === true ? <RulesBlockSK /> : <RulesPolicies />}
        </View>
        <View style={{ marginBottom: 10 }} />
      </ScrollView>
      <RenderTotal />
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
  },
  snackbar: {
    height: 45,
    overflow: 'hidden',
  }
});