import React from 'react';
import { Text, Icon, StyleService, useStyleSheet } from '@ui-kitten/components';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ReviewsLess = (props) => {

  const styles = useStyleSheet(style);
  
  return (
    <Animatable.View animation="fadeInRight" direction="normal" duration={500} useNativeDriver={true} delay={props.delay * 50} >
      <View style={styles.reviewsContainer}>
        {props.data !== undefined &&
          <View style={styles.ratingName}>
            <View style={styles.starContainer}>
              <Icon name='star' style={styles.star} fill='#FFC145' />
              <Text style={styles.rating}>{props.data !== undefined ? props.data.rating : 0}</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{props.data !== undefined ? props.data.name : ''}</Text>
              <Text style={styles.postedon}>Posted on {props.data !== undefined ? props.data.posted_on : ''}</Text>
            </View>
          </View>
        }
        {props.data !== undefined &&
          <View style={styles.reviewContent}>
            <Text style={styles.review}>{props.data !== undefined ? props.data.msg : ''}</Text>
          </View>
        }
      </View>
    </Animatable.View>
  );
}

export default ReviewsLess;

const style = StyleService.create({
  reviewsContainer: {
    marginTop: 20,
  },
  star: {
    width: 20,
    height: 20,
  },
  starContainer: {
    width: 35,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRightWidth: 1,
    borderRightColor: 'color-basic-300',
  },
  rating: {
    fontSize: hp('2.2%'),
    color: 'color-basic-600',
    textAlign: 'center',
    width: 20,
  },
  ratingName: {
    flexDirection: 'row'
  },
  nameContainer: {
    marginLeft: 20
  },
  name: {
    color: 'color-basic-700',
    fontWeight: '700',
    fontSize: hp('2.3%')
  },
  postedon: {
    fontSize: hp('2.2%'),
    color: 'color-basic-600'
  },
  reviewContent: {
    marginTop: 5,
  },
  review: {
    fontSize: hp('2.2%'),
  },
})