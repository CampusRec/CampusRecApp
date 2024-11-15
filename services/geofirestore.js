import { GeoFirestore } from "geofirestore";

export const fetchNearbyFields = async (latitude, longitude, radiusInKm) => {
  const geoFirestore = new GeoFirestore(collection(db, "Fields"));
  const geoQuery = geoFirestore.query({
    center: [latitude, longitude],
    radius: radiusInKm,
  });

  const querySnapshot = await geoQuery.get();
  const fields = querySnapshot.docs.map((doc) => doc.data());
  return fields; // Returns fields within the radius
};
