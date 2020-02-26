import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ScrollView, View, Image } from 'react-native';
import { Text, CheckBox, Icon, Modal, Layout, StyleService, useStyleSheet } from '@ui-kitten/components';
import Ripple from 'react-native-material-ripple';
import { openImageViewer, closeImageViewer } from '../../redux/actions/hotelDetailActions';
import ImageViewer from '../../components/extra/ImageViewer';
import LoadPrices from '../../redux/thunkActions/loadPrices';
import { hotelIds } from '../../redux/actions/hotelDetailActions';
import { removeServices, serviceChecked } from '../../redux/actions/hotelDetailActions';

const RoomsCategory = (props) => {

    React.useEffect(() => {
        if(Object.keys(props.hotelDetail.hotelIds).length <= 0){
            props.hotelIds({hotelId: props.hotelId, roomId: props.data[0].id})
        }
    }, [])

    const styles = useStyleSheet(style);
    const [selectedIndex, setSelectedIndex] = React.useState(props.data[0].id);
    const [modalImages, setModalImages] = React.useState(props.data[0].images);
    const [amenities, setAmenities] = React.useState([]);
    const [visible, setVisible] = React.useState(false);

    const onCheckedChange = (index) => {
        setSelectedIndex(index);
    };

    const toggleModal = (amenitiesData) => {
        setAmenities(amenitiesData);
        setVisible(!visible);
    };

    const addModalImages = (data) => {
        setModalImages(data);
        props.openImageViewer();
    }

    const checkRooms = (data) => {
        onCheckedChange(data);
        props.removeServices([]);
        props.serviceChecked([]);
        props.hotelIds({hotelId: props.hotelId, roomId: data});
        props.LoadPrices({hotelId : props.hotelId, roomId : data, dates: props.hotelDetail.dates, rooms: props.hotelDetail.rooms, service: props.hotelDetail.services }, props.common.userData.access_token);
    }

    var maxlimit = 30;

    const RenderModalElement = (props) => (
        <Layout style={styles.modalContainer}>
            <Text style={styles.heading}>More Amenities</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.amenitiesContainer}>
                        {props.amenitiesData.map( item => 
                            <View key={item.id} style={styles.amenities}>
                                <Image
                                    style={styles.amenitiesImg}
                                    source={{uri: item.image}}
                                />
                            </View>
                        )}
                    </View>
                </ScrollView>
        </Layout>
    );  

    return(
        <View style={styles.cardContainer}>
            <Text style={styles.heading}>Rooms</Text>
            {props.data.map((item) => {
                var hotelname =  ((item.title).length > maxlimit) ? 
                (((item.title).substring(0,maxlimit-3)) + '...') : 
                item.title;
                return(
                    <View key={item.id} style={styles.controlContainer}>
                        <View style={styles.roomDetails}>
                            <View>
                                <Ripple onPress={() => addModalImages(item.images)}>
                                    <Image
                                        style={styles.image}
                                        source={{uri: item.images[0].source.uri}}
                                    />
                                </Ripple>
                            </View>
                        <View>
                            <Text style={styles.roomTitle}>{hotelname}</Text>
                            <View style={styles.capacity}>
                                <Icon name='people-outline' fill={styles.iconColor.color} width={20} height={20} />
                                <Text style={styles.roomCaption}> x{item.capacity.max_people}</Text>
                            </View>
                            <View style={styles.roomAmenities}>
                                {item.amenities.slice(0, 4).map((amenity) => <Image key={amenity.id} source={{uri:amenity.image}} style={styles.roomAmenitiesImg} />)}
                                {item.amenities.length > 4 ? <Ripple style={styles.moreBorder} onPress={() => toggleModal(item.amenities)}><Text style={styles.moreCaption}>{item.amenities.length - 4 + '+'}</Text></Ripple> : false}
                                <Modal visible={visible} allowBackdrop={true} onBackdropPress={() => toggleModal([])}>
                                    <RenderModalElement amenitiesData={amenities} />
                                </Modal>
                            </View>
                            <CheckBox
                                style={styles.checkbox}
                                status='success'
                                text={'₹'+item.price}
                                textStyle={styles.checkText}
                                checked={item.id == selectedIndex ? true : false}
                                onChange={() => checkRooms(item.id)}
                            />
                        </View>
                    </View>
                    <ImageViewer images={modalImages} show={props.hotelDetail.showImageViewer} onClose={props.closeImageViewer} />
                </View>
                )
            })}
        </View>
    );
}

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ openImageViewer: openImageViewer, closeImageViewer: closeImageViewer, LoadPrices: LoadPrices, hotelIds: hotelIds, removeServices, serviceChecked }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomsCategory);

const style = StyleService.create({
    heading:{
        fontSize: 16,
        marginBottom: 3,
        color: 'color-basic-700',
        fontWeight: '700',
    },
    cardContainer:{
        width: '95%',
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: 'background-basic-color-1',
        padding: 13,
        borderWidth: 1,
        borderColor: 'color-basic-300',
    },
    checkbox: {
        marginLeft: 10,
        marginTop: 8,
        zIndex: -5,
        justifyContent: 'flex-start',
    },
    controlContainer: {
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 5,
        borderWidth: 1,
        borderColor: 'color-basic-300',
    },
    image:{
        width: 150,
        height: 130,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    roomDetails:{
        flexDirection: 'row',
    },
    roomTitle:{
        padding: 8,
        paddingLeft: 10,
        width: '100%'
    },
    capacity:{
        flexDirection: 'row',
        paddingLeft: 10
    },
    roomCaption:{
        color: 'color-basic-600',
        paddingTop: 0
    },
    roomAmenities:{
        width: 170,
        height: 25, 
        marginLeft: 10,
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    roomAmenitiesImg:{
        width: 18, 
        height: 18, 
        marginRight: 15, 
        opacity: 0.5,
    },
    moreBorder:{
        borderWidth: 1,
        borderColor: 'color-basic-300',
        borderRadius: 5,
        padding: 1
    },
    moreCaption:{
        minWidth: 20,
        textAlign: 'center',
        fontSize: 13,
        color: 'color-basic-600'
    },
    checkText:{
        fontSize: 16,
        fontWeight: 'bold',
        color: 'color-primary-500'
    },
    modalContainer:{
        width: 300,
        borderRadius: 10,
        backgroundColor: 'background-basic-color-1',
        padding: 15,
        borderWidth: 1,
        borderColor: 'color-basic-300',
    },
    moreAmenities:{
        flex: 1,
        flexDirection: 'row',
    },
    amenitiesContainer:{
        top: 15,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    amenities:{
        height: 50,
        width: '33%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    amenitiesImg:{
        width: 25,
        height: 25,
        marginRight: 10,
        opacity: 0.5
    },
    iconColor : {
        color: 'color-basic-600'
    }
});