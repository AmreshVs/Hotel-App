import React from 'react';
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { StyleSheet, View } from 'react-native';

const ReviewsLessSK = () => {
    return(
        <View>
            <View style={styles.skContainer}>
                <SkeletonContent
                    containerStyle={styles.placeholderContainer2}
                    isLoading={true}
                    animationType="pulse"
                    layout={[
                        styles.hotelImgPlaceholder1,
                    ]}
                >
                </SkeletonContent>
                <SkeletonContent
                    containerStyle={styles.placeholderContainer2}
                    isLoading={true}
                    animationType="pulse"
                    layout={[
                        styles.reviewName,
                        styles.postedon,
                    ]}
                >
                </SkeletonContent>
            </View>
            <SkeletonContent
                    containerStyle={styles.reviewContainer}
                    isLoading={true}
                    animationType="pulse"
                    layout={[
                        styles.review,
                    ]}
                >
            </SkeletonContent>
        </View>
    )
}

export default ReviewsLessSK;

const styles = StyleSheet.create({
    cardContainer:{
        width: '95%',
        borderRadius: 10,
        marginTop: 10,
    },
    heading:{
        fontSize: 16,
        marginBottom: 3,
        color: '#626262',
        fontWeight: '700',
    },
    placeholderContainer:{
        height: 130,
        width: '35%',
        marginTop: 10,
        paddingRight: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: '#EEE',
    },
    placeholderContainer1:{
        height: 130,
        width: '65%',
        marginTop: 10,
        paddingLeft: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    reviewContainer:{
        marginTop: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    placeholderContainer2:{
        width: '10%',
        marginTop: 10,
        height: 35,
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: '#EEE',
    },
    hotelImgPlaceholder: {
        width: 60,
        height: 30,
        borderRadius: 10,
    },
    hotelImgPlaceholder1: {
        width: 20,
        height: 10,
        borderRadius: 10,
    },
    textPlaceholder:{
        marginTop: 10,
        width: 90,
        height: 10,
        borderRadius: 10,
    },
    skContainer:{
        flexDirection: 'row',
    },
    line1:{
        height: 10,
        width: 170,
        marginBottom: 10,
    },
    line2:{
        height: 10,
        width: 170,
        marginBottom: 10,
    },
    line3:{
        height: 10,
        width: 170,
        marginBottom: 10,
    },
    line4:{
        height: 10,
        width: 170,
        marginBottom: 10,
    },
    line5:{
        height: 10,
        width: 170,
    },
    reviewName:{
        height: 15,
        width: 100,
        marginBottom: 5,
        marginLeft: 15,
    },
    postedon:{
        height: 10,
        width: 130,
        marginLeft: 15,
    },
    review:{
        height: 10,
        width: 130,
    }
})