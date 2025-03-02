import React from 'react';
import { StyleSheet, Text, TextInput, FlatList, View, TouchableOpacity, Alert } from 'react-native';
import PickerSelect from 'react-native-picker-select';

import { search } from '../lib/utils';

const styles = StyleSheet.create({
  outerView: {
    backgroundColor: '#982727',
    width: '100%',
    height: '100%'
  },
  inputsView: {
    backgroundColor: '#F1F0EE',
    padding: 16,
    padding: 22,
  },
  label: {
    fontFamily: 'IBMPlexSans-Medium',
    color: '#000',
    fontSize: 14,
    paddingBottom: 5
  },
  selector: {
    fontFamily: 'IBMPlexSans-Medium',
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 10
  },
  textInput: {
    fontFamily: 'IBMPlexSans-Medium',
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 10
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
  },
  searchResultText: {
    fontFamily: 'IBMPlexSans-Bold',
    padding: 10,
    color: '#F5B7B7'
  },
  flatListView: {
    backgroundColor: '#982727'
  },
  itemTouchable: {
    flexDirection: 'column',
    padding: 15,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    borderBottomColor: '#dddddd',
    borderBottomWidth: 0.25
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemName: {
    fontSize: 24,
    fontFamily: 'IBMPlexSans-Medium',
    color: '#F5B7B7'
  },
  itemQuantity: {
    fontSize: 14,
    fontFamily: 'IBMPlexSans-Medium',
    color: '#F5B7B7'
  },
  itemDescription: {
    fontSize: 14,
    fontFamily: 'IBMPlexSans-Medium',
    color: '#F5B7B7'
  }
});

const SearchResources = function ({ route, navigation }) {
  const [query, setQuery] = React.useState({ type: 'Help', name: '' });
  const [items, setItems] = React.useState([]);
  const [info, setInfo] = React.useState('');

  const Item = (props) => {
    return (
      <TouchableOpacity style={styles.itemTouchable}
          onPress={() => { navigation.navigate('Map', { item: props }); }}>
        <View style={styles.itemView}>
          <Text style={styles.itemName}>{props.name}</Text>
          <Text style={styles.itemQuantity}> ( {props.quantity} ) </Text>
        </View>
        <Text style={styles.itemDescription}>{props.description}</Text>
      </TouchableOpacity>
    );
  };

  const searchItem = () => {
    const payload = {
      ...query
    };

    search(payload)
      .then((results) => {
        setInfo(`${results.length} result(s)`)
        setItems(results);
      })
      .catch(err => {
        console.log(err);
        
      });
  };

  return (
    <View style={styles.outerView}>
      <View style={styles.inputsView}>
        <Text style={styles.label}>Type</Text>
        <PickerSelect
          style={{ inputIOS: styles.selector }}
          value={query.type}
          onValueChange={(t) => setQuery({ ...query, type: t })}
          items={[
              { label: 'Food', value: 'Food' },
              { label: 'Help', value: 'Help' },
              { label: 'Other', value: 'Other' }
          ]}
        />
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.textInput}
          value={query.name}
          onChangeText={(t) => setQuery({ ...query, name: t})}
          onSubmitEditing={searchItem}
          returnKeyType='send'
          enablesReturnKeyAutomatically={true}
          placeholder='e.g., No masks or social distancing'
          blurOnSubmit={false}
        />
        <TouchableOpacity onPress={searchItem}>
          <Text style={styles.button}>Search</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.searchResultText}>{info}</Text>

      <FlatList style={styles.flatListView}
        data={items}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={item => item.id || item['_id']}
      />
    </View>
  );
};

export default SearchResources;
