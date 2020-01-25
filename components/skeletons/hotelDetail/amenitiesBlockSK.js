import React from 'react';
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { Card, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const AmenitiesBlockSK = () => {
    return(
        <Card style={styles.cardContainer}>
            <Text style={styles.heading}>Amenities</Text>
            <SkeletonContent
                containerStyle={styles.placeholderContainer}
                isLoading={true}
                animationType="pulse"
                layout={[
                    styles.textPlaceholder1,
                    styles.textPlaceholder2,
                    styles.textPlaceholder3,
                    styles.textPlaceholder4,
                ]}
            >
            </SkeletonContent>
            <SkeletonContent
                containerStyle={styles.placeholderContainer}
                isLoading={true}
                animationType="pulse"
                layout={[
                    styles.textPlaceholder1,
                    styles.textPlaceholder2,
                    styles.textPlaceholder3,
                    styles.textPlaceholder4,
                ]}
            >
            </SkeletonContent>
            <SkeletonContent
                containerStyle={styles.moreContainer}
                isLoading={true}
                animationType="pulse"
                layout={[
                    styles.morePlaceholder,
                ]}
            >
            </SkeletonContent>
        </Card>
    )
}

export default AmenitiesBlockSK;

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
        flexDirection: 'row',
        marginBottom: 10,
    },
    textPlaceholder1:{
        marginTop: 5,
        width: 30,
        height: 30,
        padding: 1,
        borderRadius: 30,
    },
    textPlaceholder2:{
        marginTop: 12,
        width: 110,
        height: 15,
        marginLeft: 5,
        marginRight: 30,
        borderRadius: 10,
    },
    textPlaceholder3:{
        marginTop: 5,
        width: 30,
        height: 30,
        padding: 1,
        borderRadius: 30,
    },
    textPlaceholder4:{
        marginTop: 12,
        width: 110,
        height: 15,
        marginLeft: 5,
        borderRadius: 10,
    },
    moreContainer:{
        flexDirection: 'row',
    },
    morePlaceholder:{
        marginTop: 5,
        width: 50,
        height: 15,
        borderRadius: 10,
    }
})