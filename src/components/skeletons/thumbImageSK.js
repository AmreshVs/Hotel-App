import React from 'react';
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { StyleSheet } from 'react-native';

const ThumbImageSK = () => {
    return(
        <SkeletonContent
            containerStyle={styles.placeholderContainer}
            isLoading={true}
            animationType="pulse"
            layout={[
                styles.hotelImgPlaceholder,
            ]}
        >
        </SkeletonContent>
    )
}

export default ThumbImageSK;

const styles = StyleSheet.create({
    placeholderContainer:{
        flex: 1, 
        width: '100%',
        alignItems: 'center',
        height: 300,
    },
    hotelImgPlaceholder: {
        width: '100%',
        height: 300,
    },
})