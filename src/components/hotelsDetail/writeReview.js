import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Icon, Button, StyleService, useStyleSheet } from '@ui-kitten/components';
import { View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import * as Animatable from 'react-native-animatable';
import SnackBar from 'react-native-snackbar-component';

import saveReviewRating from '../../redux/thunkActions/saveReview';

const WriteReview = (props) => {

  const styles = useStyleSheet(style);
  let userData = props.common.userData;
  const id = props.hotelDetail.hotelIds.hotelId;
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [value, setValue] = React.useState(`${userData.firstname} ${userData.lastname}`);
  const [emailValue, setEmailValue] = React.useState(userData.email);
  const [commentsValue, setCommentsValue] = React.useState('');
  const [star, setStar] = React.useState(0);

  if (props.hotelDetail.save_review !== null && props.hotelDetail.save_review.message === 'success') {
    props.backHandler();
  }

  const RatingStars = () => {
    return (
      <View style={styles.starsContainer}>
        <Ripple onPress={() => setStar(1)}>
          <Icon name='star' style={styles.starIcon} fill={star >= 1 ? '#FCDB37' : '#DDD'} />
        </Ripple>
        <Ripple onPress={() => setStar(2)}>
          <Icon name='star' style={styles.starIcon} fill={star >= 2 ? '#FCDB37' : '#DDD'} />
        </Ripple>
        <Ripple onPress={() => setStar(3)}>
          <Icon name='star' style={styles.starIcon} fill={star >= 3 ? '#FCDB37' : '#DDD'} />
        </Ripple>
        <Ripple onPress={() => setStar(4)}>
          <Icon name='star' style={styles.starIcon} fill={star >= 4 ? '#FCDB37' : '#DDD'} />
        </Ripple>
        <Ripple onPress={() => setStar(5)}>
          <Icon name='star' style={styles.starIcon} fill={star >= 5 ? '#FCDB37' : '#DDD'} />
        </Ripple>
      </View>
    )
  }

  const addReview = () => {
    if(validate()){
      props.saveReviewRating({ id_hotel: id, name: value, rating: star, email: emailValue, comment: commentsValue }, props.common.userData.access_token);
    }
  }

  const validate = () => {
    if(value.length <= 0){
      setVisible(true);
      setMessage('Name Cannot be empty');
      setTimeout(() => {
        setVisible(false);
      }, 3010);
      return false;
    }
    else if(emailValue.length <= 0){
      setVisible(true);
      setMessage('Email Cannot be empty');
      setTimeout(() => {
        setVisible(false);
      }, 3010);
      return false;
    }
    else if(commentsValue.length <= 0){
      setVisible(true);
      setMessage('Comments Cannot be empty');
      setTimeout(() => {
        setVisible(false);
      }, 3010);
      return false;
    }
    else if(star === 0){
      setVisible(true);
      setMessage('Rating Cannot be empty');
      setTimeout(() => {
        setVisible(false);
      }, 3010);
      return false;
    }

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailValue.match(mailformat)) {
      return true;
    }
    else {
      setVisible(true);
      setMessage('Invalid email address!');
      setTimeout(() => {
        setVisible(false);
      }, 3010);
      return false;
    }
  }

  const SubmitIcon = () => (
    <Icon style={styles.saveIconStyle} fill={styles.saveIconStyle.fill} animation={'zoom'} name='save-outline' />
  );

  return (
    <View>
      <View style={styles.inputContainer} >
        <Animatable.View animation="fadeInRight" direction="normal" duration={500} useNativeDriver={true} >
          <Input
            style={styles.inputs}
            placeholder='Name'
            value={value}
            onChangeText={setValue}
          />
        </Animatable.View>
        <Animatable.View animation="fadeInRight" direction="normal" duration={500} useNativeDriver={true} delay={10} >
          <Input
            style={styles.inputs}
            placeholder='Email'
            value={emailValue}
            onChangeText={setEmailValue}
          />
        </Animatable.View>
        <Animatable.View animation="fadeInRight" direction="normal" duration={500} useNativeDriver={true} delay={20} >
          <RatingStars />
        </Animatable.View>
        <Animatable.View animation="fadeInRight" direction="normal" duration={500} useNativeDriver={true} delay={30} >
          <Input
            style={styles.inputsComment}
            placeholder='Comments'
            size='large'
            value={commentsValue}
            onChangeText={setCommentsValue}
          />
        </Animatable.View>
        <Animatable.View style={styles.button} animation="bounceInRight" duration={600} useNativeDriver={true} delay={40} >
          <Button onPress={addReview} appearance={'outline'} icon={SubmitIcon} >Submit</Button>
        </Animatable.View>
      </View>
      <View style={styles.snackbar}>
        <SnackBar containerStyle={styles.snack} visible={visible} textMessage={message} autoHidingTime={3000} />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ saveReviewRating: saveReviewRating }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(WriteReview);

const style = StyleService.create({
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
    marginBottom: 5
  },
  starIcon: {
    width: 30,
    height: 30,
    marginLeft: 5,
    marginRight: 5,
  },
  button: {
    width: '94%',
    marginTop: 10
  },
  snackbar: {
    marginTop: 60,
    margin: 10,
  },
  snack:{
    borderRadius: 5,
  },
  saveIconStyle: {
    fill: 'color-primary-600',
    marginRight: 0
  },
});