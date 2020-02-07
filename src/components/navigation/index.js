import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
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
import BookingConfirmed from '../../screen/hotels/bookingConfirmed';
import AfterBooking from '../../screen/bookings/afterBooking';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';

const TabNavigation = createBottomTabNavigator(
  {
    Home: HomeScreen,
    FavouritesScreen: FavouritesScreen,
    BookingsScreen: BookingsScreen,
    UserProfileScreen: UserProfileScreen,
  },
  {
    unmountInactiveRoutes: true,
    tabBarComponent: BottomNav,
    resetOnBlur: true,
  }
);

const rootStack = createAnimatedSwitchNavigator(
  {
    Main: Main,
    LoginScreen: LoginScreen,
    Home: TabNavigation,
    HotelsLargeList: HotelsLargeListScreen,
    HotelsExploreRooms: HotelsExploreRooms,
    HotelDates: HotelDates,
    HotelsDetail: HotelsDetail,
    PaymentScreen: PaymentScreen,
    BookingConfirmed: BookingConfirmed,
    BookingDetails: BookingDetails,
    SearchRooms: SearchRoomsScreen,
    AfterBooking: AfterBooking,
    PaytmScreen: PaytmScreen,
    SearchDates: SearchDates
  },
  {
    headerMode: 'none',
    backBehavior: 'history',
    transition: (
      <Transition.Together>
        <Transition.Out
          propagation="top"
          type="scale"
          durationMs={100}
          interpolation="easeOut"
        />
        <Transition.In type="scale" durationMs={300} />
      </Transition.Together>
    ),
  },
);

export const TabNavigator = createAppContainer(rootStack);