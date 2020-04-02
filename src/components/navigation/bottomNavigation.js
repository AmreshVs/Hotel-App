import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';

import styles from './styles';

const BottomNav = ({ navigation, state }) => {

  const onSelect = index => {
    navigation.navigate(state.routeNames[index]);
  };

  const HomeIcon = style => <Icon {...style} name="home-outline" />;
  const HeartIcon = style => <Icon {...style} name="heart-outline" />;
  const BookingIcon = style => <Icon {...style} name="briefcase-outline" />;
  const ProfileIcon = style => <Icon {...style} name="person-outline" />;
  const NotificationIcon = style => <Icon {...style} name="bell-outline" />;

  return (
    <SafeAreaView>
      <BottomNavigation
        selectedIndex={state.index}
        onSelect={onSelect}
        appearance="noIndicator"
        indicatorStyle={styles.indicator}
        style={styles.bottomNavigation}
      >
        <BottomNavigationTab style={styles.tab} icon={HomeIcon} />
        <BottomNavigationTab style={styles.tab} icon={HeartIcon} />
        <BottomNavigationTab style={styles.tab} icon={NotificationIcon} />
        <BottomNavigationTab style={styles.tab} icon={BookingIcon} />
        <BottomNavigationTab style={styles.tab} icon={ProfileIcon} />
      </BottomNavigation>
    </SafeAreaView>
  );
};

export default BottomNav;