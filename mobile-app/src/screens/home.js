import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Button, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


const styles = StyleSheet.create({
  center: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#982828'
  },
  scroll: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 25,
    paddingTop: 75
  },
  image: {
    alignSelf: 'flex-start',
    height: '20%',
    width:'50%',
    resizeMode: 'contain'
  },
  title: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 36,
    color: '#f5b7b7',
    
    paddingBottom: 15
  },
  subtitle: {
    fontFamily: 'IBMPlexSans-Light',
    fontSize: 24,
    color: '#F5B7B7',
    textDecorationColor: '#D0E2FF',
    textDecorationLine: 'underline',
    paddingBottom: 5,
    paddingTop: 20
  },
  content: {
    fontFamily: 'IBMPlexSans-Light',
    color: '#F5B7B7',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16
  },
  buttonGroup: {
    flex: 1,
    paddingTop: 15,
    width: 175,
  },
  button: {
    backgroundColor: '#F5B7B7',
    color: '#982727',
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 16,
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
    marginTop: 15,
    borderRadius:20,
  }
});

const Home = () => (
  <View style={styles.center}>
    <ScrollView style={styles.scroll}>
      <Text style={styles.subtitle}>IBM Intern Hackathon 2020</Text>
      <Text style={styles.title}>maskFORCE</Text>
      <Text style={styles.content}>
        There is a growing interest in enabling communities to cooperate among
        themselves to solve problems in times of crisis, whether it be to
        advertise where supplies are held, offer assistance for collections, or
        other local services like volunteer deliveries.
      </Text>
      <Text style={styles.content}>
        This app allows people to alert communities and local volunteers of areas with 
        dense gatherings. Once alerted, community volunteers will arrive and provide 
        them with protection such as masks and hand sanitizers, as well as educate
        them on the importance of social distancing.
      </Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity onPress={() => Linking.openURL('https://developer.ibm.com/callforcode')}>
          <Text style={styles.button}>Learn more</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://github.com/noaheli/maskFORCE')}>
          <Text style={styles.button}>Get the code</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </View>
);

export default Home;

