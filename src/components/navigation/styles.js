import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    bottomNavigation: {
        borderWidth: 1,
        height: 45,
        borderColor: '#EEE',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 1,
    },
    indicator:{
        height: 7,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        marginTop: -1,
    },
    tab:{
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: 35,
    },
});

export default styles;