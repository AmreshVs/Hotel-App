import React from 'react';
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { Card, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const ChooseRoomsBlockSK = () => {
    return(
        <Card style={styles.cardContainer}>
            <Text style={styles.heading}>Choose Room's and Guest's</Text>
            <SkeletonContent
                containerStyle={styles.placeholderContainer}
                isLoading={true}
                animationType="pulse"
                layout={[
                    styles.textPlaceholder1,
                ]}
            >
            </SkeletonContent>
        </Card>
    )
}

export default ChooseRoomsBlockSK;

const styles = StyleSheet.create({
    cardContainer:{
        width: '95%',
        borderRadius: 10,
        marginTop: 10,
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
        height: 50,
        padding: 1,
        borderRadius: 10,
    },
})