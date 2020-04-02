import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../../screen/login/index';
import Main from '../../screen/Main/index';
import HomeScreen from '../../screen/home/index';
import SearchRoomsScreen from '../../screen/home/searchRoomsScreen';
import FavouritesScreen from '../../screen/favourites/index';
import BookingsScreen from '../../screen/bookings/index';
import UserProfileScreen from '../../screen/userProfile/index';
import BottomNav from '../navigation/bottomNavigation';
import HotelsLargeListScreen from '../../screen/hotels/hotelsLargeList';
import HotelsExploreRooms from '../../screen/hotels/hotelsExploreRooms';
import HotelsDetail from '../../screen/hotels/hotelsDetail';
import HotelDates from '../../screen/hotels/hotelDates';
import SearchDates from '../../screen/home/SearchDates';
import PaymentScreen from '../../screen/payment';
import PaytmScreen from '../../screen/payment/paytmScreen';
import BookingDetails from '../../screen/bookings/bookingDetails';
import AfterBooking from '../../screen/bookings/afterBooking';
import NotificationsScreen from '../../screen/notifications/index';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNav {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="FavouritesScreen" component={FavouritesScreen} />
      <Tab.Screen name="NotificationsScreen" component={NotificationsScreen} />
      <Tab.Screen name="BookingsScreen" component={BookingsScreen} />
      <Tab.Screen name="UserProfileScreen" component={UserProfileScreen} />
    </Tab.Navigator>
  )
}

const Stack = createStackNavigator();

const TabNavigator = () => {
  return (  
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Home" component={TabNavigation} />
      <Stack.Screen name="HotelsLargeList" component={HotelsLargeListScreen} />
      <Stack.Screen name="HotelsExploreRooms" component={HotelsExploreRooms} />
      <Stack.Screen name="HotelDates" component={HotelDates} />
      <Stack.Screen name="HotelsDetail" component={HotelsDetail} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="BookingDetails" component={BookingDetails} />
      <Stack.Screen name="SearchRooms" component={SearchRoomsScreen} />
      <Stack.Screen name="AfterBooking" component={AfterBooking} />
      <Stack.Screen name="PaytmScreen" component={PaytmScreen} />
      <Stack.Screen name="SearchDates" component={SearchDates} />
    </Stack.Navigator>
  )
}

export default TabNavigator;