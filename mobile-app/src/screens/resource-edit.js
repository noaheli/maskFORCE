import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PickerSelect from 'react-native-picker-select';
import { CheckedIcon, UncheckedIcon } from '../images/svg-icons';
import Geolocation from '@react-native-community/geolocation';

import { update, remove, userID } from '../lib/utils'

const styles = StyleSheet.create({
  outerView: {
    flex: 1,
    padding: 22,
    backgroundColor: '#FFF'
  },
  splitView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  typeArea: {
    width: '40%'
  },
  label: {
    fontFamily: 'IBMPlexSans-Medium',
    color: '#000',
    fontSize: 14,
    paddingBottom: 5
  },
  selector: {
    fontFamily: 'IBMPlexSans-Medium',
    borderColor: '#D0E2FF',
    borderWidth: 2,
    padding: 16,
    marginBottom: 25
  },
  quantityArea: {
    width: '40%'
  },
  textInput: {
    fontFamily: 'IBMPlexSans-Medium',
    flex: 1,
    borderColor: '#D0E2FF',
    borderWidth: 2,
    padding: 14,
    elevation: 2,
    marginBottom: 25
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10
  },
  checkboxLabel: {
    fontFamily: 'IBMPlexSans-Light',
    fontSize: 13
  },
  textInputDisabled: {
    fontFamily: 'IBMPlexSans-Medium',
    backgroundColor: '#f4f4f4',
    color: '#999',
    flex: 1,
    padding: 16,
    elevation: 2,
    marginBottom: 25
  },
  updateButton: {
    backgroundColor: '#1062FE',
    color: '#FFFFFF',
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 16,
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
    marginTop: 15
  },
  deleteButton: {
    backgroundColor: '#da1e28',
    color: '#FFFFFF',
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 16,
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
    marginTop: 15
  }
});

const EditResource = (props) => {
  const clearItem = { userID: userID(), e: 'Food', name: '', description: '', location: '', contact: '', quantity: '1' }
  const [item, setItem] = React.useState(clearItem);
  const [useLocation, setUseLocation] = React.useState(false);
  const [position, setPosition] = React.useState({})

  React.useEffect(() => {
    props.navigation.addListener('focus', () => {
      const item = props.route.params.item;
      setItem({
        ...item,
        quantity: item.quantity.toString()
       });

      Geolocation.getCurrentPosition((pos) => {
        setPosition(pos);
      });
    })
  }, []);

  const toggleUseLocation = () => {
    if (!useLocation && position) {
      setItem({
        ...item,
        location: `${position.coords.latitude},${position.coords.longitude}`
      })
    }
    setUseLocation(!useLocation);
  };

  const updateItem = () => {
    const payload = {
      ...item,
      quantity: isNaN(item.quantity) ? 1 : parseInt(item.quantity),
      id: item.id || item['_id']
    };

    update(payload)
      .then(() => {
        Alert.alert('Done', 'Your item has been updated.', [{text: 'OK'}]);
        props.navigation.goBack();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const confirmDelete = () => {
    Alert.alert(
      'Redeem',
      'Redeem this item?',
      [
        { text: 'Cancel' },
        { text: 'Redeem', onPress: () => deleteItem() }
      ]
    )
  }

  const deleteItem = () => {
    const payload = {
      ...item,
      id: item.id || item['_id']
    };

    remove(payload)
      .then(() => {
        Alert.alert('Done', 'This item has been completed.', [{text: 'OK'}]);
        props.navigation.goBack();
      })
      .catch(err => {
        console.log(err);
        Alert.alert('ERROR', err.message, [{text: 'OK'}]);
          props.navigation.goBack();
      });
  };
  
    

  return (
    <ScrollView style={styles.outerView}>
      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.textInput}
        value={item.name}
        onChangeText={(t) => setItem({ ...item, name: t})}
        onSubmitEditing={updateItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='e.g., Tomotatoes'
        blurOnSubmit={false}
      />
      
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.textInput}
        value={item.description}
        onChangeText={(t) => setItem({ ...item, description: t})}
        onSubmitEditing={updateItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='e.g., small baskets of cherry tomatoes'
      />
          <View style={styles.quantityArea}>
            <Text style={styles.label}>Quantity</Text>
            <TextInput
              style={styles.textInput}
              value={item.quantity}
              onChangeText={(t) => setItem({ ...item, quantity: t})}
              onSubmitEditing={updateItem}
              returnKeyType='send'
              enablesReturnKeyAutomatically={true}
              placeholder='e.g., 10'
              keyboardType='numeric'
            />
          </View>
          <Text style={styles.label}>Angel Responder</Text>
          <TextInput
            style={styles.textInput}
            value="Jimothy Parkins"
            onChangeText={(t) => setItem({ ...item, contact: t})}
            onSubmitEditing={updateItem}
            returnKeyType='send'
            enablesReturnKeyAutomatically={true}
            placeholder='user@domain.com'
          />

      <TouchableOpacity onPress={confirmDelete}>
        <Text style={styles.updateButton}>Complete ( 40 points )</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditResource;
