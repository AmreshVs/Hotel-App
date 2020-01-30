import React from 'react';
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { StyleSheet } from 'react-native';

const FavouriteHotelSK = () => {
    return(
        <SkeletonContent
            containerStyle={styles.placeholderContainer}
            isLoading={true}
            animationType="pulse"
            layout={[
                styles.hotelImgPlaceholder,
                styles.textPlaceholder,
                styles.textPlaceholder1,
                styles.favouritePlaceholder,
            ]}
        >
        </SkeletonContent>
    )
}

export default FavouriteHotelSK;

const styles = StyleSheet.create({
    placeholderContainer:{
        flex: 1, 
        width: '100%',
        left: 10,
        height: 280,
        marginBottom: 20,
    },
    hotelImgPlaceholder: {
        width: '96%',
        height: 220,
        borderRadius: 10,
    },
    textPlaceholder:{
        top: 5,
        width: 200,
        height: 20,
        borderRadius: 50,
    },
    textPlaceholder1:{
        top: 10,
        width: 70,
        height: 20,
        borderRadius: 50,
    },
    favouritePlaceholder: {
        position: 'absolute',
        right: 25,
        bottom: 15,
        width: 70,
        height: 40,
        backgroundColor: 'red',
        marginTop: 5,
        borderRadius: 10,
    },
})