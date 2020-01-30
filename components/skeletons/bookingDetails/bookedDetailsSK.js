import React from 'react';
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { Card, Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

const BookedDetailsSK = () => {
    return(
        <Card style={styles.cardContainer}>
            <SkeletonContent
                containerStyle={styles.placeholderContainer}
                isLoading={true}
                animationType="pulse"
                layout={[
                    styles.textPlaceholder1,
                ]}
            />
            <View style={styles.datesContainer}>
                <SkeletonContent
                    containerStyle={styles.placeholderContainer1}
                    isLoading={true}
                    animationType="pulse"
                    layout={[
                        styles.textPlaceholder2,
                        styles.textPlaceholder2,
                    ]}
                />
                <SkeletonContent
                    containerStyle={styles.placeholderContainer1}
                    isLoading={true}
                    animationType="pulse"
                    layout={[
                        styles.textPlaceholder2,
                        styles.textPlaceholder2,
                    ]}
                />
            </View>
            <View style={styles.hrLine} />
            <View style={styles.hotelContainer}>
                <SkeletonContent
                    containerStyle={styles.placeholderContainerImg}
                    isLoading={true}
                    animationType="pulse"
                    layout={[
                        styles.imgContainer,
                    ]}
                />
                <SkeletonContent
                    containerStyle={styles.placeholderContainer1}
                    isLoading={true}
                    animationType="pulse"
                    layout={[
                        styles.textPlaceholder2,
                        styles.textPlaceholder2,
                    ]}
                />
            </View>
            <View style={styles.countsContainer}>
                <SkeletonContent
                    containerStyle={styles.countsPlaceholder}
                    isLoading={true}
                    animationType="pulse"
                    layout={[
                        styles.CountsContainer,
                    ]}
                />
                <SkeletonContent
                    containerStyle={styles.countsPlaceholder}
                    isLoading={true}
                    animationType="pulse"
                    layout={[
                        styles.CountsContainer,
                    ]}
                />
                <SkeletonContent
                    containerStyle={styles.countsPlaceholder}
                    isLoading={true}
                    animationType="pulse"
                    layout={[
                        styles.CountsContainer,
                    ]}
                />
            </View>
            {[1,2,3,4,5,6].map((item) => 
                <SkeletonContent
                    key={item}
                    containerStyle={styles.servicePlaceholder}
                    isLoading={true}
                    animationType="pulse"
                    layout={[
                        styles.service1,
                        styles.service2,
                    ]}
                />
            )}
            <View style={styles.hrLine} />
            <View style={styles.btnContainer}>
                <SkeletonContent
                    containerStyle={styles.countsPlaceholder}
                    isLoading={true}
                    animationType="pulse"
                    layout={[
                        styles.btns,
                    ]}
                />
                <SkeletonContent
                    containerStyle={styles.countsPlaceholder}
                    isLoading={true}
                    animationType="pulse"
                    layout={[
                        styles.btns,
                    ]}
                />
            </View>
        </Card>
    )
}

export default BookedDetailsSK;

const styles = StyleSheet.create({
    cardContainer:{
        width: '100%',
        borderRadius: 10,
        marginTop: 10,
    },
    placeholderContainer:{
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 10,
    },
    placeholderContainer1:{
        width: '35%',
        alignItems: 'center',
        flexDirection: 'column',
    },
    countsPlaceholder:{
        width: 100,
    },
    placeholderContainerImg:{

    },
    hotelContainer:{
        flexDirection: 'row',
    },
    countsContainer:{
        marginTop: 20,
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    CountsContainer:{
        marginTop: 5,
        width: 70,
        height: 70,
        borderRadius: 10,
    },
    imgContainer:{
        marginTop: 5,
        width: 110,
        height: 70,
        borderRadius: 10,
    },
    textPlaceholder1:{
        marginTop: 5,
        width: 100,
        height: 20,
        borderRadius: 30,
    },
    textPlaceholder2:{
        marginTop: 10,
        width: 90,
        height: 15,
        borderRadius: 10,
    },
    textPlaceholder3:{
        marginTop: 20,
        width: 260,
        height: 15,
        borderRadius: 10,
    },
    textPlaceholder4:{
        marginTop: 10,
        width: 300,
        height: 15,
        borderRadius: 10,
    },
    moreContainer:{
        flexDirection: 'row',
    },
    morePlaceholder:{
        marginTop: 5,
        width: 50,
        height: 15,
        borderRadius: 10,
    },
    datesContainer:{
        justifyContent: 'center',
        flexDirection: 'row'
    },
    hrLine:{
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        marginTop: 30,
        marginBottom: 30,
    },
    servicePlaceholder:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    service1:{
        width: 160,
        height: 15,
    },
    service2:{
        width: 50,
        height: 15,
    },
    btnContainer:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
    },
    btns:{
        height: 50,
        width: 120,
    }
})