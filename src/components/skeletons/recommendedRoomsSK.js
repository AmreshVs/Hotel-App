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
            ]}
        >
        </SkeletonContent>
    )
}

export default RecommendedRoomsSK;

const styles = StyleSheet.create({
    placeholderContainer:{
        flex: 1, 
        width: 300,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        position: 'relative',
        height: 235,
    },
    hotelImgPlaceholder: {
        width: 300,
        height: 180,
        borderRadius: 10,
    },
    textPlaceholder:{
        position: 'absolute',
        bottom: 38,
        width: '80%',
        height: 50,
        alignItems: 'center',
        padding: 1,
        borderRadius: 10,
        borderColor: '#EEE',
    }
})