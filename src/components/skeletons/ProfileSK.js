import React from 'react';
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { Card } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const ProfileSK = () => {
  return (
    <Card style={styles.cardContainer}>
      <SkeletonContent
        containerStyle={styles.placeholderContainer}
        isLoading={true}
        animationType="pulse"
        layout={[
          styles.textPlaceholder1,
          styles.textPlaceholder2,
        ]}
      />
      <SkeletonContent
        containerStyle={styles.placeholderContainer}
        isLoading={true}
        animationType="pulse"
        layout={[
          styles.textPlaceholder1,
          styles.textPlaceholder2,
        ]}
      />
      <SkeletonContent
        containerStyle={styles.placeholderContainer}
        isLoading={true}
        animationType="pulse"
        layout={[
          styles.textPlaceholder1,
          styles.textPlaceholder2,
        ]}
      />
      <SkeletonContent
        containerStyle={styles.placeholderContainer}
        isLoading={true}
        animationType="pulse"
        layout={[
          styles.textPlaceholder1,
          styles.textPlaceholder2,
        ]}
      />
      <SkeletonContent
        containerStyle={styles.moreContainer}
        isLoading={true}
        animationType="pulse"
        layout={[
          styles.morePlaceholder,
          styles.morePlaceholder,
        ]}
      />
    </Card>
  )
}

export default ProfileSK;

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
  placeholderContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  textPlaceholder1: {
    marginTop: 5,
    width: 30,
    height: 30,
    padding: 1,
    borderRadius: 30,
  },
  textPlaceholder2: {
    marginTop: 12,
    width: 110,
    height: 15,
    marginLeft: 5,
    marginRight: 30,
    borderRadius: 10,
  },
  moreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  morePlaceholder: {
    marginTop: 5,
    width: 150,
    height: 40,
    borderRadius: 10,
  }
})