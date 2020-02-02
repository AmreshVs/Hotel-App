import React from 'react';
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

const GuestDetailsBlockSK = () => {
    return(
        <View style={styles.cardContainer}>
            <Text style={styles.heading}>Guest Details</Text>
            <SkeletonContent
                containerStyle={styles.placeholderContainer}
                isLoading={true}
                animationType="pulse"
                layout={[
                    styles.textPlaceholder1,
                ]}
            >
            </SkeletonContent>
        </View>
    )
}

export default GuestDetailsBlockSK;

const styles = StyleSheet.create({
    cardContainer:{
        width: '95%',
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: '#FFF',
        padding: 13,
        borderWidth: 1,
        borderColor: '#EEE',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    heading:{
        fontSize: 16,
        marginBottom: 3,
        color: '#626262',
        fontWeight: '700',
    },
    placeholderContainer:{
        justifyContent: 'center',
    },
    textPlaceholder1:{
        marginTop: 10,
        width: 340,
        height: 15,
        padding: 1,
        borderRadius: 10,
    },
})