const filteredRecipes = (recipes, query) => {

	const results = [];
    
	    if (result) {
		
		for (let i = 0; i < result.length; i++) {

			const { name, description, ingredients } = result[i];
			if (name.toLowerCase().includes(query) || description.toLowerCase().includes(query) ) {
				results.push(result[i]);
				continue;
			}

			for (let i = 0; i < ingredients.length; i++) {
				if (ingredients[i].ingredient.toLowerCase().includes(query)) {
					results.push(result[i]);
					break;
				}
			}
        }
		return results;

	    } else if(results) {

			for (let i = 0; i < recipes.length; i++) {

				const { name, description, ingredients } = recipes[i];

				if (name.toLowerCase().includes(query) || description.toLowerCase().includes(query) ) {
					results.push(recipes[i]);
					continue;
				}

				for (let i = 0; i < ingredients.length; i++) {
					if (ingredients[i].ingredient.toLowerCase().includes(query)) {
						results.push(recipes[i]);
						break;
					}
				}

			}
			return results;

		}
};

