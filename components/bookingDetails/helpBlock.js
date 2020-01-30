import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Button, Text, Icon } from '@ui-kitten/components';

const HeloBlock = () => {
    return(
        <Card style={styles.container}>
            <View style={styles.bookingContainer}>
                <View style={styles.confirmContainer}>
                    <Icon name='alert-circle-outline' style={styles.checkIcon} fill='#FF7E6D' />
                    <Text style={styles.confirmed}>Need Assistance?</Text>
                </View>
                <Text style={styles.caption}>Do you have any queries regarding your stay or booking? We can support you anytime</Text>
                <View style={styles.btnContainer}>
                    <Button appearance='ghost' status='basic'>Call Us</Button>
                    <Button appearance='ghost' status='basic'>Email Us</Button>
                </View>
            </View>
        </Card>
    )
}

export default HeloBlock;

const styles = StyleSheet.create({
    container:{
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    bookingContainer:{
        alignItems: 'center',
    },
    confirmContainer:{
        flexDirection: 'row',
    },
    confirmed:{
        fontSize: 17,
        fontWeight: '700',
        paddingTop: 2,
    },
    checkIcon:{
        width: 28,
        height: 28,
        marginRight: 5,
    },
    caption:{
        paddingTop: 5,
        paddingBottom: 5,
        textAlign: 'center',
        color: '#AAA'
    },
    bookingCaption:{
        textAlign: 'center',
        color: '#FFF',
        fontSize: 17,
        paddingTop: 10,
    },
    btnContainer:{
        flexDirection: 'row',
    }
});