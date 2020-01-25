import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Input, Icon, Button} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import Ripple from 'react-native-material-ripple';
import SnackBar from 'react-native-snackbar-component';
import saveReviewRating from '../../redux/thunkActions/saveReview';

const WriteReview = props => {
  var errors = props.hotelDetail.save_review;
  const id = props.hotelDetail.hotelIds.hotelId;
  const [value, setValue] = React.useState('');
  const [emailValue, setEmailValue] = React.useState('');
  const [commentsValue, setCommentsValue] = React.useState('');
  const [star, setStar] = React.useState(0);

  if (
    props.hotelDetail.save_review !== null &&
    props.hotelDetail.save_review.message === 'success'
  ) {
    props.backHandler();
  }

  const RatingStars = () => {
    return (
      <View style={styles.starsContainer}>
        <Ripple onPress={() => setStar(1)}>
          <Icon
            name="star"
            style={styles.starIcon}
            fill={star >= 1 ? '#FCDB37' : '#DDD'}
          />
        </Ripple>
        <Ripple onPress={() => setStar(2)}>
          <Icon
            name="star"
            style={styles.starIcon}
            fill={star >= 2 ? '#FCDB37' : '#DDD'}
          />
        </Ripple>
        <Ripple onPress={() => setStar(3)}>
          <Icon
            name="star"
            style={styles.starIcon}
            fill={star >= 3 ? '#FCDB37' : '#DDD'}
          />
        </Ripple>
        <Ripple onPress={() => setStar(4)}>
          <Icon
            name="star"
            style={styles.starIcon}
            fill={star >= 4 ? '#FCDB37' : '#DDD'}
          />
        </Ripple>
        <Ripple onPress={() => setStar(5)}>
          <Icon
            name="star"
            style={styles.starIcon}
            fill={star >= 5 ? '#FCDB37' : '#DDD'}
          />
        </Ripple>
      </View>
    );
  };

  const addReview = () => {
    props.saveReviewRating(
      {
        id_hotel: id,
        name: value,
        rating: star,
        email: emailValue,
        comment: commentsValue,
      },
      props.common.userData.access_token,
    );
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <Input
          style={styles.inputs}
          placeholder="Name"
          value={value}
          onChangeText={setValue}
        />
        <Input
          style={styles.inputs}
          placeholder="Email"
          value={emailValue}
          onChangeText={setEmailValue}
        />
        <RatingStars />
        <Input
          style={styles.inputsComment}
          placeholder="Comments"
          value={commentsValue}
          onChangeText={setCommentsValue}
          size="large"
        />
        <Button style={styles.button} onPress={addReview}>
          Submit
        </Button>
      </View>
      <View style={styles.snackbar}>
        {errors !== null ? (
          <SnackBar
            visible={errors.error}
            textMessage={errors.message}
            autoHidingTime={5000}
            actionText="Ok"
          />
        ) : null}
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({saveReviewRating: saveReviewRating}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WriteReview);

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center',
  },
  inputs: {
    width: '94%',
    marginTop: 10,
  },
  inputsComment: {
    width: '94%',
    marginTop: 5,
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
  },
  starIcon: {
    width: 30,
    height: 30,
    marginLeft: 5,
    marginRight: 5,
  },
  button: {
    width: '94%',
    marginTop: 10,
  },
  snackbar: {
    marginTop: 60,
  },
});
