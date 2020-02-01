import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, StyleSheet } from 'react-native';
import { Input, Icon, Card, Button } from '@ui-kitten/components';
import SaveProfileData from '../../redux/thunkActions/saveProfileData';
import snackbarMessage from '../../redux/thunkActions/snackbarMessage';
import { userLogin } from '../../redux/actions/commonActions';

const ProfileEdit = (props) => {

    const [firstname, setFirstname] = React.useState(props.data.firstname);
    const [lastname, setLastname] = React.useState(props.data.lastname);
    const [email, setEmail] = React.useState(props.data.email);
    const [address, setAddress] = React.useState(props.data.address);
    const [city, setCity] = React.useState(props.data.city);

    const handleSave = async () => {
        const response = await SaveProfileData(props.access_token, {firstname: firstname, lastname: lastname, email: email, address: address, city: city});
        snackbarMessage(response.message);
        props.userLogin({access_token: props.access_token, firstname: firstname, lastname: lastname, email: email, address: address, city: city})
        props.handleClick();
        props.reloadData();
    }

    return(
        <View style={styles.bodyContainer}>
            <Card style={styles.cardContainer}>
                <View>
                    <View style={styles.inputContainer}>
                        <View style={styles.iconContainer}>
                            <Icon name='person-outline' style={styles.icons} fill='#BBB' />
                        </View>
                        <View style={styles.nameContainer}>
                            <Input
                                placeholder='First Name'
                                value={firstname}
                                size='small'
                                onChangeText={setFirstname}
                            />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.iconContainer}>
                            <Icon name='person-outline' style={styles.icons} fill='#BBB' />
                        </View>
                        <View style={styles.nameContainer}>
                            <Input
                                placeholder='Last Name'
                                value={lastname}
                                size='small'
                                onChangeText={setLastname}
                            />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.iconContainer}>
                            <Icon name='email-outline' style={styles.icons} fill='#BBB' />
                        </View>
                        <View style={styles.nameContainer}>
                            <Input
                                placeholder='Email'
                                value={email}
                                size='small'
                                onChangeText={setEmail}
                            />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.iconContainer}>
                            <Icon name='map-outline' style={styles.icons} fill='#BBB' />
                        </View>
                        <View style={styles.nameContainer}>
                            <Input
                                placeholder='Address'
                                value={address}
                                size='small'
                                onChangeText={setAddress}
                            />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.iconContainer}>
                            <Icon name='pin-outline' style={styles.icons} fill='#BBB' />
                        </View>
                        <View style={styles.nameContainer}>
                            <Input
                                placeholder='City'
                                value={city}
                                size='small'
                                onChangeText={setCity}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.btnContainer}>
                    <Button style={styles.logoutButton} status='danger' size='small' appearance='outline' onPress={props.handleClick}>Cancel</Button>
                    <Button style={styles.logoutButton} appearance='outline' size='small' onPress={handleSave}>Save</Button>
                </View>
            </Card>
        </View>
    );
}

const mapStateToProps = (state) => {
    return state.common.userData;
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({userLogin:userLogin}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfileEdit);

const styles = StyleSheet.create({
    bodyContainer:{
        backgroundColor: '#FAFAFA',
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
        marginBottom: 10,
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
        color: '#626262',
    },
    btnContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});