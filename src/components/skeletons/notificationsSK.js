import React from 'react';
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { View, StyleSheet } from 'react-native';

const NotificationsSK = () => {
  return (
    [1, 2, 3, 4, 5].map((item) =>
      <View style={styles.cardContainer} key={item}>
        <View style={styles.leftContainer}>
          <SkeletonContent
            containerStyle={styles.placeholderContainer}
            isLoading={true}
            animationType="pulse"
            layout={[
              styles.textPlaceholder1,
            ]}
          />
        </View>
        <View style={styles.rightContainer}>
          <SkeletonContent
            containerStyle={styles.placeholderContainer}
            isLoading={true}
            animationType="pulse"
            layout={[
              styles.textPlaceholder2,
              styles.morePlaceholder,
              styles.textPlaceholder3,
              styles.textPlaceholder3,
            ]}
          />
          <SkeletonContent
            containerStyle={styles.moreContainer}
            isLoading={true}
            animationType="pulse"
            layout={[
              styles.morePlaceholder,
            ]}
          />
        </View>
      </View>
    )
  )
}

export default NotificationsSK;

const styles = StyleSheet.create({
  cardContainer: {
    width: '95%',
    borderRadius: 5,
    marginTop: 10,
    padding: 13,
    backgroundColor: '#FFF',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    flexDirection: 'row'
  },
  heading: {
    fontSize: 16,
    marginBottom: 3,
    color: '#626262',
    fontWeight: '700',
  },
  placeholderContainer: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  textPlaceholder1: {
    marginTop: 5,
    width: 50,
    height: 50,
    padding: 1,
    borderRadius: 30,
  },
  textPlaceholder2: {
    marginTop: 12,
    width: '90%',
    height: 15,
    borderRadius: 10,
  },
  textPlaceholder3: {
    marginTop: 10,
    width: '90%',
    height: 12,
    borderRadius: 10,
  },
  moreContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  morePlaceholder: {
    marginTop: 5,
    width: 150,
    height: 15,
    borderRadius: 10,
  },
  leftContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    width: '80%',
  },
})