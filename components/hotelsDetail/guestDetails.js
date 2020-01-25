/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Text, Card, Icon, Input} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {withNavigation} from 'react-navigation';
import {addGuests} from '../../redux/actions/hotelDetailActions';

const GuestDetails = props => {
  const [visible, setVisible] = React.useState(false);
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');

  const toggleModal = () => {
    setVisible(!visible);
  };

  return (
    <View style={{width: '100%', marginLeft: 20}}>
      <Card style={styles.cardContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Guest Details</Text>
          <Ripple onPress={toggleModal}>
            {visible === false ? (
              <Icon name="edit-outline" fill="#AAA" width={20} height={20} />
            ) : (
              <Icon
                name="checkmark-outline"
                fill="#AAA"
                width={20}
                height={20}
              />
            )}
          </Ripple>
        </View>
        {visible === false ? (
          <View style={styles.textContainer}>
            <Text style={styles.guestName}>
              {name === '' ? 'Amresh Vs' : name}
            </Text>
            <Text>91+ {phone === '' ? '8675529268' : phone}</Text>
          </View>
        ) : (
          <View>
            <Input
              placeholder="Guest name"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <Input
              placeholder="Mobile Number"
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
            />
          </View>
        )}
      </Card>
    </View>
  );
};

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({addGuests: addGuests}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(GuestDetails));

const styles = StyleSheet.create({
  cardContainer: {
    width: '95%',
    borderRadius: 10,
    marginTop: 10,
  },
  heading: {
    fontSize: 16,
    marginBottom: 3,
    color: '#626262',
    fontWeight: '700',
  },
  textContainer: {
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  guestName: {
    color: '#3c3c3c',
    fontWeight: '700',
  },
  popoverContent: {
    justifyContent: 'center',
    alignItems: 'center',

    padding: 24,
  },
  backdrop: {
    backgroundColor: '#EEE',
  },
  input: {
    marginTop: 5,
  },
});
