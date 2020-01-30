import React from 'react';
import { Card } from '@ui-kitten/components';
import { View } from 'react-native';
import InputDatePicker from '../../components/inputs/inputDatePicker';
import InputCounter from '../../components/inputs/inputCounter';
import CircularBtnWithIcon from '../../components/buttons/circularBtn';
import styles from './styles';

const SearchHotelCard = () =>{
  return(
  <Card style={styles.searchCard}>
    <InputDatePicker name="Check In" iconName="log-in-outline" />
    <InputDatePicker name="Check Out" iconName="log-out-outline" />
    <View style={styles.inputBox}>
      <InputCounter name="Rooms"/>
      <InputCounter name="Persons"/>
    </View>
    <CircularBtnWithIcon  name="Search Rooms" iconName="search-outline" color="primary" />
  </Card>
  );
}

export default SearchHotelCard;