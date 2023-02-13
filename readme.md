# Docker

## Configuration

Copier le `.env.example` en `.env` et modifier les variables d'environnement au besoin.


# Lancement

Pour lancer le projet : 

```bash
docker compose up 
# ou 
docker compose up -d
# pour être en mode détaché et garder la main sur le terminal
```

Pour arrêter le projet : 

```bash
docker compose stop
```

Pour arrêter et supprimer les containers : 

```bash
docker compose down
```

Pour rentrer dans un container: 

```bash
docker exec -it <container_name> bash
```


```bash
# Exemple avec le container de notre app
docker exec -it projet-code-ton-asso-back-app-1 bash
```

# Bonus

Script doxec

`./doxec` pour lancer les commandes disponibles dans ce même fichier.

Si le script n'est pas executable, il faut le rendre executable avec la commande suivante : 

```bash
sudo chmod +x doxec
```