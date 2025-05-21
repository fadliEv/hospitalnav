import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../constant/colors';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const defaultImage = 'https://imgs.search.brave.com/8fREaEbUGfLia8XLLzd6XrJLa3J4_lap1P46rZPAVTs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTc0/MzY0Nzk4L3Bob3Rv/L2hvc3BpdGFsLWVt/ZXJnZW5jeS1lbnRy/YW5jZS5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9M1BMUTdx/OTVmb1FOT3pVNEx3/eXZBVHBVZUFyOGxk/TUYxYUQ3TnBEZFAt/WT0';

export default function HospitalCard({ hospital }) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('MapScreen', {
      address: hospital.address,
      province: hospital.province,
      hospitalName: hospital.name,
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={{ uri: defaultImage }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{hospital.name}</Text>
        <View style={styles.row}>
          <MaterialIcons name="location-on" size={16} color={colors.primary} />
          <Text style={styles.detailText}>{`${hospital.address.substring(1, 30)}...`}</Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons name="map" size={16} color={colors.primary} />
          <Text style={styles.detailText}>{hospital.region}</Text>
        </View>
        <View style={styles.row}>
          <FontAwesome name="phone" size={16} color={colors.primary} />
          <Text style={styles.detailText}>{hospital.phone}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 17,
    borderColor: '#ccc',
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 12,
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  detailText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#333',
    flexShrink: 1,
  },
});
