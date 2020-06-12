import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text, Icon, Input, StyleService, useStyleSheet } from '@ui-kitten/components';
import { View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import * as Animatable from 'react-native-animatable';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { addGuests } from '../../redux/actions/hotelDetailActions';

const GuestDetails = (props) => {

  const styles = useStyleSheet(style);
  const [visible, setVisible] = React.useState(false);
  const [name, setName] = React.useState(props.common.userData.firstname);
  const [phone, setPhone] = React.useState(props.common.userData.mobile);

  const toggleModal = () => {
    setVisible(!visible);
  };

  return (
    <Animatable.View style={{ width: '100%', alignItems: 'center' }} animation="fadeInUp" direction="normal" duration={500} useNativeDriver={true} delay={90} >
      <View style={styles.cardContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Guest Details</Text>
          <Ripple onPress={toggleModal}>
            {visible == false ?
              <Icon name='edit-outline' fill={styles.iconColor.color} width={20} height={20} />
              :
              <Icon name='checkmark-outline' fill={styles.iconColor.color} width={20} height={20} />
            }
          </Ripple>
        </View>
        {visible == false ?
          <View style={styles.textContainer}>
            <Text style={styles.guestName}>{name}</Text>
            <Text style={styles.text}>+91 {phone}</Text>
          </View>
          :
          <View>
            <Input
              placeholder='Guest name'
              value={name}
              size='small'
              onChangeText={setName}
              style={styles.input}
            />
            <Input
              placeholder='Mobile Number'
              value={phone}
              size='small'
              onChangeText={setPhone}
              style={styles.input}
            />
          </View>
        }
      </View>
    </Animatable.View>
  );
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addGuests: addGuests }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GuestDetails);

const style = StyleService.create({
  cardContainer: {
    width: '100%',
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: 'background-basic-color-1',
    padding: 13,
    borderWidth: 1,
    borderColor: 'color-basic-300',
    paddingBottom: 15,
  },
  heading: {
    fontSize: hp('2.3%'),
    marginBottom: 3,
    color: 'color-basic-700',
    fontWeight: '700',
  },
  textContainer: {
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  guestName: {
    color: 'color-basic-700',
    fontWeight: '700',
    fontSize: hp('2.2%')
  },
  popoverContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  backdrop: {
    backgroundColor: 'color-basic-300',
  },
  input: {
    marginTop: 5
  },
  iconColor: {
    color: 'color-basic-600'
  },
  text:{
    fontSize: hp('2.2%')
  }
})