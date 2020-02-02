import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text } from '@ui-kitten/components';
import Ripple from 'react-native-material-ripple';

const Amenities = (props) => {

    const amenitiesData = props.data;

    const [showAmenities, setShowAmenities] = React.useState(90);

    const revealAmenities = () => {
        showAmenities === 90 ? setShowAmenities('auto') : setShowAmenities(90);
    }

    return(
        <View style={styles.cardContainer}>
            <Text style={styles.heading}>Amenities</Text>
            <View style={{height: showAmenities, overflow: 'hidden'}}>
                <View style={styles.amenitiesContainer}>
                    {amenitiesData.map((item) => 
                        <View key={item.id} style={styles.amenities}>
                            <Image
                                style={styles.amenitiesImg}
                                source={{uri: item.image}}
                            />
                            <Text style={styles.amenitiesName}>{item.name}</Text>   
                        </View>
                    )}
                </View>
            </View>
            {amenitiesData.length > 4 ? 
                <Ripple rippleSize={50} rippleDuration={600} onPress={revealAmenities}>
                    <Text status='primary'> {showAmenities === 90 ? 'More' : 'Less'} </Text>
                </Ripple>
            : null}
        </View>
    )
}

export default Amenities;

const styles = StyleSheet.create({
    heading:{
        fontSize: 16,
        marginBottom: 3,
        color: '#626262',
        fontWeight: '700',
    },
    cardContainer:{
        width: '95%',
        borderRadius: 10,
        marginTop: 10,
        padding: 13,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#EEE',
    },
    amenitiesContainer:{
        top: 5,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
    },
    amenities:{
        height: 45,
        width: '50%',
        flexDirection: 'row',
    },
    amenitiesImg:{
        width: 25,
        height: 25,
        marginRight: 10,
        opacity: 0.5
    },
    amenitiesName:{
        marginTop: 3
    }
})