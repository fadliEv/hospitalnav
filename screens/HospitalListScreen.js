import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import HospitalCard from '../components/HospitalCard';
import colors from '../constant/colors';

export default function HospitalListScreen({ navigation }) {
  const [hospitals, setHospitals] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true); // loading state

  function getHospitalData(){
     fetch('https://dekontaminasi.com/api/id/covid19/hospitals')
      .then(res => res.json())
      .then(data => {
        setHospitals(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }

  useEffect(() => {
    getHospitalData()
  }, []);


  const handleSearch = (text) => {
    setQuery(text);
    const filtered = hospitals.filter(h =>
      h.name.toLowerCase().includes(text.toLowerCase()) ||
      h.province.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(filtered);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Cari rumah sakit..."
        style={styles.search}
        value={query}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <HospitalCard hospital={item} navigation={navigation} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 50,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    marginHorizontal: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
});
