import React from 'react';
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { View } from 'react-native';
import { Card } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const SearchHotelCardSK = () => {
  return (
    <View style={styles.container}>
      <Card style={styles.cardContainer}>
        <SkeletonContent
          containerStyle={styles.moreContainer}
          isLoading={true}
          animationType="pulse"
          layout={[
            styles.morePlaceholder,
            styles.morePlaceholder,
            styles.morePlaceholder,
          ]}
        />
        <View style={{marginBottom: 15}} />
        <SkeletonContent
          containerStyle={styles.placeholderContainer}
          isLoading={true}
          animationType="pulse"
          layout={[
            styles.textPlaceholder1,
            styles.textPlaceholder2,
            styles.textPlaceholder1,
          ]}
        />
        <View style={{marginBottom: 15}} />
        <SkeletonContent
          containerStyle={styles.placeholderContainer}
          isLoading={true}
          animationType="pulse"
          layout={[
            styles.textPlaceholder3,
          ]}
        />
      </Card>
    </View>
  )
}

export default SearchHotelCardSK;

const styles = StyleSheet.create({
  container:{
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  cardContainer: {
    marginTop: -95,
    margin: '5%',
    marginBottom: 30,
    borderRadius: 10,
    backgroundColor: '#FFF',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  heading: {
    fontSize: 16,
    marginBottom: 3,
    color: '#626262',
    fontWeight: '700',
  },
  placeholderContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  textPlaceholder1: {
    marginTop: 7,
    width: 17,
    height: 17,
    padding: 1,
    borderRadius: 30,
  },
  textPlaceholder2: {
    marginTop: 12,
    width: '90%',
    height: 7,
    borderRadius: 10,
  },
  textPlaceholder3: {
    width: '100%',
    height: 33,
    borderRadius: 5,
  },
  moreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  morePlaceholder: {
    marginTop: 5,
    width: '30%',
    height: 90,
    borderRadius: 10,
  }
})