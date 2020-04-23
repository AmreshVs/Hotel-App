import React from 'react';
import { Text, StyleService, useStyleSheet } from '@ui-kitten/components';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';

const RulesPolicies = () => {

  const styles = useStyleSheet(style);
  
  return (
    <Animatable.View animation="fadeInRight" direction="normal" duration={500} useNativeDriver={true} delay={60} >
      <View style={styles.cardContainer}>
        <Text style={styles.heading}>Rules & Policies</Text>
        <Text>{'\u2022 '} Outside food not allowed</Text>
        <Text>{'\u2022 '} Couples are welcome</Text>
        <Text>{'\u2022 '} Guests can check in using any local or outstation ID proof</Text>
        <Text>{'\u2022 '} Only Indian citizens are allowed to stay</Text>
      </View>
    </Animatable.View>
  );
}

export default RulesPolicies;

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
})