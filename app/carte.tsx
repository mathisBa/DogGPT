import { View, Text, StyleSheet } from "react-native";

export default function CarteScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Voici la carte 🗺️</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18 },
});
