import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { Icon } from '@ui-kitten/components';
import Ripple from 'react-native-material-ripple';
import Slideshow from 'react-native-image-slider-show';
import AddFavourite from '../../redux/thunkActions/addFavourite';
import snackbarMessage from '../../redux/thunkActions/snackbarMessage';

const ThumbImg = (props) => {
    var imageArr = [];
    var i = 0;
    props.images.map((item) => {
        imageArr[i] = {url: item.file};
        i= i+1;
    })

    const [favcolor, setFavcolor] = React.useState(props.navigation.state.params.is_favorite === 1 ? '#FF4626' : '#AAA');

    const addFavourite = async () => {
        setFavcolor(favcolor === '#AAA' ? '#FF4626' : '#AAA');
        const response = await AddFavourite({hotel_id: props.navigation.state.params.hotelId}, props.access_token);
        snackbarMessage(response.message);
    }

    return (
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
    );
};

const mapStateToProps = (state) => {
    return state.common.userData;
}

export default connect(mapStateToProps)(withNavigation(ThumbImg));

const styles = StyleSheet.create({
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
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 4,
        zIndex: 1,
    },
    heartIcon: {
        width: 22,
        height: 22
    }
})