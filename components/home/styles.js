import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  searchCard: {
    height: 320,
    margin: 20,
    marginTop: -130,
    marginBottom: 30,
    borderRadius: 10,
    borderColor: '#ddd',
  },
  headBlock: {
    width: '100%',
    height: 250,
    borderBottomRightRadius: 50,
  },
  headingCaption: {
    color: '#fff',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 50,
    textAlign: 'center',
  },
  profileIcon: {
    width: '100%',
    paddingTop: 25,
    marginBottom: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userIcon: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 18},
    shadowOpacity: 0.5,
    shadowRadius: 10.0,
    elevation: 5,
  },
  inputBox: {
    borderColor: '#ececec',
    borderBottomWidth: 1,
    flexDirection: 'row',
    marginBottom: 15,
  },
  headingText: {
    fontWeight: '700',
    fontSize: 16,
    color: '#454545',
  },
  caption: {
    color: '#AAA',
    padding: 5,
    marginTop: -5,
  },
  headingBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10,
    marginBottom: 15,
  },
});

export default styles;
