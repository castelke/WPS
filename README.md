
- Installation

Dans le dossier WebContent :
- ouvrir avec un navigateur internet le fichier Configuration.html






- Manuel d'utilisation

Sur la page principale, il y a la map et un bouton pour la reinitialiser/
Il y a cinq boutons qui correspondent à cinq fonctionnalités :
- ConfigMap pour afficher les couches WMS et WFS favoris sur la map
- WPS pour sélectionner un favori WPS et l’exécuter
- Config Favoris WMS pour ajouter un favori WMS
- Config Favoris WFS pour ajouter un favori WFS
- Config Favoris WPS pour ajouter un favori WPS














- Partie WMS/WFS

Afficher un ou plusieurs favoris WFS/WMS

Sur la page ConfigMap : l'utilisateur peut sélectionner les favoris WMS et WFS qui s'afficheront sur la map 



Il peut sélectionner et désaffectionner les couches














- Ajouter un favori WFS/WMS

Sur les pages Config Favoris WMS et  Config Favoris WFS, l'utilisateur peut sélectionner un site puis une couche, cette couche est visualisée sur une map temporaire. S'il est satisfait du résultat, l'utilisateur appuie sur « Ajouter favoris ».
























- Partie WPS

- Ajouter un favori WPS

L'utilisateur sélectionne un site puis un process sur la page Config Favoris WPS

L'utilisateur écrit les données a envoyer ou sélectionne un favori WFS sur le formulaire. Il peut également choisir si la donnée est fixe ou pourra être modifiée par la suite. La réponse peut être reçu en web (redirection sur la page de la réponse) ou bien téléchargée.



Le process est enregistré en favori quand l'utilisateur appuie sur Add.



- Exécution du process

Sur la page WPS, l'utilisateur sélectionne le process qu'il souhaite exécuter, il voit alors les données mises en paramètres et prêtes a être envoyées.



Lorsque l'utilisateur appuie sur exécuter, il est renvoyé sur la page de la réponse du service WPS s'il a choisi « Web »


Ou bien s'il a choisi « File », la réponse peut être téléchargée.




- Architecture


1 fichier HTML 

Configration.html

Fichiers Javascript

config.js
ConfigWFS.js
ConfigWMS.js
ConfigWPS.js
MapVIew.js
ViewController.js

