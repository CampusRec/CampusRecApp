import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Ensure firebaseConfig is set up

export const fetchFields = async () => {
  const fieldsCollection = collection(db, "Fields");
  const snapshot = await getDocs(fieldsCollection);
  const fields = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return fields; // Returns an array of field data
};
import { collection, query, where, getDocs } from "firebase/firestore";

export const fetchFieldsByUniversity = async (university) => {
  const fieldsQuery = query(
    collection(db, "Fields"),
    where("university", "==", university)
  );
  const snapshot = await getDocs(fieldsQuery);
  const fields = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return fields; // Returns an array of field data for the specified university
};
