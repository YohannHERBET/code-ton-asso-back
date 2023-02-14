# DOCUMENTATION SUR LA CONSTRUCTION DU BACKEND AVEC SEQUELIZE
  
# Prérequis

## Montage de la base de données
  
Pour monter les tables au BDD, nous allons nous appuyer sur la syncronisation de Sequelize. Cette méthode permet de créer les tables en BDD à partir des modèles définis dans notre application. Cette méthode permet de créer les tables en BDD avec les attributs définis dans les modèles, et permet de créer les contraintes de données, les clés étrangères, et même les tables de jonctions.
C'est dans ```index.js``` de notre dossier ```models``` que nous allons définir la méthode de syncronisation de Sequelize. ```sequelize.sync({ force: false, alter: true });``` : 'force' permet, à chaque démarrage du serveur, de supprimer les tables existantes et de les recréer à partir des modèles. 'alter' permet, à chaque démarrage du serveur, de vérifier les tables existantes et de les modifier en fonction des modèles. Donc force à false et alter à true va simplement, au démarrage du serveur, vérifier que les tables existantes correspondent aux modèles, et les modifier si besoin.

## Seed de la base de données

La base de donnée construite, il faut maintenant la peupler avec des données factices afin de pouvoir tester notre application en développement, vérifier le bon fonctionnement des routes, etc...

Pour procéder au seeding de la base de données, il faut ```[...WIP...]```

# Construction des routes
  
```[...WIP...]```

# Les controllers
  
```[...WIP...]```