const inputSearch = (recipes) => {

	searchBar.addEventListener("keyup", (e) => {

		if (e.target.value.length >= 3) {

			recipesSection.innerHTML = "";
			results = filteredRecipes(recipes, e.target.value);

		if (results.length === 0) {
				return recipesSection.innerHTML +=  `<div class="no-result"> 
				Aucune recette ne correspond à votre critère. Vous pouvez chercher autre chose comme « tarte aux pommes », « poisson », etc.
				</div>`
			} else {	
			recipesSection.innerHTML = "";
			createRecipesCard(results);
		}
	    } else if (result) {
		    recipesSection.innerHTML = "";
		    createRecipesCard(result);
	    } else {
		    recipesSection.innerHTML = "";
		    createRecipesCard(recipes);
	    }

})

}



