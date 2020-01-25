import React from 'react';
import { Text, Icon } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

const ReviewsLess = (props) => {
    return (
        <View style={styles.reviewsContainer}>
            {props.data !== undefined &&
            <View style={styles.ratingName}>
                <View style={styles.starContainer}>
                    <Icon name='star' style={styles.star} fill='#FFC145' />
                    <Text style={styles.rating}>{props.data !== undefined ? props.data.rating : 0}</Text>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>{props.data !== undefined ? props.data.name : ''}</Text>
                    <Text style={styles.postedon}>Posted on {props.data !== undefined ? props.data.posted_on : ''}</Text>
                </View>
            </View>
            }
            {props.data !== undefined &&
            <View style={styles.reviewContent}>
                <Text style={styles.review}>{props.data !== undefined ? props.data.msg : ''}</Text>
            </View>
            }
        </View>
    );
}

export default ReviewsLess;

const styles = StyleSheet.create({
    reviewsContainer:{
        marginTop: 20,
    },
    star:{
        width: 20,
        height: 20,
    },
    starContainer:{
        width: 35,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRightWidth: 1,
        borderRightColor: '#EEE',
    },
    rating:{
        fontSize: 13,
        color: '#AAA',
        textAlign: 'center',
        width: 20,
    },
    ratingName:{
        flexDirection: 'row'
    },
    nameContainer:{
        marginLeft: 20
    },
    name:{
        color: '#3c3c3c',
        fontWeight: '700'
    },
    postedon:{
        fontSize: 13,
        color: '#AAA'
    },
    reviewContent:{
        marginTop: 5,
    },
    review:{
        fontSize: 14,
    },
})