import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text, CheckBox, Button } from '@ui-kitten/components';
import { StyleSheet, View, Modal, ScrollView } from 'react-native';
import TopNavSimple from '../navigation/topNavSimple';
import ExtraServices from './extraServices';
import LoadPrices from '../../redux/thunkActions/loadPrices';
import { addCoupons } from '../../redux/actions/hotelDetailActions';

const PricingDetails = (props) => {
    const [modal, setModal] = React.useState(false);
    var servicesId = 0;

    const openModal = () => {
        if(props.hotelDetail.coupons.code === undefined){
            setModal(!modal);
        }
        else{
            props.addCoupons({});
            props.LoadPrices({hotelId : props.hotelDetail.hotelIds.hotelId, roomId : props.hotelDetail.hotelIds.roomId, dates: props.hotelDetail.dates, rooms: props.hotelDetail.rooms, service: props.hotelDetail.services}, props.common.userData.access_token);
            setModal(false);
        }
    }

    const closeModal = (item, price) => {
        props.addCoupons({code: item, price: price});
        props.LoadPrices({hotelId : props.hotelDetail.hotelIds.hotelId, roomId : props.hotelDetail.hotelIds.roomId, dates: props.hotelDetail.dates, rooms: props.hotelDetail.rooms, service: props.hotelDetail.services, coupon_code: item }, props.common.userData.access_token);
        setModal(!modal);
    }

    return(
        <View style={styles.cardContainer}>
            <Text style={styles.heading}>Pricing Details & Extra Services</Text>
            <View style={styles.textContainer}>
                {props.hotelDetail.coupons.code === undefined ? <Text>Apply Coupon</Text> : <Text style={[styles.coupon, {marginTop: 10}]}>Coupon : {props.hotelDetail.coupons.code}</Text>}
                <View style={styles.checkboxContainer}>
                    <Text style={styles.checkboxText}>{props.hotelDetail.coupons.price === undefined ? '' : '₹'+props.hotelDetail.coupons.price}</Text>
                    {props.data.data.coupons !== undefined ? <CheckBox checked={props.hotelDetail.coupons.price !== undefined ? true : false} onChange={openModal} /> : <CheckBox disabled={true} /> }
                </View>
            </View>
            {props.data.data.services !== undefined && props.data.data.services.map((item) => {
                servicesId++
                return <ExtraServices key={item.service_id} id={servicesId} service_id={item.service_id} name={item.service_name} desc={''} quantity={(item.service_type).search('qty') !== -1 ? true : false } price={'₹'+item.price} />
            })}
            <View style={styles.textContainer}>
                <Text style={styles.total}>Total</Text>
                <Text style={styles.total}>₹{props.data.data.price !== undefined ? props.data.data.price.total : 0}</Text>
            </View>
            {props.data.data.price !== undefined &&
                <View> 
                    <View style={styles.textContainer}>
                        <Text>Discount</Text>
                        <Text>- ₹{props.data.data.price.discount_price}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.total}>Total After Discount</Text>
                        <Text style={styles.total}>₹{props.data.data.price.discount_after_price}</Text>
                    </View>
                </View>
            }
            <Modal
                animationType="slide"
                transparent={false}
                visible={modal}
                onRequestClose={() => setModal(!modal)}
            >
                <View>
                    <TopNavSimple backHandler={() => setModal(!modal)} screenTitle="Apply Coupon" />
                    <ScrollView style={styles.applyCoupon} showsVerticalScrollIndicator={false}>
                        <Text style={[styles.heading, styles.couponHeading]}>Availabe Coupons</Text> 
                        <View style={styles.couponsContainer}>
                            {props.data.data.coupons !== undefined && Object.values(props.data.data.coupons).map((item) => {
                                return(
                                    <View style={styles.container} key={item.id}>
                                        <View style={styles.coupons}>
                                            <View style={styles.textContent}>
                                                <Text style={styles.coupon}>
                                                    {item.code}
                                                </Text>
                                            </View>
                                            <View style={styles.btnContent}>
                                                <Button style={styles.button} appearance='outline' size='tiny' onPress={() => closeModal(item.code, item.discount_price)}>Apply</Button>
                                            </View>
                                        </View>
                                        <Text style={styles.couponDesc}>{item.desc}</Text>
                                    </View>
                                )     
                            })}
                        </View>
                        <View style={{marginBottom: 70}}></View>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({LoadPrices:LoadPrices, addCoupons:addCoupons}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PricingDetails);

const styles = StyleSheet.create({
    cardContainer:{
        width: '95%',
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: '#FFF',
        padding: 13,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    heading:{
        fontSize: 16,
        marginBottom: 10,
        color: '#626262',
        fontWeight: '700',
    },
    textContainer:{
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    total:{
        fontWeight: '700'
    },
    checkboxContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    checkboxText:{
        marginRight: 15,
    },
    couponsContainer:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    container:{
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 10,
        marginTop: 10,
        width: '95%',
        backgroundColor: '#FFF'
    },
    coupons:{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textContent:{
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnContent:{
        padding: 10,
    },
    coupon:{
        fontWeight: '700',
        backgroundColor: '#FEFAD7',
        padding: 7,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#D8B828',
        borderRadius: 6,
    },
    couponDesc:{
        marginLeft: 10,
        marginBottom: 10, 
    },
    couponHeading:{
        marginLeft: 10,
        marginTop: 10,
    },
    applyCoupon:{
        height: '100%',
        backgroundColor: '#FAFAFA',
        paddingBottom: 30,
    }
})