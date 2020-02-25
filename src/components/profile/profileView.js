import React from 'react';
import { View, AsyncStorage } from 'react-native';
import { Button, Card, Icon, Text, StyleService, useStyleSheet } from '@ui-kitten/components';
import { withNavigation, StackActions, NavigationActions } from 'react-navigation';

const ProfileView = (props) => {
    const styles = useStyleSheet(style);
    const logout = async () => {

        // const resetAction = StackActions.reset({
        //     index: 0,
        //     key: null,
        //     actions: [NavigationActions.navigate({ routeName:'LoginScreen'})],
        // });

        // props.navigation.dispatch(resetAction);
        const userData = await AsyncStorage.removeItem('@Darpad:userData');
        if (userData === null) {
            props.navigation.navigate('LoginScreen');
        }
    }

    return(
        <View style={styles.bodyContainer}>
            <Card style={styles.cardContainer}>
                <View>
                    <View style={styles.inputContainer}>
                        <View style={styles.iconContainer}>
                            <Icon name='person-outline' style={styles.icons} fill={styles.iconColor.color} />
                        </View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.inputText}>{props.data.firstname} {props.data.lastname}</Text>
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.iconContainer}>
                            <Icon name='email-outline' style={styles.icons} fill={styles.iconColor.color} />
                        </View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.inputText}>{props.data.email}</Text>
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.iconContainer}>
                            <Icon name='phone-outline' style={styles.icons} fill={styles.iconColor.color} />
                        </View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.inputText}>+91 {props.data.mobile}</Text>
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.iconContainer}>
                            <Icon name='map-outline' style={styles.icons} fill={styles.iconColor.color} />
                        </View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.inputText}>{props.data.address}</Text>
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.iconContainer}>
                            <Icon name='pin-outline' style={styles.icons} fill={styles.iconColor.color} />
                        </View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.inputText}>{props.data.city}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.btnContainer}>
                    <Button style={styles.logoutButton} status='danger' size='small' appearance='outline' onPress={logout}>Logout</Button>
                    <Button style={styles.logoutButton} appearance='outline' size='small' onPress={props.handleClick}>Edit</Button>
                </View>
            </Card>
        </View>
    );
}

export default withNavigation(ProfileView);

const style = StyleService.create({
    bodyContainer:{
        backgroundColor: 'background-basic-color-1',
        height: '100%',
        alignItems: 'center',
    },
    cardContainer: {
        width: '95%',
        marginTop: 10,
        borderRadius: 10,
    },
    logoutButton: {
        width: '45%',
    },
    icons:{
        width: 25,
        height: 25,
    },
    inputContainer:{
        marginBottom: 20,
        flexDirection: 'row',
    },
    iconContainer:{
        width: '10%',
        justifyContent: 'center',
    },
    nameContainer:{
        justifyContent: 'center',
        width: '90%',
        paddingLeft: 10,
    },
    inputText:{
        fontSize: 16,
        color: 'color-basic-700',
    },
    btnContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconColor:{
        color: 'color-basic-600'
    }
});