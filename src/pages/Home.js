import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList,
} from 'react-native';
import {Button} from '../components/Button';
import {SkillCard} from '../components/SkillCard';

export function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState([]);
  const [greetting, setGreettings] = useState('');

  function handleAddNewSkill() {
    setMySkills(oldState => [...oldState, newSkill]);
  }

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreettings('Good morning');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreettings('Good afternoon');
    } else {
      setGreettings('Good night');
    }
  }, []);
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Todo list</Text>
        <Text style={styles.greettings}>{greetting}</Text>

        <TextInput
          style={styles.input}
          placeholder="New task"
          placeholderTextColor="#555"
          onChangeText={setNewSkill}
        />
        <Button onPress={handleAddNewSkill} />
        <Text style={[styles.title, {marginVertical: 50}]}>My Tasks</Text>

        <FlatList
          data={mySkills}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({item}) => <SkillCard skill={item} />}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 30,
    paddingVertical: 70,
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1F1e25',
    color: '#FFF',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7,
  },
  greettings: {
    color: '#FFF',
  },
});
