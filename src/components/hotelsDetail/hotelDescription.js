import React from 'react';
import { Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import Ripple from 'react-native-material-ripple';

const HotelDescription = (props) => {
    const [showDesc, setShowDesc] = React.useState(60);

    const revealDescription = () => {
        showDesc == 60 ? setShowDesc('auto') : setShowDesc(60);
    }

    const regex = /(<([^>]+)>)/ig;
    const lines = /^\s*\n/gm;
    const description = props.description.replace(regex, '');
    const description1 = description.replace(lines, '');

    return(
        <View style={styles.cardContainer}>
            <Text style={styles.heading}>Description</Text>
            <Text style={{height: showDesc}}>{description1}</Text>
            <Ripple rippleSize={50} rippleDuration={600} onPress={revealDescription}>
                <Text status='primary' style={{marginTop: 5}}>{showDesc == 60 ? 'More' : 'Less'}</Text>
            </Ripple>
        </View>
    );
}

export default HotelDescription;

const styles = StyleSheet.create({
    cardContainer:{
        width: '95%',
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: '#FFF',
        padding: 13,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    heading:{
        fontSize: 16,
        marginBottom: 3,
        color: '#626262',
        fontWeight: '700',
    },
})