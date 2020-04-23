import React from 'react';
import { Text, Icon, StyleService, useStyleSheet } from '@ui-kitten/components';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';

const NameBlock = (props) => {

  const styles = useStyleSheet(style);
  const data = props.data;
  
  return (
    <Animatable.View animation="fadeInRight" direction="normal" duration={500} useNativeDriver={true} delay={10} >
      <View style={styles.cardContainer}>
        <View style={styles.nameprice}>
          <View style={styles.nameBlock}>
            <Text style={styles.roomTitle}>{data.title}</Text>
            <Text style={styles.caption}>{data.subtitle}</Text>
            <View style={styles.ratingContainer}>
              <Icon name='star' width={22} height={22} fill='#FFD13A' />
              <Text style={styles.ratingCount}><Text style={styles.caption}>{data.avg_rating}</Text><Text style={styles.caption}> | {data.total_comments} Comments</Text></Text>
            </View>
          </View>
          <View style={styles.priceBlock}>
            <Text style={styles.oldPrice}>{'₹' + data.discount_price} </Text>
            <Text style={styles.price}>{'₹' + data.avg_price}</Text>
            <Text style={styles.priceCaption}>  Per Night</Text>
            <Icon name='map-outline' style={styles.mapIcon} fill='#CCC' />
          </View>
        </View>
      </View>
    </Animatable.View>
  );
}

export default NameBlock;

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
  nameprice: {
    flex: 1,
    flexDirection: 'row',
  },
  nameBlock: {
    width: '75%',
    height: 85,
    justifyContent: 'center'
  },
  priceBlock: {
    width: '25%',
    height: 85,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  price: {
    marginTop: 5,
    fontSize: 21,
    fontWeight: '700',
    color: 'color-primary-500',
  },
  oldPrice: {
    fontSize: 15,
    paddingTop: 1,
    paddingRight: 5,
    color: 'color-basic-600',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
  priceCaption: {
    color: 'color-basic-600',
    fontSize: 13
  },
  roomTitle: {
    fontSize: 16,
    marginBottom: 3,
    color: 'color-basic-700',
    fontWeight: '700',
  },
  caption: {
    color: 'color-basic-600',
    marginBottom: 3
  },
  ratingContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
  },
  ratingCount: {
    fontSize: 16,
    color: 'color-basic-700',
    paddingTop: 2,
    paddingLeft: 5
  },
  mapIcon: {
    width: 23,
    height: 23,
    marginRight: '15%'
  }
});