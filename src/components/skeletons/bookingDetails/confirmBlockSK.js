import React from 'react';
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { Card } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const ConfirmBlockSK = () => {
  return (
    <Card style={styles.cardContainer}>
      <SkeletonContent
        containerStyle={styles.placeholderContainer}
        isLoading={true}
        animationType="pulse"
        layout={[
          styles.textPlaceholder1,
          styles.textPlaceholder2,
          styles.textPlaceholder3,
          styles.textPlaceholder4,
        ]}
      >
      </SkeletonContent>
    </Card>
  )
}

export default ConfirmBlockSK;

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    borderRadius: 10,
    marginTop: 10,
  },
  placeholderContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 10,
  },
  textPlaceholder1: {
    marginTop: 5,
    width: 200,
    height: 20,
    borderRadius: 30,
  },
  textPlaceholder2: {
    marginTop: 15,
    width: 210,
    height: 15,
    borderRadius: 10,
  },
  textPlaceholder3: {
    marginTop: 20,
    width: 260,
    height: 15,
    borderRadius: 10,
  },
  textPlaceholder4: {
    marginTop: 10,
    width: 300,
    height: 15,
    borderRadius: 10,
  },
  moreContainer: {
    flexDirection: 'row',
  },
  morePlaceholder: {
    marginTop: 5,
    width: 50,
    height: 15,
    borderRadius: 10,
  }
})