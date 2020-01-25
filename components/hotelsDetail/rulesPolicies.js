import React from 'react';
import { Text, Card } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const RulesPolicies = () => {

    return(
        <Card style={styles.cardContainer}>
            <Text style={styles.heading}>Rules & Policies</Text>
            <Text>{'\u2022 '} Outside food not allowed</Text>
            <Text>{'\u2022 '} Couples are welcome</Text>
            <Text>{'\u2022 '} Guests can check in using any local or outstation ID proof</Text>
            <Text>{'\u2022 '} Only Indian citizens are allowed to stay</Text>
        </Card>
    );
}

export default RulesPolicies;

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
})