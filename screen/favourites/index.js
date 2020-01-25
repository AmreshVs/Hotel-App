import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Icon, Text} from '@ui-kitten/components';
import TopNavSimple from '../../components/navigation/topNavSimple';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import RoomsListSmall from '../../components/rooms/roomsListSmall';

const NoFavourites = () => {
  return (
    <View style={styles.noDataContainer}>
      <Text style={styles.noDataText}>No </Text>
      <Icon name="heart" width={30} height={30} fill="red" />
      <Text style={styles.noDataText}> Favourites has been added yet!</Text>
    </View>
  );
};

const FavouritesScreen = props => {
  const navigateHotelDetails = () => {
    props.navigation.navigate('HotelsDetail');
  };

  return (
    <View style={styles.bodyContainer}>
      <TopNavSimple
        screenTitle="Favourite Rooms"
        backHandler={() => props.navigation.goBack()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.favourites}>
        {props.initialState.AppData.map(item => (
          <RoomsListSmall
            key={item.id}
            navigate={navigateHotelDetails}
            image={item.image}
            rating={item.rating}
            hotelName={item.hotelName}
            address={item.address}
            cost={item.cost}
            oldCost={item.oldCost}
          />
        ))}
      </ScrollView>
      {/* <NoFavourites/> */}
    </View>
  );
};

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(withNavigation(FavouritesScreen));

const styles = StyleSheet.create({
  bodyContainer: {
    backgroundColor: '#FAFAFA',
    height: '100%',
  },
  noDataContainer: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: '#626262',
  },
  favourites: {
    paddingTop: 10,
  },
});
