import React from 'react';
import { Text, Icon, StyleService, useStyleSheet } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { View, Modal, ScrollView } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { withNavigation } from 'react-navigation';
import Progress from '../extra/progress';
import ReviewsLess from './reviewsLess';
import TopNavSimple from '../navigation/topNavSimple';
import WriteReview from './writeReview';
import ReviewsLessSK from '../skeletons/hotelDetail/reviewsLessSK';
import LoadAllReviews from '../../redux/thunkActions/loadAllReviews';

const GuestDetails = (props) => {
    const styles = useStyleSheet(style);
    const [visible, setVisible] = React.useState(false);
    const [writeReview, setwriteReview] = React.useState(false);
    const [allReviewData, setAllReviewsData] = React.useState([]);

    const toggleModal = async () => {
        setVisible(!visible);
        if(visible === false){
            const data = await LoadAllReviews(props.hotelId, props.access_token);
            setAllReviewsData(data);
        }
    }

    const toggleWriteReview = () => {
        setwriteReview(!writeReview);
    }

    const progressData = [
        { id: 5, num: props.data.rating5 },
        { id: 4, num: props.data.rating4 },
        { id: 3, num: props.data.rating3 },
        { id: 2, num: props.data.rating2 },
        { id: 1, num: props.data.rating1 },
    ];

    const RenderReviewLessSK = () => {
        const skData = [1,2,3,4,5];
        return(
            skData.map((item) => <ReviewsLessSK key={item} />)
        )
    }

    return (
        <View style={{ width: '100%', marginLeft: 20 }}>
            <View style={styles.cardContainer}>
                <View style={styles.textContainer}>
                    <View style={styles.textContainer1}>
                        <Text style={styles.heading}>Reviews & Ratings</Text>
                        <Ripple onPress={toggleWriteReview}>
                            <Icon name='edit-outline' fill='#AAA' width={20} height={20} />
                        </Ripple>
                    </View>
                    <View style={styles.ratingsContainer}>
                        <View style={styles.ratingLeft}>
                            <Text style={styles.rating}>{props.data.avg_rating}</Text>
                            <Text style={styles.ratingCaption}>{props.data.rating_caption}</Text>
                            <Text style={styles.ratingNumber}>{props.data.total_rating}</Text>
                        </View>
                        <View style={styles.ratingRight}>
                            {progressData.map((item) => {
                                return (
                                    <View key={item.id} style={styles.progressCount}>
                                        <View style={styles.countContainer}>
                                            <Text>{item.id}</Text>
                                        </View>
                                        <View style={styles.progressContainer}>
                                            <Progress color='#FFC145' data={item.num} />
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                </View>
                <ReviewsLess data={props.data.reviews[0]} />
                <Ripple rippleSize={50} rippleDuration={600} style={styles.seeAllContainer} onPress={toggleModal}>
                    <Text style={styles.seeAll}>See all reviews</Text>
                </Ripple>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={visible}
                    onRequestClose={toggleModal}
                >
                    <View>
                        <TopNavSimple backHandler={toggleModal} screenTitle="All Reviews" />
                        <ScrollView style={styles.reviewsMore} showsVerticalScrollIndicator={false}>
                            {allReviewData.length === 0 ? <RenderReviewLessSK/> : 
                                allReviewData.map((item) => {
                                    return <ReviewsLess key={item.id} data={item} />
                                })
                            }
                        </ScrollView>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={writeReview}
                    onRequestClose={toggleWriteReview}
                >
                    <View>
                        <TopNavSimple backHandler={toggleWriteReview} screenTitle="Write a review" />
                        <WriteReview backHandler={toggleWriteReview} />
                    </View>
                </Modal>
            </View>
        </View>
    );
}

const mapStateToProps = (state) => {
    return state.common.userData;
}

export default connect(mapStateToProps)(withNavigation(GuestDetails));

const style = StyleService.create({
    cardContainer: {
        width: '95%',
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: 'background-basic-color-1',
        padding: 13,
        borderWidth: 1,
        borderColor: 'color-basic-300',
    },
    heading: {
        fontSize: 16,
        marginBottom: 3,
        color: 'color-basic-700',
        fontWeight: '700',
    },
    ratingsContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    ratingLeft: {
        height: 150,
        width: '35%',
        paddingRight: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderTopStartRadius: 10,
        borderRightColor: 'color-basic-300',
    },
    ratingRight: {
        height: 150,
        width: '65%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rating: {
        fontSize: 40,
        fontWeight: '700',
        paddingTop: 20,
        color: 'color-primary-500'
    },
    ratingCaption: {
        // color: '#AAA'
    },
    ratingNumber: {
        color: 'color-basic-600',
        fontSize: 13,
    },
    progressCount: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        marginBottom: 6,
    },
    countContainer: {
        width: '10%',
    },
    progressContainer: {
        width: '90%'
    },
    seeAllContainer: {
        marginTop: 10,
    },
    seeAll: {
        color: 'color-primary-500'
    },
    reviewsMore: {
        paddingLeft: 20,
        marginBottom: 65,
    },
    textContainer1:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})