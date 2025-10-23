import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import * as Battery from "expo-battery";
import * as Brightness from "expo-brightness";

export default function IndexScreen() {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [brightness, setBrightness] = useState<number | null>(null);
  const [adjusted, setAdjusted] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      // ----- 🔋 Batterie -----
      const level = await Battery.getBatteryLevelAsync();
      setBatteryLevel(level * 100);

      const batterySub = Battery.addBatteryLevelListener(({ batteryLevel }) => {
        setBatteryLevel(batteryLevel * 100);
      });

      // ----- ☀️ Luminosité -----
      const { status } = await Brightness.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission refusée",
          "Impossible d’accéder à la luminosité."
        );
        return;
      }

      const currentBrightness = await Brightness.getBrightnessAsync();
      const brightnessPercent = currentBrightness * 100;
      setBrightness(brightnessPercent);

      if (brightnessPercent < 75) {
        await Brightness.setBrightnessAsync(0.2);
        setBrightness(20);
        setAdjusted(true);
      }

      return () => batterySub.remove();
    })();
  }, []);

  // Couleur de fond selon la batterie
  const backgroundColor =
    batteryLevel !== null && batteryLevel < 50 ? "#FFA07A" : "#ADD8E6";

  // Fonction pour gérer le clic des boutons
  const handleButtonClick = (name: string) => {
    console.log(`Bouton "${name}" cliqué`);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.text}>
        🔋 Batterie :{" "}
        {batteryLevel !== null
          ? `${batteryLevel.toFixed(0)}%`
          : "Chargement..."}
      </Text>
      <Text style={styles.text}>
        ☀️ Luminosité :{" "}
        {brightness !== null ? `${brightness.toFixed(0)}%` : "Chargement..."}
      </Text>
      {adjusted && (
        <Text style={styles.warning}>
          ⚠️ Luminosité trop faible détectée → ajustée à 20 %
        </Text>
      )}

      {/* ----- Menu de boutons ----- */}
      <View style={styles.menu}>
        {["Chat", "Dog", "Cliquer", "Quit"].map((item) => (
          <TouchableOpacity
            key={item}
            style={styles.button}
            onPress={() => handleButtonClick(item)}
          >
            <Text style={styles.buttonText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: { fontSize: 20, marginBottom: 10, color: "#333", fontWeight: "600" },
  warning: {
    marginTop: 10,
    color: "#E74C3C",
    fontSize: 16,
    fontStyle: "italic",
  },
  menu: { marginTop: 30, width: "100%" },
  button: {
    backgroundColor: "#4A90E2",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 6,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
