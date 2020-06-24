import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text, Icon, Input, StyleService, useStyleSheet, Button } from '@ui-kitten/components';
import { View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import * as Animatable from 'react-native-animatable';
import { RFPercentage } from "react-native-responsive-fontsize";

import { addGuestDetail } from '../../redux/actions/hotelDetailActions';
import snackbarMessage from '../../redux/thunkActions/snackbarMessage';

const GuestDetails = (props) => {
  const styles = useStyleSheet(style);
  const [visible, setVisible] = React.useState(false);
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [address, setAddress] = React.useState('');

  const SaveIcon = () => (
    <Icon style={styles.saveIconStyle} fill={styles.saveIconStyle.fill} animation={'zoom'} name='save-outline' />
  );

  const CancelIcon = () => (
    <Icon style={styles.cancelIconStyle} fill={styles.cancelIconStyle.fill} animation={'zoom'} name='close-circle-outline' />
  );

  const toggleModal = () => {
    setVisible(!visible);
  };

  const handleSave = () => {
    if(validate()){
      props.addGuestDetail({ firstname: firstname, lastname: lastname, mobile: phone, email: email, address: address });
      setVisible(!visible);
    }
  }

  const validate = () => {
    if(firstname === ''){
      snackbarMessage('Firstname cannot be blank!');
      return false;
    }
    else if(lastname === ''){
      snackbarMessage('Lastname cannot be blank!');
      return false;
    }
    else if(phone === ''){
      snackbarMessage('Mobile cannot be blank!');
      return false;
    }
    else if(email === ''){
      snackbarMessage('Email cannot be blank!');
      return false;
    }
    else if(address === ''){
      snackbarMessage('Address cannot be blank!');
      return false;
    }
    else{
      return true;
    }
  }

  return (
    <Animatable.View style={{ width: '100%', alignItems: 'center' }} animation="fadeInUp" direction="normal" duration={500} useNativeDriver={true} delay={90} >
      <View style={styles.cardContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Guest Details</Text>
            {(firstname !== '' || lastname !== '' || phone !== '' || email !== '' || address !== '') && visible === false &&
              <Ripple onPress={() => toggleModal()}>
                <Icon name='edit-outline' fill={styles.iconColor.color} width={20} height={20} />
              </Ripple>
            }
        </View>
        {visible == false ?
          firstname === '' || lastname === '' || phone === '' || email === '' || address === '' ?
            <Button style={styles.addGuestDetail} status='primary' appearance='outline' size='small' onPress={() => toggleModal()}>Add Guest Details</Button>
          :
          <>
            <View style={styles.textContainer}>
              <Text style={styles.guestName}>Fullname</Text>
              <Text style={styles.text}>{firstname + ' ' + lastname}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.guestName}>Phone</Text>
              <Text style={styles.text}>+91 {phone}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.guestName}>Email</Text>
              <Text style={styles.text}>{email}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.guestName}>Address</Text>
              <Text style={styles.text}>{address}</Text>
            </View>
          </>
          :
          <View>
            <Input
              placeholder='Firstname'
              value={firstname}
              size='small'
              onChangeText={setFirstname}
              style={styles.input}
            />
            <Input
              placeholder='Lastname'
              value={lastname}
              size='small'
              onChangeText={setLastname}
              style={styles.input}
            />
            <Input
              placeholder='Mobile Number'
              value={phone}
              size='small'
              onChangeText={setPhone}
              style={styles.input}
            />
            <Input
              placeholder='Email'
              value={email}
              size='small'
              onChangeText={setEmail}
              style={styles.input}
            />
            <Input
              placeholder='Address'
              value={address}
              onChangeText={setAddress}
              style={styles.input}
            />
            <View style={styles.btnContainer}>
              <Button style={styles.logoutButton} status='danger' size='small' appearance='outline' onPress={toggleModal} icon={CancelIcon} >Cancel</Button>
              <Button style={styles.logoutButton} appearance='outline' size='small' onPress={handleSave} icon={SaveIcon}>Save</Button>
            </View>
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
  return bindActionCreators({ addGuestDetail: addGuestDetail }, dispatch);
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
    fontSize: RFPercentage(2),
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
    fontSize: RFPercentage(2)
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
    fontSize: RFPercentage(2),
    width: '50%',
    textAlign: 'right'
  },
  icons:{
    flexDirection: 'row'
  },
  addGuestDetail:{
    marginTop: 10
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5
  },
  logoutButton: {
    width: '45%',
  },
  saveIconStyle: {
    fill: 'color-primary-600',
    marginRight: 0
  },
  cancelIconStyle: {
    fill: 'color-danger-600',
    marginRight: 0
  }
})