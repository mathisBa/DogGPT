# DogGPT - Application React Native

DogGPT est une application mobile développée avec **React Native** et **Expo**. Elle permet d'interagir avec des images de chats et chiens, de consulter des statistiques d'utilisation, et de gérer certains paramètres du téléphone (batterie, luminosité).

---

## Environnement nécessaire

- Node.js ≥ 24.x
- Expo CLI
- SDK Expo 54
- TypeScript
- iOS 13+ ou Android 8+

---

## Installation

1. Cloner le dépôt :

```bash
git clone <https://github.com/mathisBa/DogGPT>
cd <DogGPT>
```

2. Installer les dépendances :

```bash
npm install
```

3. Lancer l'application sur un simulateur ou un appareil physique :

```bash
npx expo start
```

## Fonctionnalités principales

- Batterie et luminosité : affichage du niveau de batterie et ajustement automatique de la luminosité si elle est trop faible.
- Chat : affiche une image de chat, joue un miaulement et envoie un SMS prédéfini.
- Dog : affiche une image de chien aléatoire provenant de l'API dog.ceo.
- Statistiques : compte les clics sur Chat et Dog, consultables via un bouton dédié. Possibilité de réinitialiser les compteurs.

## Structure du projet

app/index.tsx : écran principal avec toutes les fonctionnalités.
assets/ : images et sons utilisés dans l’application.

## Notes

Les permissions pour la luminosité et l’accès au SMS sont demandées au lancement.
La lecture audio est locale, aucune permission supplémentaire n’est requise pour le son.
