import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Card, ButtonGroup } from '@ui-kitten/components';
import { addGuests } from '../../redux/actions/hotelDetailActions';

const SelectGuest = (props) => {
    const roomIndex = props.rooms[props.roomNum];
    const [btnIndex, setBtnIndex] = React.useState(roomIndex.adult);
    const [btnCIndex, setBtnCIndex] = React.useState(roomIndex.children);

    const setValue = (value) => {
        setBtnIndex(value);
        setTimeout(function() { 
            props.addGuests({room: props.roomNum, guests: {adult: value, children: btnCIndex}});
        }, 100);
    }

    const setCValue = (value) => {
        setBtnCIndex(value);
        setTimeout(function() { 
            props.addGuests({room: props.roomNum, guests: {adult: btnIndex, children: value}});
        }, 100);
    }

    return (
        <Card style={styles.room}>
            <View style={styles.cardHeader}>
                <View>
                    <Text style={styles.roomHeading}>Room {props.roomNum}</Text>
                </View>
                <View>
                    <Text style={styles.roomHeading}>Adults {btnIndex} {btnCIndex !== 0 ? ', Children ' + btnCIndex : ''}</Text>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.spaceBetween}>
                    <View style={styles.center}>
                        <Text style={styles.contentHeading}>Adults</Text>
                        <Text style={styles.headingCaption}>{'5+ Years'}</Text>
                    </View>
                    <View>
                        <ButtonGroup>
                            <Button style={btnIndex === 1 ? styles.btnSelected : {}} onPress={() => setValue(1)}>1</Button>
                            <Button style={btnIndex === 2 ? styles.btnSelected : {}} onPress={() => setValue(2)}>2</Button>
                            <Button style={btnIndex === 3 ? styles.btnSelected : {}} onPress={() => setValue(3)}>3</Button>
                        </ButtonGroup>
                    </View>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.spaceBetween}>
                    <View style={styles.center}>
                        <Text style={styles.contentHeading}>Children</Text>
                        <Text style={styles.headingCaption}>{'0 - 5 Years'}</Text>
                    </View>
                    <View>
                        <ButtonGroup>
                            <Button style={btnCIndex === 0 ? styles.btnSelected : {}} onPress={() => setCValue(0)}>0</Button>
                            <Button style={btnCIndex === 1 ? styles.btnSelected : {}} onPress={() => setCValue(1)}>1</Button>
                            <Button style={btnCIndex === 2 ? styles.btnSelected : {}} onPress={() => setCValue(2)}>2</Button>
                            <Button style={btnCIndex === 3 ? styles.btnSelected : {}} onPress={() => setCValue(3)}>3</Button>
                        </ButtonGroup>
                    </View>
                </View>
            </View>
            <Text style={styles.error}>{(btnIndex === 2 && btnCIndex === 3) || (btnIndex === 3 && btnCIndex === 2) ? "Cannot accomodate more than 4 guest's" : ""}</Text>
            { props.roomNum > 1 ? <Button style={styles.addRoom} appearance='outline' size='small' status='danger' onPress={props.removeRoom}>Remove Room</Button> : <View></View>}
        </Card>
    )
}

const mapStateToProps = (state) => {
    return state.hotelDetail;
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ addGuests: addGuests }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectGuest);

const styles = StyleSheet.create({
    room:{
        borderRadius: 8,
        marginBottom: 10
    },
    tabContainer: {
        minHeight: 64,
    },
    title: {
        padding: 10
    },
    button: {
        margin: 10
    },
    guests: {
        margin: 20,
    },
    cardHeader: {
        padding: 5,
        borderBottomWidth: 1,
        marginBottom: 10,
        paddingBottom: 20,
        borderBottomColor: '#EEE',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnSelected:{
        backgroundColor: '#254EDB',
        color: '#FFF'
    },
    roomHeading:{
        color: '#626262',
        fontWeight: '700'
    },
    spaceBetween:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    center:{
        justifyContent: 'center'
    },
    headingCaption:{
        color: '#CCC'
    },
    container:{
        marginBottom: 20,
    },
    error:{
        color: '#DB2726'
    },
    addRoom:{
        marginTop: 10
    }
});