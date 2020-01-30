import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    searchCard:{
        margin: 20,
        marginBottom: 30,
        borderRadius: 10,
        borderColor: '#ddd',
    },
    headBlock:{
        width: '100%',
        height: 250,
        borderBottomRightRadius: 50,
    },
    headingCaption:{
        color: '#fff',
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 50,
        textAlign: 'center'
    },
    headingText:{
        fontWeight: '700',
        fontSize: 16,
        color: '#454545'
    },
    caption:{
        color: '#AAA',
        padding: 5,
        marginTop: -5,
    },
    headingBlock:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 20,
        paddingLeft: 20,
        marginBottom: 15,
    },
    datesContainer:{
        width: '30%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    seperator:{
        width: 1,
        height:100,
        backgroundColor: '#EEE'
    },
    heading:{
        fontSize: 16,
        fontWeight: '700',
        color: '#3366FF',
        marginBottom: 5,
    },
    dateCaption:{
        fontSize: 18,
        color: '#626262'
    },
    button:{
        borderRadius: 7,
    }
});

export default styles;