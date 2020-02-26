import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, TopNavigation, TopNavigationAction, StyleService, useStyleSheet } from '@ui-kitten/components';
import { withNavigation } from 'react-navigation';
import Ripple from 'react-native-material-ripple';
import LinearGradient from 'react-native-linear-gradient';

const TopNavSimple = (props) => {
    const styles = useStyleSheet(style);
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
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[styles.topbar.color1, styles.topbar.color2, styles.topbar.color3]} style={styles.headerGradient}>
            <TopNavigation title={props.screenTitle} titleStyle={styles.title} alignment='center' leftControl={BackAction()} style={styles.header} />
        </LinearGradient>
    )
}

export default withNavigation(TopNavSimple);

const style = StyleService.create({
    header:{
        backgroundColor: 'transparent',
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
    topbar:{
        color1: 'topBar-color-1',
        color2: 'topBar-color-2',
        color3: 'topBar-color-3'
    }
})