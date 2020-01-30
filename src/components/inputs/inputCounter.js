import React from 'react';
import { Icon, Button } from '@ui-kitten/components';
import { StyleSheet, View, Text } from 'react-native';

const InputCounter = (props) => {

    const AddIcon = (style) => (
        <Icon {...style} name='plus-circle-outline' />
    );

    const RemoveIcon = (style) => (
        <Icon {...style} name='minus-circle-outline' />
    );

    const [item, setItem] = React.useState(0);

    const AddItem = () => {
        item < 10 ? setItem(item + 1) : 0;
    }

    const RemoveItem = () => {
        item > 0 ? setItem(item - 1) : 0;
    }

    return (
        <View style={{}}>
            <Text style={styles.textHeading}>{props.name}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Button style={styles.btn} appearance='ghost' status='primary' icon={AddIcon} onPress={AddItem} />
                <Text style={styles.count}>{item}</Text>
                <Button style={styles.btn} appearance='ghost' status='primary' icon={RemoveIcon} onPress={RemoveItem} />
            </View>
        </View>
    );
};

export default InputCounter;

const styles = StyleSheet.create({
    btn: {
        borderRadius: 80,
        width: 50,
    },
    count: {
        paddingTop: 13,
        paddingLeft: 5,
        paddingRight: 5
    },
    textHeading: {
        color: '#aaa',
    },
    icon: {
        paddingBottom: 0
    },
});