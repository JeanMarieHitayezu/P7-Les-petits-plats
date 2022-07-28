
const initFilters = (recipes) => {

	recipes.forEach((recipe) => {
	  ingredients = [
	  ...new Set([...ingredients, ...recipe.ingredients.map((i) => i.ingredient)])].sort();
	  ustensils = [...new Set([...ustensils, ...recipe.ustensils.map((u) => u)])].sort();
	  apparatus = [...new Set([...apparatus, ...[recipe.appliance]])].sort();
	});
	return { ingredients, ustensils, apparatus };
};

const displayInputs = (recipes) => {
		
	let { ingredients, ustensils, apparatus } = initFilters(recipes);

	/* INGREDIENTS */

	function openCloseIngredients() {

		if(ingredientResult.style.display === 'grid') {
			ingredientResult.style.display = 'none'
			ingredientArrow.classList.replace("fa-chevron-up", "fa-chevron-down");
			ingredientInput.classList.remove("open");
		} else {
			ingredientResult.style.display = 'grid'
			ingredientArrow.classList.replace("fa-chevron-down", "fa-chevron-up");
			ingredientInput.classList.add("open");

			apparatusResult.style.display = 'none'
			apparatusArrow.classList.replace("fa-chevron-up", "fa-chevron-down");

			ustensilsResult.style.display = 'none'
			ustensilArrow.classList.replace("fa-chevron-up", "fa-chevron-down");			
		}

	}

     let filteredRecipe;

    ingredientArrow.addEventListener("click", () => {

	openCloseIngredients();
	ingredientResult.innerHTML = "";

	ingredients.forEach((ingredient) => {

		return ingredientResult.innerHTML += `<li class="ingredient-item">${ingredient}</li>`;		
	});

	if (result) {

		ingredients = result.map(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient))
		ingredients = [...new Set([].concat(...ingredients))].sort()

		filterSelected.forEach((selectedFilter) => {
   
			ingredients.splice(ingredients.indexOf(selectedFilter),1)			
		});

        ingredientResult.innerHTML = "";


		ingredients.forEach((ingredient) => {
   
			return ingredientResult.innerHTML += `<li class="ingredient-item">${ingredient}</li>`;			
		});

	  }
	  if (searchBar.value.length >= 3) {

		ingredients = results.map(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient))
		ingredients = [...new Set([].concat(...ingredients))].sort()

		ingredientResult.innerHTML = "";

		ingredients.forEach((ingredient) => {
   
			return ingredientResult.innerHTML += `<li class="ingredient-item">${ingredient}</li>`;			
		});

		if (result) {
			
			filteredRecipe = filteredRecipes(recipes, searchBar.value);
	
			ingredients = filteredRecipe.map(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient))
			ingredients = [...new Set([].concat(...ingredients))].sort()

			filterSelected.forEach((selectedFilter) => {
   
				ingredients.splice(ingredients.indexOf(selectedFilter),1)				
			});	
	
			ingredientResult.innerHTML = "";
	
			ingredients.forEach((ingredient) => {
	   
				return ingredientResult.innerHTML += `<li class="ingredient-item">${ingredient}</li>`;				
			});	
		}

	  } else if(searchBar.value.length <= 2 && result) {
		
		ingredients = result.map(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient))
		ingredients = [...new Set([].concat(...ingredients))].sort()

		filterSelected.forEach((selectedFilter) => {
   
			ingredients.splice(ingredients.indexOf(selectedFilter),1)						
		});

		ingredientResult.innerHTML = "";

		ingredients.forEach((ingredient) => {
   
			return ingredientResult.innerHTML += `<li class="ingredient-item">${ingredient}</li>`;			
		});
	  } else if(searchBar.value.length <= 2) {

		ingredients = recipes.map(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient))
		ingredients = [...new Set([].concat(...ingredients))].sort()

		ingredientResult.innerHTML = "";

		ingredients.forEach((ingredient) => {
   
			return ingredientResult.innerHTML += `<li class="ingredient-item">${ingredient}</li>`;			
		});
	  }

	displayIngredientItems();

    })

    ingredientInput.addEventListener("keyup", (e) => {

	    if (e.target.value.length >= 3) {

		ingredients = recipes.map(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient))
		ingredients = [...new Set([].concat(...ingredients))].sort()

		ingredientResult.innerHTML = '';

		const query = e.target.value;
		
		const results = ingredients.filter((ingredient) => {
			ingredientResult.style.display = 'none';
			return ingredient.toLowerCase().includes(query.toLowerCase());
		});
		
		results.forEach((result) => {
			ingredientResult.style.display = 'grid';
			apparatusResult.style.display = 'none';
			ustensilsResult.style.display = 'none';
			return ingredientResult.innerHTML += `<li class="ingredient-item">${result}</li>`;
		});

	    } else {
		    ingredientResult.style.display = 'none';
	    }
	    displayIngredientItems();
    })

    const displayIngredientItems = () => {
		const ingredientItem = document.querySelectorAll(".ingredient-item");
	
		ingredientItem.forEach((item) => {
			item.addEventListener("click", () => {
				filterSelected.push(item.textContent);
				const noduplicateFilter = [...new Set(filterSelected)];
				createbarFilters(noduplicateFilter, recipes);
				ingredientResult.style.display = "none"
				ingredientArrow.classList.replace("fa-chevron-up", "fa-chevron-down");
				ingredientInput.style.width = "100%";
	
				if (searchBar.value.length >= 3) {
					recipesSection.innerHTML = "";
					filteredResult = filteredRecipes(recipes, searchBar.value);
					createRecipesCard(filteredResult);
				}	
			});
		});
	};

}

