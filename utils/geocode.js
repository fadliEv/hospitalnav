export async function getCoordinatesFromAddress(address) {
  const apiKey = "55a146d7a7094dada2aeb2a4da05d114";
  const query = encodeURIComponent(`${address}, Indonesia`);
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry;
      return { latitude: lat, longitude: lng };
    } else {
      console.warn("No coordinates found for:", address);
      return null;
    }
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
}
