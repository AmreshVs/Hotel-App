import React from 'react';
import { connect } from 'react-redux';
import { Text, Button, StyleService, useStyleSheet } from '@ui-kitten/components';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckUserData from '../../commonFunctions/checkUserData';

const BookHotel = (props) => {

  const navigation = useNavigation();
  const styles = useStyleSheet(style);

  const navigatePayment = () => {
    let checkData = CheckUserData(props.userData);
    if (Object.values(checkData).length > 0) {
      navigation.navigate('UserProfileScreen');
    }
    else {
      navigation.navigate('PaymentScreen');
    }
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.total}>₹{props.data.price !== undefined ? props.data.price.discount_after_price : 0}</Text>
          <Text style={styles.totalCaption}>Total</Text>
        </View>
        <View style={styles.btnContainer}>
          {props.data.price !== undefined ? <Button onPress={navigatePayment}>Book Now</Button> : <Button disabled={true}>Book Now</Button>}
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => {
  return state.common;
}

export default connect(mapStateToProps)(BookHotel);

const style = StyleService.create({
  cardContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: 'color-basic-300',
    backgroundColor: 'background-basic-color-1',
  },
  heading: {
    fontSize: 16,
    marginBottom: 3,
    color: 'color-basic-700',
    fontWeight: '700',
  },
  textContainer: {
    width: '30%',
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  total: {
    fontSize: 20,
    fontWeight: '700'
  },
  totalCaption: {
    color: 'color-basic-600'
  },
  btnContainer: {
    width: '70%',
    paddingRight: 10,
  },
  container: {
    flexDirection: 'row'
  }
})