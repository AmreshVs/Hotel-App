import React from 'react';
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { Card, Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

const BookingsOverviewSK = () => {
  return (
    [1, 2, 3].map((item) =>
      <View style={styles.container} key={item}>
        <Card style={styles.cardContainer}>
          <SkeletonContent
            containerStyle={styles.placeholderContainer}
            isLoading={true}
            animationType="pulse"
            layout={[
              styles.hotelImgPlaceholder,
              styles.textPlaceholder,
              styles.textPlaceholder1,
              styles.textPlaceholder2,
            ]}
          >
          </SkeletonContent>
          <SkeletonContent
            containerStyle={styles.placeholderContainer1}
            isLoading={true}
            animationType="pulse"
            layout={[
              styles.textBottomPlaceholder,
              styles.textBottomPlaceholder1,
            ]}
          >
          </SkeletonContent>
        </Card>
      </View>
    )
  )
}

export default BookingsOverviewSK;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
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
  placeholderContainer: {
    height: 90,
    borderRadius: 10,
    flexDirection: 'row',
  },
  hotelImgPlaceholder: {
    width: 100,
    height: 80,
    borderRadius: 10,
  },
  textPlaceholder: {
    marginTop: 4,
    marginLeft: 10,
    width: 110,
    height: 15,
    borderRadius: 10,
  },
  textPlaceholder1: {
    position: 'absolute',
    marginTop: 30,
    left: 110,
    width: 60,
    height: 15,
    borderRadius: 10,
  },
  textPlaceholder2: {
    position: 'absolute',
    marginTop: 55,
    left: 110,
    width: 100,
    height: 15,
    borderRadius: 10,
  },
  placeholderContainer1: {
    height: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 15,

  },
  textBottomPlaceholder: {
    width: 90,
    height: 20,
  },
  textBottomPlaceholder1: {
    width: 150,
    height: 20,
  },
})