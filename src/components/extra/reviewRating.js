import React from 'react';
import { Icon } from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native';

const ReviewRating = (props) => {

  let fraction = props.rating * 10 % 10 / 10;
  let integer = props.rating - fraction;
  let widthNum = (fraction * 100) / 100 * 20;
  let stars = [];

  for (var i = 0; i < integer; i++) {
    stars.push(
      <View key={i} style={styles.stars}>
        <View style={{ marginTop: 3 }}>
          <Icon name="star" style={styles.starIcon} fill="#FFD13A" />
        </View>
        <Icon name="star-outline" style={styles.starIconOutline} fill="#FFD13A" />
      </View>
    );
  }

  if (widthNum > 0) {
    stars.push(
      <View key={'halfStar'} style={styles.stars}>
        <View style={{ marginTop: 3, width: widthNum, overflow: 'hidden' }}>
          <Icon name="star" style={styles.starIcon} fill="#FFD13A" />
        </View>
        <Icon name="star-outline" style={styles.starIconOutline} fill="#FFD13A" />
      </View>
    )
  }

  return (
    <View style={styles.starsContainer}>
      {stars}
    </View>
  )
}

export default ReviewRating;

const styles = StyleSheet.create({
  starsContainer: {
    flexDirection: 'row'
  },
  starIcon: {
    width: 25,
    height: 25,
  },
  starIconOutline: {
    width: 25,
    height: 25,
    position: 'absolute',
    top: -25
  },
  stars: {
    marginLeft: 1,
    marginRight: 1
  },
  heartIcon: {
    width: 23,
    height: 23,
  },
})