# DOCUMENTATION SUR LA CONSTRUCTION DU BACKEND AVEC SEQUELIZE
  
# Prérequis

## Montage de la base de données
  
Pour monter la BDD, nous allons nous appuyer sur des fichiers de migrations. Ces fichiers permettent de construire chaque table en fonction des informations contenues dans les modèles.

Ces fichiers sont donc créés conjointement avec les modèles, grâce à la commande suivante :

```bash
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
```

```npx sequelize-cli model:generate``` demande à sequelize de générer un model et un fichier de migration associé.  
```--name``` permet de donner un nom au modèle. La table créée par la migration aura le même nom, en minuscule et au pluriel.  
```--attributes``` permet de définir les attributs du modèle. Les attributs sont définis sous la forme ```nom:Type```.

Les fichiers de migrations doivent être exécutés dans un ordre précis afin de ne pas créer de conflits. Par exemple, si notre table ```Post``` dispose d'une clé étrangère sur la table ```User``` (user_id), il faut créer la table ```User``` avant la table ```Post```. De cette manière, à la création de la table ```Post```, la clé étrangère sera bien créée et pourra faire le lien avec la table existante.

## Correction des migrations et des modèles

Le système de création de modèles et de migration en ligne de commande de sequelize est très pratique, mais il n'est pas toujours adapté à nos besoins. En effet, il est parfois nécessaire de modifier les modèles et les migrations pour les adapter à des situations concrètes, comme l'ajout de clé étrangère ou de contraintes de données.  
Avec l'appui du dictionnaire de données, il faudra repasser sur les modèles et les migrations afin de définir les différents attributs spéciaux de chaque colonne, pour chaque table.

## Envoi des migrations
  
Afin de venir remplir notre BDD avec les tables définies dans nos migrations, il faut utiliser la commande suivante :

```bash
npx sequelize-cli db:migrate
```
  
Cette commande aura pour effet d'envoyer toutes les migrations qui n'ont pas encore été traitées en BDD. En effet, avec Sequelize, la base de données dispose d'une table ```SequelizeMeta```, qui enregistre toutes les migrations ayant déjà été traitées afin d'éviter les conflits et doublons.
  
Pour faire machine arrière et supprimer les migrations, nous allons utiliser la commande suivante :

```bash
npx sequelize-cli db:migrate:undo
```
  
## Création des tables de jonctions

Les tables de jonctions interviennent lors d'une relation ```Many-To-Many``` entre deux tables. Ces tables de jonctions sont nécessaires car elles permettent de stocker la multiplicité de clé étrangères de ce type de relation. Dans une relation Many-To-Many, nous avons une à plusieures clés étrangères de la table A qui seront associées à une a plusieures clés étrangères de la table B.

Pour construire une table de jonction ```[...WIP...]```

## Seed de la base de données

La base de donnée construite, il faut maintenant la peupler avec des données factices afin de pouvoir tester notre application en développement, vérifier le bon fonctionnement des routes, etc...

Pour procéder au seeding de la base de données, il faut ```[...WIP...]```

# Construction des routes
  
```[...WIP...]```

# Les controllers
  
```[...WIP...]```