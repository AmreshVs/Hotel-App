import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  statusBarTop: {
    height: '100%',
    width: '100%'
  },
  inputContainer: {
    position: 'absolute',
    width: wp('100%'),
    bottom: hp('2%'),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  inputOtpContainer: {
    width: '100%',
    bottom: hp('2%'),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btnContainer: {
    width: wp('85%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    width: wp('85%'),
    marginBottom: hp('1%'),
  },
  phone:{
    width: wp('66%'),
    marginBottom: hp('1%'),
  },
  countryCode:{
    width: wp('18%'),
    marginBottom: hp('1%'),
    marginRight: 5,
  },
  btnInput: {
    marginBottom: hp('1%'),
  },
  backInput: {
    width: '48%',
  },
  mobileNumber:{
    width: wp('85%'),
    flexDirection: 'row'
  }
});

export default styles;