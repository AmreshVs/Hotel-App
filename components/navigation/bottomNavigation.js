import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import styles from './styles';

const BottomNav = ({ navigation }) => {
  const onSelect = index => {
    const selectedTabRoute = navigation.state.routes[index];
    navigation.navigate(selectedTabRoute.routeName);
  };

  const HomeIcon = style => <Icon {...style} name="home-outline" />;
  const HeartIcon = style => <Icon {...style} name="heart-outline" />;
  const BookingIcon = style => <Icon {...style} name="inbox-outline" />;
  const ProfileIcon = style => <Icon {...style} name="person-outline" />;

  return (
    <SafeAreaView>
      <BottomNavigation
        selectedIndex={navigation.state.index}
        onSelect={onSelect}
        appearance="noIndicator"
        indicatorStyle={styles.indicator}
        style={styles.bottomNavigation}
      >
        <BottomNavigationTab style={styles.tab} icon={HomeIcon} />
        <BottomNavigationTab style={styles.tab} icon={HeartIcon} />
        <BottomNavigationTab style={styles.tab} icon={BookingIcon} />
        <BottomNavigationTab style={styles.tab} icon={ProfileIcon} />
      </BottomNavigation>
    </SafeAreaView>
  );
};

export default BottomNav;