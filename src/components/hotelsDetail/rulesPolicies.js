import React from 'react';
import { Text, StyleService, useStyleSheet } from '@ui-kitten/components';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { RFPercentage } from "react-native-responsive-fontsize";

const RulesPolicies = () => {

  const styles = useStyleSheet(style);
  
  return (
    <Animatable.View animation="fadeInRight" direction="normal" duration={500} useNativeDriver={true} delay={60} style={styles.cardContainer}>
      <Text style={styles.heading}>Rules & Policies</Text>
      <Text style={styles.text}>{'\u2022 '} Outside food not allowed</Text>
      <Text style={styles.text}>{'\u2022 '} Couples are welcome</Text>
      <Text style={styles.text}>{'\u2022 '} Guests can check in using any local or outstation ID proof</Text>
    </Animatable.View>
  );
}

export default RulesPolicies;

const style = StyleService.create({
  cardContainer: {
    width: '100%',
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: 'background-basic-color-1',
    padding: 13,
    borderWidth: 1,
    borderColor: 'color-basic-300',
  },
  heading: {
    fontSize: RFPercentage(2),
    marginBottom: 3,
    color: 'color-basic-700',
    fontWeight: '700',
  },
  text:{
    fontSize: RFPercentage(2)
  }
})