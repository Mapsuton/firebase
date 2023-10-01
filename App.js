import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, remove, ref, onValue } from 'firebase/database';

const firebaseConfig = {

  apiKey: "AIzaSyBAJzPcYcs5jv573VUD7_4L4y0J4dElbUg",

  authDomain: "newproject-8ab0b.firebaseapp.com",

  projectId: "newproject-8ab0b",

  storageBucket: "newproject-8ab0b.appspot.com",

  messagingSenderId: "518535156807",

  appId: "1:518535156807:web:6b28ea508f84fddcaf4d62"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function App() {

  const [ title, setTitle] = useState('');
  const [ amount, setAmount] = useState('');
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    const itemsRef = ref(database, 'shoppingList/');
    onValue(itemsRef, (snapshot) => {
    const data = snapshot.val();
    setShoppingList(Object.values(data));
    })
    }, []);

      const saveItem = () => {
        push(
          ref(database, 'shoppingList/'),
          { 'product': title, 'amount': amount });
        };

        // const deleteItem = () => {
        //   remove(
        //     ref(database, 'shoppingList/'),
        //     { 'product': title, 'amount': amount });
        //   };


  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder='Product' onChangeText={title => setTitle(title)} value={title} />
      <TextInput style={styles.input} placeholder='Amount' onChangeText={amount => setAmount(amount)} value={amount} />
      <View style={styles.operators}>
      <Button onPress={saveItem} title='Save' />
      </View>
      <Text style={styles.header}>Shopping list</Text>
      <FlatList 
      style={styles.list}
      keyExtractor={item => item.id}
      renderItem={({ item }) =>
      <View style={styles.list}>
        <Text>{item.title}, {item.amount}   </Text>
        <Text style={{color: 'blue'}} onPress={() => deleteItem(item.id)}>Bought</Text>
        </View>}
      data={shoppingList}
       />
    </View>
  );
      }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    marginLeft: 50,
    width: '100%',
    marginTop: 5,
    flexDirection: 'row',
  },
  header: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 30,
    color: 'blue',
  },
  input: {
    marginTop: 5,
    marginBottom: 5,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1
  },
});
