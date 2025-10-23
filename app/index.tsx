import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Platform,
  BackHandler,
} from "react-native";
import * as Battery from "expo-battery";
import * as Brightness from "expo-brightness";
import { useAudioPlayer } from "expo-audio";
import * as SMS from "expo-sms";
import { Image } from "react-native";

export default function IndexScreen() {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [brightness, setBrightness] = useState<number | null>(null);
  const [adjusted, setAdjusted] = useState<boolean>(false);
  const [dogImage, setDogImage] = useState<string | null>(null);
  const [chatClicks, setChatClicks] = useState(0);
  const [dogClicks, setDogClicks] = useState(0);
  const [showStats, setShowStats] = useState(false);

  // Préparer le player pour le miaulement
  const meowPlayer = useAudioPlayer(require("../assets/sounds/meow.mp3"));

  // ----- Initialisation Batterie & Luminosité -----
  useEffect(() => {
    (async () => {
      // 🔋 Batterie
      const level = await Battery.getBatteryLevelAsync();
      setBatteryLevel(level * 100);

      const batterySub = Battery.addBatteryLevelListener(({ batteryLevel }) => {
        setBatteryLevel(batteryLevel * 100);
      });

      // ☀️ Luminosité
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

  // ----- Gestion Menu -----
  const handleButtonClick = async (name: string) => {
    if (name === "Chat") {
      console.log('Bouton "Chat" cliqué');
      setChatClicks((prev) => prev + 1);
      meowPlayer.play(); // juste play(), plus besoin de loadAsync
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        await SMS.sendSMSAsync(
          ["0606060606"], // numéro destinataire
          "Je n'aime pas les chats" // message
        );
      }
    } else if (name === "Dog") {
      console.log('Bouton "Dog" cliqué');
      setDogClicks((prev) => prev + 1);
      fetch("https://dog.ceo/api/breeds/image/random")
        .then((response) => response.json())
        .then((data) => setDogImage(data.message))
        .catch((error) => console.error("Erreur fetch dog", error));
    } else if (name === "Cliquer") {
      console.log('Bouton "Cliquer" cliqué');
      setShowStats(true); // afficher la vue stats
    } else if (name === "Quit") {
      console.log('Bouton "Quit" cliqué');
      if (Platform.OS === "android") {
        BackHandler.exitApp();
      } else {
        Alert.alert("Quit", "Impossible de quitter l'application sur iOS");
      }
    }
  };

  const backgroundColor =
    batteryLevel !== null && batteryLevel < 50 ? "#FFA07A" : "#ADD8E6";

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
      {dogImage && (
        <Image
          source={{ uri: dogImage }}
          style={{ width: 300, height: 300, marginTop: 20, borderRadius: 15 }}
          resizeMode="contain"
        />
      )}
      {showStats && (
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>Chat : {chatClicks} clic(s)</Text>
          <Text style={styles.statsText}>Dog : {dogClicks} clic(s)</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    alignItems: "center",
  },
  statsText: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 2,
  },

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
