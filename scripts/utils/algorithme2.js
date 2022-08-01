const filteredRecipes = (recipes, query) => {
	if (result) {

		return result.filter((result) => {
			return (
				result.name.toLowerCase().includes(query) ||
				result.description.includes(query) ||
				result.ingredients.some((ingredient) => ingredient.ingredient.includes(query))
			);
			
		});

	} else {
	
		return recipes.filter((recipe) => {
			return (
				recipe.name.toLowerCase().includes(query) ||
				recipe.description.includes(query) ||
				recipe.ingredients.some((ingredient) => ingredient.ingredient.includes(query))
			);
				
		});
				
	}
};