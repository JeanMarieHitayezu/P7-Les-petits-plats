const barFilterMgt = (noduplicateFilter, recipes) => {
	
	barFilters.innerHTML = "";
	noduplicateFilter.forEach((filter) => {

		return barFilters.innerHTML += `<div class="filter-query">${filter}<i class="fal fa-times-circle filter-icon"></i></div>`

	});
	searchOnFilters(recipes, noduplicateFilter);
};

let result;

const searchOnFilters = (recipes) => {
	const filterQuery = document.querySelectorAll(".filter-query");
	const filters = Array.from(filterQuery);
	result = recipes.filter((recipe) => {
		return filters.every((item) => {
			const formatedItem = item.textContent.toLowerCase();
			return (
				recipe.ingredients.some((i) => {
					return i.ingredient.toLowerCase().includes(formatedItem);
				}) ||
				recipe.appliance.toLowerCase().includes(formatedItem) ||
				recipe.ustensils.some((ustensil) => {
					return ustensil.toLowerCase() === formatedItem;				
				})
			);
		});
	});

	if (result.length) {
		recipesSection.innerHTML = "";
		createRecipesCard(result);
		displayBarFilter(filters, recipes);
		
	} else if (!result.length) {
		displayBarFilter(filters, recipes);
		recipesSection.innerHTML = "";
		return recipesSection.innerHTML += `<div class="no-result">Aucune recette ne correspond à votre critères, merci de réessayer avec d'autres critères.</div>`;
	}
};

let otherFilteredRecipes;

const displayBarFilter = (filters, recipes) => {
	filters.forEach((filter) => {
		filter.addEventListener("click", () => {
		removeFilter(filter, filters, recipes);

		//Quand on enlève un filtre, on affiche les resultats de la barre de recherche si il y en a une
		if (searchBar.value.length >= 3) {
		
			otherFilteredRecipes = filteredRecipes(recipes, searchBar.value);
			recipesSection.innerHTML = "";
			createRecipesCard(otherFilteredRecipes);

			}
		});
	});
};

const removeFilter = (selectedFilter, arrayFiltered, recipes) => {
	
	selectedFilter.remove();
	filterSelected.splice(filterSelected.indexOf(selectedFilter.textContent),1)

	if (!arrayFiltered.length) {
		recipesSection.innerHTML = "";
		createRecipesCard(recipes);
	} else {
		searchOnFilters(recipes, arrayFiltered);
	}
};

let results;