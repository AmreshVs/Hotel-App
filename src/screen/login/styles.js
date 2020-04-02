import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  statusBarTop: {
    height: '100%',
    width: '100%'
  },
  inputContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  inputOtpContainer: {
    width: '100%',
    bottom: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btnContainer: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  input: {
    width: '85%',
    marginBottom: 10,
  },
  btnInput: {
    marginBottom: 10,
  },
  backInput: {
    width: '48%',
  }
});

export default styles;