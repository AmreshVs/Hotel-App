import React from 'react';
import { bindActionCreators } from 'redux';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Icon, Text } from '@ui-kitten/components';
import TopNavSimple from '../../components/navigation/topNavSimple';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import FavouriteHotels from '../../components/favouriteHotels/index';
import GetFavourites from '../../redux/thunkActions/getFavourites';
import { loadPrices } from '../../redux/actions/hotelDetailActions';
import { NavigationEvents } from 'react-navigation';
import FavouriteHotelSK from '../../components/skeletons/favouriteHotelSK';

const NoFavourites = () => {
    return(
        <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No </Text>
            <Icon name='heart' width={30} height={30} fill='red' />
            <Text style={styles.noDataText}> Favourites has been added yet!</Text>
        </View>
    );
}

const FavouritesScreen = (props) => {

    const [data, setData] = React.useState([]);
    
    React.useEffect(() => {
        async function loadDatas(){
            const response = await GetFavourites(props.access_token);
            setData(response);
        }
        loadDatas();
    }, []);

    const reloadData = async () => {
        setData([]);
        const response = await GetFavourites(props.access_token);
        setData(response);
    }

    const navigateHotelDetails = (alias, id, is_favorite) => {
        props.loadPrices({});
        props.navigation.navigate('HotelsDetail',{
            alias: alias,
            hotelId: id,
            is_favorite: is_favorite
        });
    }

    return(
        <View style={styles.bodyContainer}>
            <NavigationEvents
                onWillFocus={reloadData}
            />
            <TopNavSimple screenTitle='Favourite Rooms' backHandler={() => props.navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.favourites} >
                {data.length === 0 ? 
                    [1,2,3].map((item) =><FavouriteHotelSK key={item} />)
                : 
                    data.map((item) => <FavouriteHotels key={item.id} alias={item.alias} navigate={() => navigateHotelDetails(item.alias, item.id, item.is_favorite)} reloadData={reloadData} hotelId={item.id} image={item.image[0].file} hotelName={item.title} price={item.price_start} rating={item.avg_rating} token={props.access_token} /> )}
            </ScrollView>
            {/* <NoFavourites/> */}
        </View>
    );
}

const mapStateToProps = (state) => {
    return state.common.userData;
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({loadPrices:loadPrices}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(FavouritesScreen));

const styles = StyleSheet.create({
    bodyContainer:{
        backgroundColor: '#FAFAFA',
        height: '100%',
    },
    noDataContainer:{
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataText:{
        fontSize: 16,
        color: '#626262',
    },
    favourites:{
        paddingTop: 10,
    }
});