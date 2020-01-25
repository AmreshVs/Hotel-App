import React from 'react';
import { Icon } from '@ui-kitten/components';
import { StyleSheet, View, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const InputDatePicker = (props) => {
    const [show, setShow] = React.useState(false);
    const dateformat = moment(date).format('DD-MMM-YYYY');
    const [date, setDate] = React.useState(dateformat);

    const openDatePicker = () => {
        setShow(true);
    };

    const dateChange = (event, date) => {
        const dateformat = moment(date).format('DD-MMM-YYYY');
        setShow(false);
        setDate(dateformat);
    };

    return (
        <View style={styles.topblock}>
            <Text style={styles.textHeading}>{props.name}</Text>
            <View style={styles.datePickerBox} onTouchStart={openDatePicker}>
                <Icon name={props.iconName} style={styles.icon} width={28} height={28} fill="#30ACFF" />
                <Text style={styles.datePickerText}>{date}</Text>
            </View>
            {show && (
                <DateTimePicker
                    value={new Date(date)}
                    mode="date"
                    display="default"
                    onChange={dateChange}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    topblock: {
        marginBottom: 10
    },
    textHeading: {
        color: '#aaa',
        // paddingLeft: 48
    },
    datePickerBox: {
        borderColor: '#ececec',
        padding: 10,
        borderBottomWidth: 1,
        height: 50,
        flexDirection: 'row'
    },
    icon: {
        paddingBottom: 0
    },
    datePickerText: {
        fontSize: 14,
        marginLeft: 10,
        borderWidth: 0,
        marginTop: 5,
        color: '#000'
    }
});

export default InputDatePicker;