import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    searchCard:{
        marginTop: -95,
        margin: 10,
        padding: 15,
        marginBottom: 30,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: '#FFF',
        borderColor: '#EEE',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5,
    },
    headBlock:{
        width: '100%',
        height: 250,
        borderBottomRightRadius: 50,
    },
    headingCaption:{
        position: 'absolute',
        color: '#FFF',
        padding: 15,
        // marginTop: 50,
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
        fontSize: 16,
        color: '#626262'
    },
    button:{
        borderRadius: 7,
    },
    headBack:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    headImg:{
        height: 350,
        width: '100%',
    },
    headImgOverlay:{
        position: 'absolute',
        opacity: 0.5,
        height: 350,
        width: '100%',
        backgroundColor: '#3366FF',
    }
});

export default styles;