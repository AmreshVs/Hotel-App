import React from 'react';
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

const RulesBlockSK = () => {
    return(
        <View style={styles.cardContainer}>
            <Text style={styles.heading}>Rules & Policies</Text>
            <SkeletonContent
                containerStyle={styles.placeholderContainer}
                isLoading={true}
                animationType="pulse"
                layout={[
                    styles.textPlaceholder1,
                    styles.textPlaceholder2,
                    styles.textPlaceholder3,
                    styles.textPlaceholder,
                ]}
            >
            </SkeletonContent>
        </View>
    )
}

export default RulesBlockSK;

const styles = StyleSheet.create({
    cardContainer:{
        width: '95%',
        height: 150,
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
    textPlaceholder:{
        marginTop: 10,
        width: 70,
        height: 15,
        padding: 1,
        borderRadius: 10,
    },
    textPlaceholder1:{
        marginTop: 5,
        width: 300,
        height: 15,
        padding: 1,
        borderRadius: 10,
    },
    textPlaceholder2:{
        marginTop: 7,
        width: 320,
        height: 15,
        padding: 1,
        borderRadius: 10,
    },
    textPlaceholder3:{
        marginTop: 7,
        width: 280,
        height: 15,
        padding: 1,
        borderRadius: 10,
    },
})