## 🗺️ Page "Carte"

La page **Carte** affiche une carte interactive centrée sur la France et permet de visualiser la **position actuelle de l’utilisateur**.

### ✨ Fonctionnalités principales

- 📍 **Localisation de l’utilisateur**

  - À l’ouverture, l’application demande l’autorisation d’accéder à la localisation.
  - Si l’utilisateur accepte, la carte se **centre automatiquement** sur sa position GPS.
  - Un **marqueur** indique l’emplacement exact de l’utilisateur.
  - La carte affiche également le **point bleu** standard (`showsUserLocation`) de `react-native-maps`.

- 🌍 **Vue large sur la France**

  - Avant la détection de la position, la carte affiche une vue **dézoomée** centrée sur la France.
  - Le zoom est défini par :
    ```ts
    latitudeDelta: 20,
    longitudeDelta: 20
    ```
    ce qui permet de voir **la France entière et ses pays voisins**.

- ⚙️ **Technologies utilisées**
  - [`react-native-maps`](https://github.com/react-native-maps/react-native-maps) pour l’affichage de la carte.
  - [`expo-location`](https://docs.expo.dev/versions/latest/sdk/location/) pour la gestion des permissions et la récupération de la géolocalisation.
  - Compatible **iOS** et **Android**.

### 🧭 Comportement général

1. Au lancement, la carte s’affiche centrée sur la France.
2. L’application demande la permission de localisation à l’utilisateur.
3. Si la permission est accordée :
   - La position actuelle est récupérée.
   - La carte se recentre sur cette position.
   - Un marqueur apparaît sur la carte avec le texte **"Vous êtes ici"**.
4. Si la permission est refusée :
   - Un message d’erreur s’affiche pour informer l’utilisateur.

### 🛠️ Exemple de code (extrait)

```tsx
setRegion((prev) => ({
  ...prev,
  latitude: loc.coords.latitude,
  longitude: loc.coords.longitude,
}));
```
