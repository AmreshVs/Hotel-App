import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text, Tab, TabView, Card} from '@ui-kitten/components';
import TopNavSimple from '../../components/navigation/topNavSimple';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';

const NoBookings = () => {
  return (
    <View style={styles.noDataContainer}>
      <Text style={styles.noDataText}>No Bookings has been made yet!</Text>
    </View>
  );
};

const FavouritesScreen = props => {
  var data = props.initialState.AppData[0];

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const shouldLoadComponent = index => index === selectedIndex;

  return (
    <View style={styles.bodyContainer}>
      <TopNavSimple
        screenTitle="Your Bookings"
        backHandler={() => props.navigation.goBack()}
      />
      {/* <NoBookings/> */}
      <TabView
        selectedIndex={selectedIndex}
        shouldLoadComponent={shouldLoadComponent}
        onSelect={setSelectedIndex}>
        <Tab style={styles.tabs} title="Upcoming">
          <View style={styles.container}>
            <Card style={styles.cardContainer}>
              <View style={styles.row}>
                <View>
                  <Image style={styles.image} source={{uri: data.image}} />
                </View>
                <View style={styles.content}>
                  <Text style={styles.hotelName}>{data.hotelName}</Text>
                  <Text style={styles.caption}>30 Dec - 31 Dec</Text>
                </View>
              </View>
              <View style={styles.info}>
                <Text style={styles.address}>Coimbatore</Text>
                <Text style={styles.caption}>Booked on 29 Dec 2019</Text>
              </View>
            </Card>
          </View>
        </Tab>
        <Tab style={styles.tabs} title="Completed">
          <Text>List of orders.</Text>
        </Tab>
        <Tab style={styles.tabs} title="Cancelled">
          <Text>ORDERS</Text>
        </Tab>
      </TabView>
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
  tabs: {
    padding: 10,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  cardContainer: {
    width: '95%',
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 70,
    borderRadius: 7,
  },
  row: {
    flexDirection: 'row',
  },
  content: {
    width: '72%',
    paddingLeft: 10,
  },
  hotelName: {
    color: '#626262',
  },
  caption: {
    color: '#BBB',
  },
  info: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  address: {
    color: '#626262',
  },
});
