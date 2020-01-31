import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { withNavigation } from 'react-navigation';
import Ripple from 'react-native-material-ripple';
import LinearGradient from 'react-native-linear-gradient';

const TopNavSimple = (props) => {

    const BackIcon = () => <Icon name='arrow-ios-back-outline' fill='#FFF' />;

    const navigateBack = () => {
        props.navigation.goBack();
    };

    const BackAction = () => (
        <Ripple onPress={props.backHandler !== undefined ? props.backHandler : navigateBack}>
            <TopNavigationAction icon={BackIcon} />
        </Ripple>
    );

    return(
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#00bfff', '#0067d6']} style={styles.headerGradient}>
            <TopNavigation title={props.screenTitle} titleStyle={styles.title} alignment='center' leftControl={BackAction()} style={styles.header} />
        </LinearGradient>
    )
}

export default withNavigation(TopNavSimple);

const styles = StyleSheet.create({
    header:{
        backgroundColor: 'transparent',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    headerGradient:{

    },
    title:{
        width: '60%',
        height: 30,
        fontSize: 16,
        fontWeight: 'bold',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        color: '#FFF',
    },
})