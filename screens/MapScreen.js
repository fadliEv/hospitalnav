import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constant/colors';
import provinceCoords from '../constant/provinceCoords';
import { getCoordinatesFromAddress } from '../utils/geocode';

export default function MapScreen({ route, navigation }) {
  const { address, province, hospitalName } = route.params || {};

  const [loading, setLoading] = useState(true);
  const [mapCoords, setMapCoords] = useState(null);

  useEffect(() => {
    async function fetchCoords() {
      setLoading(true);
      const coords = await getCoordinatesFromAddress(address);
      if (coords) {
        setMapCoords(coords);
      } else if (province && provinceCoords[province]) {
        setMapCoords(provinceCoords[province]);
      } else {
        setMapCoords({ latitude: -2.5, longitude: 118 }); // fallback koordinat Indonesia tengah
      }
      setLoading(false);
    }
    fetchCoords();
  }, [address, province]);

  if (loading || !mapCoords) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Memuat peta...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: mapCoords.latitude,
          longitude: mapCoords.longitude,
          latitudeDelta: 0.3,
          longitudeDelta: 0.3,
        }}
      >
        <Marker
          coordinate={mapCoords}
          title={hospitalName || province || 'Lokasi tidak diketahui'}
          description={address ? address : 'Koordinat pusat provinsi'}
        />
      </MapView>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.backText}>Kembali</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: colors.primary,
  },
  map: { flex: 1 },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    elevation: 4,
  },
  backText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: 'bold',
  },
});
