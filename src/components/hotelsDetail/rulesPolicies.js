import React from 'react';
import { Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

const RulesPolicies = () => {

    return(
        <View style={styles.cardContainer}>
            <Text style={styles.heading}>Rules & Policies</Text>
            <Text>{'\u2022 '} Outside food not allowed</Text>
            <Text>{'\u2022 '} Couples are welcome</Text>
            <Text>{'\u2022 '} Guests can check in using any local or outstation ID proof</Text>
            <Text>{'\u2022 '} Only Indian citizens are allowed to stay</Text>
        </View>
    );
}

export default RulesPolicies;

const styles = StyleSheet.create({
    cardContainer:{
        width: '95%',
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: '#FFF',
        padding: 13,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    heading:{
        fontSize: 16,
        marginBottom: 3,
        color: '#626262',
        fontWeight: '700',
    },
})