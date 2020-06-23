import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Radio, RadioGroup, Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

import TopNavSimple from '../../components/navigation/topNavSimple';

const PaymentScreen = (props) => {

  const navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const continueBooking = () => {
    if (selectedIndex === 0) {
      navigation.navigate('AfterBooking', {
        payment_type: 1
      });
    }
    if (selectedIndex === 1) {
      navigation.navigate('PaytmScreen', {
        payment_type: 2
      });
    }
  }

  return (
    <View>
      <TopNavSimple screenTitle="Confirm Booking" />
      <View style={styles.flexContainer}>
        <View style={styles.container}>
          <RadioGroup
            selectedIndex={selectedIndex}
            onChange={(index) => setSelectedIndex(index)}>
            <Radio style={styles.radio} text='Pay at Hotel' />
            <Radio style={styles.radio} text='Pay with Paytm' />
          </RadioGroup>
        </View>
        <View style={styles.btnContainer}>
          <Button onPress={continueBooking}>Continue</Button>
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(PaymentScreen);

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'column',
    // alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    height: Dimensions.get('window').height - 80,
  },
  container: {
    paddingLeft: 15,
  },
  btnContainer: {
    padding: 10,
  }
})