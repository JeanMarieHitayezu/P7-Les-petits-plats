# P7-Les-petits-plats
Ce projet 7 est l'un des projets de la formation de développeur F-E d'Openclassrooms.
Je suis freelance et je viens d'être missionné par l'entreprise "Les petits plats" pour développer un algorithme de recherche.
Après avoir édité des livres de cuisine pendant plusieurs années, l'entreprise a décidé de se lancer dans un nouveau projet: réaliser son propre site de recettes de cuisine à l'instar de Marmiton ou 750g.

Problématique

Ma première mission est d'implémenter une fonctionnalité de recherche. En effet, beaucoup de sites offrent des recettes de cuisine et l'équipe a pensé que l'un des éléments pouvant faire la différence sur notre site est la fluidité du moteur de recherche. Ce qui est visé est quelque chose de très performant car les utilisateurs 
veulent une recherche rapide, quasi instantanée.

L'équipe du back-end n'étant pas encore formée, nous disposons uniquement d'un fichier JavaScript contenant un tableau JSON de 50 recettes.
Il faut commencer par implémenter l'interface du site puis développer les deux algorithmes, une version avec les boucles natives (while, for,...) et une version en programmation fonctionnelle avec les méthodes de l'objet array (foreach, filter,...).
L'implémentation des deux algorithmes doit se focaliser uniquement sur le champ de recherche principal.
Un algorigramme est à réaliser pour chaque version.

Algorithme 01

J'utilise la boucle "For" pour parcourir le tableau JSON. Comme première étape, une recherche est à lancer sur les parties titre, ingrédients et description de toutes les recettes. L'utilisateur pourra par la suite filtrer ce premier résulat à l'aide des filtres.

Algorithme 02

J'utilise "Filter" pour parcourir le tableau JSON. Comme première étape, une recherche est réalisée dans le titre, les ingrédients et la description. Si l'élément recherché est trouvé, le résulat est affiché. L'utilisateur pourra par la suite affiner sa recherche par l'utilisation des filtres.

Afin de choisir le meilleur algorithme à retenir, il faut tester les performances des deux. J'utilise JSBench.me.
Il faut ensuite ajouter les résultats à la fiche d'investigation de fonctionnalité et terminer par la recommandation de l'algorithme à garder.
