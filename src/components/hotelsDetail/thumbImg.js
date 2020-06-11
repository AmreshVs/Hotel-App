import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Icon, StyleService, useStyleSheet } from '@ui-kitten/components';
import Ripple from 'react-native-material-ripple';
import Slideshow from 'react-native-image-slider-show';
import * as Animatable from 'react-native-animatable';

import AddFavourite from '../../redux/thunkActions/addFavourite';
import snackbarMessage from '../../redux/thunkActions/snackbarMessage';

const ThumbImg = (props) => {

  const styles = useStyleSheet(style);
  var imageArr = [];
  var i = 0;

  props.images.map((item) => {
    imageArr[i] = { url: item.file };
    i = i + 1;
  })

  const [favcolor, setFavcolor] = React.useState(props.route.is_favorite === 1 ? '#FF4626' : '#AAA');

  const addFavourite = async () => {
    setFavcolor(favcolor === '#AAA' ? '#FF4626' : '#AAA');
    const response = await AddFavourite({ hotel_id: props.route.hotelId }, props.access_token);
    snackbarMessage(response.message);
  }

  return (
    <Animatable.View animation="fadeInUp" direction="normal" duration={500} useNativeDriver={true} >
      <View style={styles.imageContainer}>
        <Ripple rippleSize={50} rippleDuration={600} onPress={addFavourite} style={styles.heartContainer}>
          <Icon name='heart' style={styles.heartIcon} fill={favcolor} />
        </Ripple>
        <Slideshow
          containerStyle={styles.image}
          height={300}
          dataSource={imageArr}
        />
      </View>
    </Animatable.View>
  );
};

const mapStateToProps = (state) => {
  return state.common.userData;
}

export default connect(mapStateToProps)(ThumbImg);

const style = StyleService.create({
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 500,
    borderRadius: 30,
  },
  heartContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'background-basic-color-1',
    borderRadius: 20,
    padding: 4,
    zIndex: 1,
  },
  heartIcon: {
    width: 22,
    height: 22
  }
})