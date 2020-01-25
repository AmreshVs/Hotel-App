import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Radio, RadioGroup, Button} from '@ui-kitten/components';
import TopNavSimple from '../../components/navigation/topNavSimple';
import {withNavigation} from 'react-navigation';

const PaymentScreen = ({navigation}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const continueBooking = () => {
    navigation.navigate('BookingConfirmed');
  };

  return (
    <View>
      <TopNavSimple screenTitle="Make Payment" />
      <View styles={styles.flexContainer}>
        <View style={styles.container}>
          <RadioGroup
            selectedIndex={selectedIndex}
            onChange={index => setSelectedIndex(index)}>
            <Radio style={styles.radio} text="Pay at Hotel" />
            <Radio style={styles.radio} text="Pay with Paytm" />
          </RadioGroup>
        </View>
        <View style={styles.btnContainer}>
          <Button onPress={continueBooking}>Continue</Button>
        </View>
      </View>
    </View>
  );
};

export default withNavigation(PaymentScreen);

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  container: {
    paddingLeft: 15,
  },
  btnContainer: {
    padding: 15,
  },
});
