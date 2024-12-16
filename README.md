#1 Configuration Back end

placez vous a la racine du projet et suivez les instructions
	
   1 - installation des dépendances 
	- saisir et valider la commande suivante dans le terminal : npm install
		NB : s'il ya erreur essayer : npm install --force
	- saisir et valider : npm install -g sequelize-cli

   2 - initialiser la base de donnée avec l'orm sequelize
	- assurez vous que les serveurs wamp/xaamp soient allumés
	- assurez que votre nom d'utilisateur soit "root" et votre mot de passe vide
	- saisir et exécuter la commande suivante dans le terminal:
	- npm run db:create
	- importer le fichier sql dans votre base de donnée
	- saisir et exécuter : npm run db:migrate
	- Enfin démarrer le serveur back end avec la commande : npm run dev 


#2 Configuration Front

placez vous a la racine du projet et suivez les instructions

1 - installation des dépendances 
	- saisir et valider la commande suivante dans le terminal : npm install
		NB : s'il ya erreur lors de l'installation, essayer : npm install --force

2- lancer avec -- npm run dev
3-Verifier que le backend et la base de donées sont bien lancer

NB: si lors de la premiere connexion vous navez pas acces a vos commandes juste rafrechir la page  

Pour la connexion afin de passer des commandes vous pouvez utiliser les identifiant suivant : 

username : labestaphanie@gmail.com
mdp: 12345678