function openCloseAppliance() {
	if(apparatusResult.style.display === 'grid') {
		apparatusResult.style.display = 'none'
		apparatusArrow.classList.replace("fa-chevron-up", "fa-chevron-down");
	} else {
		apparatusResult.style.display = 'grid'
		apparatusArrow.classList.replace("fa-chevron-down", "fa-chevron-up");

		ingredientResult.style.display = 'none'
		ingredientArrow.classList.replace("fa-chevron-up", "fa-chevron-down");
		ingredientInput.classList.remove("open");

		ustensilsResult.style.display = 'none'
		ustensilArrow.classList.replace("fa-chevron-up", "fa-chevron-down");
	}
}

apparatusArrow.addEventListener("click", () => {

openCloseAppliance()

apparatusResult.innerHTML = "";

apparatus.forEach((apparatus) => {
	
	return apparatusResult.innerHTML += `<li class="app-item">${apparatus}</li>`;		
});

	if (result) {

		apparatus = result.map(recipe => recipe.appliance)
		apparatus = [...new Set([].concat(...apparatus))].sort()

		selectedFilters.forEach((selectedFilter) => {

			apparatus.splice(apparatus.indexOf(selectedFilter),1)				
		});

		apparatusResult.innerHTML = "";

		apparatus.forEach((apparatus) => {
	
			return apparatusResult.innerHTML += `<li class="app-item">${apparatus}</li>`;				
		});	
	  }

	if (globalSearchBar.value.length >= 3) {

		apparatus = results.map(recipe => recipe.appliance)
		apparatus = [...new Set([].concat(...apparatus))].sort()

		apparatusResult.innerHTML = "";

		apparatus.forEach((apparatus) => {
   
			return apparatusResult.innerHTML += `<li class="app-item">${apparatus}</li>`;				
		});

	if (result) {
		
		filteredRecipe = filteredRecipes(recipes, globalSearchBar.value);

		apparatus = filteredRecipe.map(recipe => recipe.appliance)
		apparatus = [...new Set([].concat(...apparatus))].sort()

		selectedFilters.forEach((selectedFilter) => {

			apparatus.splice(apparatus.indexOf(selectedFilter),1)							
		});

		apparatusResult.innerHTML = "";

		apparatus.forEach((apparatus) => {
   
			return apparatusResult.innerHTML += `<li class="app-item">${apparatus}</li>`;				
		});	

	}

	  } else if(globalSearchBar.value.length <= 2 && result) {

		apparatus = result.map(recipe => recipe.appliance)
		apparatus = [...new Set([].concat(...apparatus))].sort()

		selectedFilters.forEach((selectedFilter) => {

			apparatus.splice(apparatus.indexOf(selectedFilter),1)						
		});

		apparatusResult.innerHTML = "";

		apparatus.forEach((apparatus) => {
   
			return apparatusResult.innerHTML += `<li class="app-item">${apparatus}</li>`;				
		});
		
	  } else if(globalSearchBar.value.length <= 2) {

		apparatus = recipes.map(recipe => recipe.appliance)
		apparatus = [...new Set([].concat(...apparatus))].sort()

		apparatusResult.innerHTML = "";

		apparatus.forEach((apparatus) => {
   
			return apparatusResult.innerHTML += `<li class="app-item">${apparatus}</li>`;				
		});
	  }

	displayApparatusItems();
})

apparatusInput.addEventListener("keyup", (e) => {

	if (e.target.value.length >= 3) {

		apparatus = recipes.map(recipe => recipe.appliance)
		apparatus = [...new Set([].concat(...apparatus))].sort()

		apparatusResult.innerHTML = '';

		const query = e.target.value;
		
		const results = apparatus.filter((apparatus) => {
			apparatusResult.style.display = 'none';
			ingredientInput.classList.remove("open");
			return apparatus.toLowerCase().includes(query.toLowerCase());
		});
		
		results.forEach((result) => {
			apparatusResult.style.display = 'grid';
			ustensilsResult.style.display = 'none';
			ingredientResult.style.display = 'none';
			return apparatusResult.innerHTML += `<li class="app-item">${result}</li>`;
		});

	} else {
		apparatusResult.style.display = 'none';
	}
	displayApparatusItems();
})

const displayApparatusItems = () => {
	const apparatusItems = document.querySelectorAll(".app-item");
	apparatusItems.forEach((item) => {
		item.addEventListener("click", () => {
			selectedFilters.push(item.textContent);
			const noduplicateFilter = [...new Set(selectedFilters)];
			createbarFilters(noduplicateFilter, recipes);
			apparatusResult.style.display = "none"
			apparatusArrow.classList.replace("fa-chevron-up", "fa-chevron-down");

			if (globalSearchBar.value.length >= 3) {
				recipesSection.innerHTML = "";
				resultFiltered = filteredRecipes(recipes, globalSearchBar.value);
				createRecipesCard(resultFiltered);
			}	
		});
	});
};