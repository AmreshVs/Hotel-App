import React from 'react';
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { StyleSheet } from 'react-native';

const RecommendedRoomsSK = () => {
    return(
        <SkeletonContent
            containerStyle={styles.placeholderContainer}
            isLoading={true}
            animationType="pulse"
            layout={[
                styles.hotelImgPlaceholder,
                styles.textPlaceholder,
                styles.favouritePlaceholder,
            ]}
        >
        </SkeletonContent>
    )
}

export default RecommendedRoomsSK;

const styles = StyleSheet.create({
    placeholderContainer:{
        flex: 1, 
        width: 350,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        position: 'relative',
        height: 280,
    },
    hotelImgPlaceholder: {
        width: 350,
        height: 220,
        borderRadius: 10,
    },
    textPlaceholder:{
        position: 'absolute',
        bottom: 38,
        width: 200,
        height: 50,
        alignItems: 'center',
        padding: 1,
        borderRadius: 50,
        borderColor: '#DDD',
    },
    favouritePlaceholder: {
        position: 'absolute',
        right: 15,
        width: 40,
        height: 40,
        marginTop: 12,
        borderRadius: 50,
    },
})