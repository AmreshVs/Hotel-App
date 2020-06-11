import React from 'react';
import { Text, StyleService, useStyleSheet } from '@ui-kitten/components';
import { View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import * as Animatable from 'react-native-animatable';

const HotelDescription = (props) => {
  
  const styles = useStyleSheet(style);
  const [showDesc, setShowDesc] = React.useState(60);
  const revealDescription = () => {
    showDesc == 60 ? setShowDesc('auto') : setShowDesc(60);
  }

  const regex = /(<([^>]+)>)/ig;
  const lines = /^\s*\n/gm;
  const description = props.description.replace(regex, '');
  const description1 = description.replace(lines, '');

  return (
    <Animatable.View animation="fadeInUp" direction="normal" duration={500} useNativeDriver={true} delay={80} >
      <View style={styles.cardContainer}>
        <Text style={styles.heading}>Description</Text>
        <Text style={[styles.desc, { height: showDesc }]}>{description1}</Text>
        <Ripple rippleSize={50} rippleDuration={600} onPress={revealDescription}>
          <Text status='primary' style={{ marginTop: 5 }}>{showDesc == 60 ? 'More' : 'Less'}</Text>
        </Ripple>
      </View>
    </Animatable.View>
  );
}

export default HotelDescription;

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
  desc: {
    color: 'color-basic-600'
  }
})