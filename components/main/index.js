import React from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, StatusBar} from 'react-native';
import SnackBar from 'react-native-snackbar-component';
import {TabNavigator} from '../navigation/index';

const Main = (props) => {
    return(
        <View style={styles.mainView}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <View style={styles.statusBar} />
            <TabNavigator />
            <SnackBar style={styles.snack} visible={props.visible} textMessage={props.message} actionText="Ok"/>
        </View>
    )
}

const mapStateToProps = (state) => {
    return state.common.snackbar;
}

export default connect(mapStateToProps)(Main);

const styles = StyleSheet.create({
    mainView:{
        height: '100%',
        width: '100%',
    },
    statusBar: {
        backgroundColor: '#1939B7',
        height: StatusBar.currentHeight,
    },
    snack:{
        position: 'absolute',
        bottom: 0,
    }
});