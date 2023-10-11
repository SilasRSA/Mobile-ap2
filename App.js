import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesome5, Entypo, FontAwesome, Feather, Ionicons } from '@expo/vector-icons';
import Rating from './src/componentes/Rating';
import axios from 'axios';

export default function App() {
  const [dados, setDatos] = useState('');
  const [search, setSearch] = useState('');

  async function getDados() {
    try {
      const response = await axios.get(`https://hn.algolia.com/api/v1/search/?query=${search}`);
      setSearch([])
      setDatos(response.data.hits);
    } catch (error) {
      console.error(error);
    }

  }
  useEffect(getDados,[]);
  
  return (

    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titlePag}>OBRAS LITERATURA</Text>
      </View>
      <View style={styles.view}>
        <TextInput 
          style={styles.input} 
          placeholder="Informe o titulo" 
          onChangeText={text => setSearch(text)}>
        </TextInput>
        
        <TouchableOpacity 
          style={styles.search} 
          onPress={getDados}>
          <FontAwesome5 
            name="search" 
            size={26} 
            color="white" 
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={dados}
        keyExtractor={(item) => item.objectID}
        renderItem={({ item }) => (

          <View style={styles.books}>
              <Text style={styles.author}>
                <Entypo 
                  name="user" 
                  size={22} 
                  color="black" /> 
                  {'<autor>'} :{item.author} 
              </Text>
              <Text style={styles.title}>
                <FontAwesome 
                  name="book" 
                  size={22} 
                  color="black" 
                /> 
                  {'<titulo>'} :{item.title}
              </Text>
              <Text style={styles.url}>
                <Feather 
                  name="link" 
                  size={22} 
                  color="black"
                /> 
                {'<url>'}:{item.url}
              </Text>
              <Rating style={styles.rating} rating={0} />
          </View>
        )}

      />

    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0ffff',
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
  },

  titlePag: {
    fontSize: 25,
    fontWeight: 'normal',
    margin: 10,
  },

  input: {
    borderColor: '#add8e6',
    flexDirection: 'row',
    height: 50,
    width: 280,
    borderRadius: 1,
    borderWidth: 1,
    padding: 10
  },
  books: {
    backgroundColor: '#add8e6',
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'relative',
    borderRadius: 5,
    height: 150,
    width: 350,
    margin: 12,
    padding: 6, 
  },

  author: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontWeight: 'normal',
    fontSize: 13
  },
  view: {
    flexDirection: 'row',
    marginBottom: 0

  },

  search: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#add8e6',
    marginLeft: 30,
    marginTop: -7,
    width: 40,
    height: 40,
    borderRadius: 32,
  },

  title: {
    fontWeight: 'normal',
    fontSize: 13
  },

  url: {
    fontWeight: 'normal',
    fontSize: 13
  },

  rating:{
    fontSize: 13
  }
});









