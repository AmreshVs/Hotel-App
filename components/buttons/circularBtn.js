import React from 'react';
import { StyleSheet } from 'react-native';
import {
    Button,
    Icon,
    Layout,
} from '@ui-kitten/components';


const CircularBtnWithIcon = (props) => {

    const StarIcon = (style) => (
        <Icon {...style} name={props.iconName} />
    );

    return (
        <Layout>
            <Button style={styles.button} status={props.color} icon={StarIcon}>{props.name}</Button>
        </Layout>
    );
}

export default CircularBtnWithIcon;

const styles = StyleSheet.create({
    button: {
        width: '100%',
        borderRadius: 30
    },
});