import React from 'react';
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

const RoomsBlockSK = () => {
    return(
        <View style={styles.cardContainer}>
            <Text style={styles.heading}>Rooms</Text>
            <SkeletonContent
                containerStyle={styles.placeholderContainer}
                isLoading={true}
                animationType="pulse"
                layout={[
                    styles.hotelImgPlaceholder,
                    styles.textPlaceholder,
                    styles.textPlaceholder1,
                    styles.textPlaceholder2,
                    styles.favouritePlaceholder,
                ]}
            >
            </SkeletonContent>
            <SkeletonContent
                containerStyle={styles.placeholderContainer}
                isLoading={true}
                animationType="pulse"
                layout={[
                    styles.hotelImgPlaceholder,
                    styles.textPlaceholder,
                    styles.textPlaceholder1,
                    styles.textPlaceholder2,
                    styles.favouritePlaceholder,
                ]}
            >
            </SkeletonContent>
        </View>
    )
}

export default RoomsBlockSK;

const styles = StyleSheet.create({
    cardContainer:{
        width: '95%',
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: '#FFF',
        padding: 13,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    heading:{
        fontSize: 16,
        marginBottom: 3,
        color: '#626262',
        fontWeight: '700',
    },
    placeholderContainer:{
        height: 130,
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DDD',
        backgroundColor: '#FFF',
        flexDirection: 'row',
    },
    hotelImgPlaceholder: {
        width: 150,
        height: 128,
        borderRadius: 10,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    textPlaceholder:{
        marginTop: 10,
        marginLeft: 10,
        width: 110,
        height: 15,
        borderRadius: 10,
    },
    textPlaceholder1:{
        position: 'absolute',
        marginTop: 35,
        left: 160,
        width: 50,
        height: 15,
        borderRadius: 10,
    },
    textPlaceholder2:{
        position: 'absolute',
        marginTop: 60,
        left: 160,
        width: 100,
        height: 15,
        borderRadius: 10,
    },
    favouritePlaceholder: {
        position: 'absolute',
        left: 160,
        width: 100,
        height: 20,
        bottom: 15,
        borderRadius: 10,
    },
})