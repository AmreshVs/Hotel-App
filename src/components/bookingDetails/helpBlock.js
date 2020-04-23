import React from 'react';
import { View } from 'react-native';
import { Card, Button, Text, Icon, StyleService, useStyleSheet } from '@ui-kitten/components';
import * as Animatable from 'react-native-animatable';

const HelpBlock = () => {

  const styles = useStyleSheet(themedStyle);
  
  return (
    <Animatable.View animation="fadeInRight" direction="normal" duration={500} useNativeDriver={true} delay={30}>
      <Card style={styles.container}>
        <View style={styles.bookingContainer}>
          <View style={styles.confirmContainer}>
            <Icon name='alert-circle-outline' style={styles.checkIcon} fill='#FF7E6D' />
            <Text style={styles.confirmed}>Need Assistance?</Text>
          </View>
          <Text style={styles.caption}>Do you have any queries regarding your stay or booking? We can support you anytime</Text>
          <View style={styles.btnContainer}>
            <Button appearance='ghost' size='small' status='basic'>Call Us</Button>
            <Button appearance='ghost' size='small' status='basic'>Email Us</Button>
          </View>
        </View>
      </Card>
    </Animatable.View>
  )
}

export default HelpBlock;

const themedStyle = StyleService.create({
  container: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  bookingContainer: {
    alignItems: 'center',
  },
  confirmContainer: {
    flexDirection: 'row',
  },
  confirmed: {
    fontSize: 16,
    fontWeight: '700',
    paddingTop: 2,
  },
  checkIcon: {
    width: 23,
    height: 23,
    marginRight: 5,
  },
  caption: {
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: 'center',
    color: 'color-basic-600'
  },
  bookingCaption: {
    textAlign: 'center',
    color: 'background-basic-color-1',
    fontSize: 16,
    paddingTop: 10,
  },
  btnContainer: {
    flexDirection: 'row',
  }
});