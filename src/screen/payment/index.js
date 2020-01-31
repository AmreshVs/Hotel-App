import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Text, Radio, RadioGroup, Button } from '@ui-kitten/components';
import TopNavSimple from '../../components/navigation/topNavSimple';
import { withNavigation } from 'react-navigation';

const PaymentScreen = (props) => {

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const continueBooking = () => {
        if(selectedIndex === 0){
            props.navigation.navigate('AfterBooking',{
                payment_type: 1
            });
        }
        if(selectedIndex === 1){
            props.navigation.navigate('PaytmScreen',{
                payment_type: 2
            });
        }
    }

    return (
        <View>
            <TopNavSimple screenTitle="Confirm Booking" />
            <View styles={styles.flexContainer}>
                <View style={styles.container}>
                    <RadioGroup
                        selectedIndex={selectedIndex}
                        onChange={(index) => setSelectedIndex(index)}>
                        <Radio style={styles.radio} text='Pay at Hotel' />
                        <Radio style={styles.radio} text='Pay with Paytm' />
                    </RadioGroup>
                </View>
                <View style={styles.btnContainer}>
                    <Button onPress={continueBooking}>Continue</Button>
                </View>
            </View>
        </View>
    );
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(withNavigation(PaymentScreen));

const styles = StyleSheet.create({
    flexContainer:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    container:{
        paddingLeft: 15,
    },
    btnContainer:{
        padding: 15,
    }
})