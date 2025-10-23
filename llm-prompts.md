# Prompts

## Contexte

Tu es développeur React Native. On utilise expo. Le but aujourd'hui va être de créer une application.
Le projet est initialisé avec react-native-template-blank-typescript

## Raisonnement

Je commence par découper le sujet en fonctionnalités

- L'application doit permettre d'afficher un splash screen avec un message de bienvenue : "Bienvenue sur Chat is my best hybrid friend".
- Le fond d'écran doit être bleu clair si la batterie de l'appareil est supérieure à 50% et saumon si elle est inférieure à 50%.
- La luminosité de l'écran doit être réglée assez élévée pour que le message soit bien visible. Sinon baisser la luminosité.
- Un menu permettra de choisir entre 3 options : "Chat", "Dog" et "Quit". Quit = ferme l'application. Chat = affiche un chat Dog = lance un appel à une API pour afficher une image de chien
- Quand on clique sur le chat, un son de chat doit être joué. Quand on clique sur le chien, prépare un sms avec le texte "Je n'aime pas les chats" à envoyer au numéro 06 06 06 06 06
- Un autre onglet, Carte, permettra d'afficher votre position sur une carte, je veux au moins voir toulon et paris sur la carte sans devoir dézoomer.
- Stockez le nombre de clics sur le chat et le chien et affichez-les dans un menu "Clicker" avec un bouton pour réinitialiser les compteurs.
- Le nombre de clics doit être sauvegardé pour un prochain lancement de l'application.

Puis en plus petits points traitables en 1 Prompt :

- Comment faire pour que mon application ait 2 tabs, un "index" et un "carte"
- Dans l'onglet carte, demander la localisation de l'utilisateur et l'afficher sur la carte
- Définir le zoom initial pour pouvoir voir la France entière
- Rédiger le Readme
- Sur la page index, comment définir la couleur du fond d'écran en fonction de la batterie de l'utilisateur par exemple : Bleu clair si > 50% et saumon si < 50 %
- Si la luminosité n'est pas à 75% ou plus, il faut la définir au minimum.
- Nous allons créer un menu sur cette page qui permet d'afficher "Chat" "Dog", "Cliquer" et "Quit".
- Lorsque "Quit" est cliqué, on veut quitter l'app
- Lorsque "Chat" est cliqué, cela joue un son de chat.
- Il faut aussi que cela envoie un SMS à 0606060606 qui dit "Je n'aime pas les chats"
- lorsque dog est cliqué, on récupère une image de chien aléatoire sur : trouver la source avant !
- compter le nombre de clics de "chat" et le nombre de clics de "dog" sans l'afficher pour le moment
- lorsque cliquer est cliqué, afficher le nombre de clics de "chat" et de "dog"
- ajouter un bouton à cet élément pour réinitialiser les compteurs
- lorsque chat est cliqué afficher un chat

- Todo extra rework Interface :
- Ne pouvoir actionner qu'un bouton à la fois entre chien et chat.
- Afficher les statistiques de cliquer en tant que pop-up
- Déplacer le bouton cliquer en tant que fast action
- Déplacer le bouton cliquer en haut à droite avec une icone

## Remarques

Avec mon sdk (54), il n'est pas possible de exit l'app. On doit simuler pour android et c'est impossible sur iOS. (réponse de chat GPT, à vérifier)

## Dicussions avec GPT

https://chatgpt.com/share/68fa2605-0e94-800f-84da-c294dd12d360

## Chit-Chat

J'ai réussi à avoir une seule conversation avec chatGPT pour résoudre ce sujet. Car dès le début j'ai séparé le sujet en plusieurs "tickets" représentants chacuns quelques lignes de code. Cela m'a permi de le guider et d'éviter qu'il parte dans tous les sens.
L'avantage est que j'ai donc pu avancer en gardant le contexte et les réponses étaient donc pour la plupart pertinentes.
Chaque ticket représente un ou plusieurs commit et/ou une branche.

Au milieu de la conversation, j'ai hésité à recréer un prompt car il ne voulait pas changer d'idée. j'ai finalement réussi en appuyant ma question avec des morceaux de la documentation d'expo.
