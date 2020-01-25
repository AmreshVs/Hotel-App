/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, Card, Icon} from '@ui-kitten/components';
import {StyleSheet, View, Modal, ScrollView} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {withNavigation} from 'react-navigation';
import Progress from '../extra/progress';
import ReviewsLess from './reviewsLess';
import TopNavSimple from '../navigation/topNavSimple';
import WriteReview from './writeReview';

const GuestDetails = props => {
  const [visible, setVisible] = React.useState(false);
  const [writeReview, setwriteReview] = React.useState(false);

  const toggleModal = () => {
    setVisible(!visible);
  };

  const toggleWriteReview = () => {
    setwriteReview(!writeReview);
  };

  const progressData = [
    {id: 5, num: props.data.rating5},
    {id: 4, num: props.data.rating4},
    {id: 3, num: props.data.rating3},
    {id: 2, num: props.data.rating2},
    {id: 1, num: props.data.rating1},
  ];

  return (
    <View style={{width: '100%', marginLeft: 20}}>
      <Card style={styles.cardContainer}>
        <View style={styles.textContainer}>
          <View style={styles.textContainer1}>
            <Text style={styles.heading}>Reviews & Ratings</Text>
            <Ripple onPress={toggleWriteReview}>
              <Icon name="edit-outline" fill="#AAA" width={20} height={20} />
            </Ripple>
          </View>
          <View style={styles.ratingsContainer}>
            <View style={styles.ratingLeft}>
              <Text style={styles.rating}>{props.data.avg_rating}</Text>
              <Text style={styles.ratingCaption}>Very Good</Text>
              <Text style={styles.ratingNumber}>
                {props.data.total_rating} ratings
              </Text>
            </View>
            <View style={styles.ratingRight}>
              {progressData.map(item => {
                return (
                  <View key={item.id} style={styles.progressCount}>
                    <View style={styles.countContainer}>
                      <Text>{item.id}</Text>
                    </View>
                    <View style={styles.progressContainer}>
                      <Progress color="#FFC145" data={item.num} />
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
        <ReviewsLess data={props.data.reviews[0]} />
        <Ripple
          rippleSize={50}
          rippleDuration={600}
          style={styles.seeAllContainer}
          onPress={toggleModal}>
          <Text style={styles.seeAll}>See all reviews</Text>
        </Ripple>
        <Modal
          animationType="slide"
          transparent={false}
          visible={visible}
          onRequestClose={toggleModal}>
          <View>
            <TopNavSimple backHandler={toggleModal} screenTitle="All Reviews" />
            <ScrollView
              style={styles.reviewsMore}
              showsVerticalScrollIndicator={false}>
              {props.data.reviews.map(item => {
                return <ReviewsLess key={item.id} data={item} />;
              })}
            </ScrollView>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={false}
          visible={writeReview}
          onRequestClose={toggleWriteReview}>
          <View>
            <TopNavSimple
              backHandler={toggleWriteReview}
              screenTitle="Write a review"
            />
            <WriteReview backHandler={toggleWriteReview} />
          </View>
        </Modal>
      </Card>
    </View>
  );
};

export default withNavigation(GuestDetails);

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
  ratingsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  ratingLeft: {
    height: 150,
    width: '35%',
    paddingRight: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderTopStartRadius: 10,
    borderRightColor: '#EEE',
  },
  ratingRight: {
    height: 150,
    width: '65%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rating: {
    fontSize: 40,
    fontWeight: '700',
    paddingTop: 20,
    color: '#3366FF',
  },
  ratingCaption: {
    // color: '#AAA'
  },
  ratingNumber: {
    color: '#BBB',
    fontSize: 13,
  },
  progressCount: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginBottom: 6,
  },
  countContainer: {
    width: '10%',
  },
  progressContainer: {
    width: '90%',
  },
  seeAllContainer: {
    marginTop: 10,
  },
  seeAll: {
    color: '#3366FF',
  },
  reviewsMore: {
    paddingLeft: 20,
    marginBottom: 65,
  },
  textContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
