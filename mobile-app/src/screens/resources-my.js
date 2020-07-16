import React from 'react';
import { StyleSheet, FlatList, View, Text, TouchableOpacity, Alert } from 'react-native';

import { search, userID } from '../lib/utils'

const styles = StyleSheet.create({
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
  itemDescription: {
    fontSize: 14,
    fontFamily: 'IBMPlexSans-Medium',
    color: 'gray'
  },
  itemQuantity: {
    fontSize: 14,
    fontFamily: 'IBMPlexSans-Medium',
    color: 'gray'
  },
  emptyListView: {
    backgroundColor: '#982727',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyListText: {
    fontFamily: 'IBMPlexSans-Bold',
    color: '#999999',
    fontSize: 16
  },
    middleText: {
        
    },
    middleman: {
    display: "flex",
    alignItems: "center",
    marginTop: 2
    },
    middleman2: {
    display: "flex",
    alignItems: "center",
    marginTop: 2,
    backgroundColor: "#FFFFFF"
    }
});

const MyResources = function ({ navigation }) {
  const [items, setItems] = React.useState([]);
    const doneItems = [
        {
            name: "14th Street & Broadway",
            status: "Complete",
            quantity: 13,
            description: "Maskless crowd surrounding street performers",
            contact: "heh"
        }
    ];
    const pendingItems = [
        {
            name: "E. Houston & 1st Avenue",
            status: "Processing",
            quantity: 5,
            description: "Congregation of maskless hobbysists"
        }
    ];
    
    
  React.useEffect(() => {
    navigation.addListener('focus', () => {
      search({ userID: userID() })
        .then(setItems)
        .catch(err => {
          console.log(err);
          
        });
    })
  }, []);

  const Item = (props) => {
    return (
      <TouchableOpacity style={styles.itemTouchable}
          onPress={() => { navigation.navigate('Edit Report', { item: props }); }}>
        <View style={styles.itemView}>
          <Text style={styles.itemName}>{props.name}</Text>
          <Text style={styles.itemQuantity}> ( {props.quantity} ) </Text>
        </View>
        <Text style={styles.itemDescription}>{props.description}</Text>
      </TouchableOpacity>
    );
  };
  

    const DeceasedItem = (props) => {
      return (
        <TouchableOpacity style={styles.itemTouchable}
            onPress={() => { navigation.navigate('Edit Report', { item: props }); }}>
          <View style={styles.itemView}>
            <Text style={styles.itemName}>{props.name}</Text>
            <Text style={styles.itemQuantity}> ( {props.quantity} ) </Text>
          </View>
          <Text style={styles.itemDescription}>{props.description}</Text>
        </TouchableOpacity>
      );
    };
    const ret = [];
    let index = -1;
    items.map((e, i) => {
        if(e.quantity === 13) {
            e.name = "Eastern Parkway & Franklin Avenue";
            pendingItems.push(e);
            index = i;
        }
    });
    if(index !== -1) {
        items.splice(index, 1);
    }
              if(pendingItems.length > 0)
                  ret.push(
                    <View>
                        <View style={styles.middleman2}>
                            <Text style={styles.middleText}>Open</Text>
                        </View>
                        <FlatList style={styles.flatListView}
                            data={pendingItems}
                            renderItem={({ item }) => <DeceasedItem {...item} />}
                            keyExtractor={item => item.id || item['_id']}
                        />
                    </View>
                           );
    if(doneItems.length > 0) ret.push(
          <View>
                       <View style={styles.middleman}>
                       <Text style={styles.middleText}>Processing</Text>
                       </View>
                       <FlatList style={styles.flatListViewDone}
                         data={doneItems}
                         renderItem={({ item }) => <DeceasedItem {...item} />}
                         keyExtractor={item => item.id || item['_id']}
                       />
          </View>
    )
        
        if(items.length > 0)
        ret.push(
              <View>
              <View style={styles.middleman}>
                  <Text style={styles.middleText}>Complete</Text>
              </View>
        <FlatList style={styles.flatListViewDone}
          data={items}
          renderItem={({ item }) => <Item {...item} />}
          keyExtractor={item => item.id || item['_id']}
        />
          
                </View>
                );
            else ret.push(
                    <View style={styles.middleman}>
                        <Text style={styles.middleText}>You have no complete items</Text>

                        </View>
                          
                            
                          );
    return ret;
}

export default MyResources;
