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

    //  S'IL Y A UN FILTRE, TRIER LA LISTE EN FONCTION DU FILTRE SÉLECTIONNÉ
	if (result) {

		ingredients = result.map(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient))
		ingredients = [...new Set([].concat(...ingredients))].sort()

        // ENLEVER L,ÉLÉMENT CLIQUÉ

		filterSelected.forEach((selectedFilter) => {
   
			ingredients.splice(ingredients.indexOf(selectedFilter),1)			
		});

        ingredientResult.innerHTML = "";


		ingredients.forEach((ingredient) => {
   
			return ingredientResult.innerHTML += `<li class="ingredient-item">${ingredient}</li>`;			
		});

	  }

	  // S'IL Y A AU MOINS TROIS CARACTÈRES, TRIER LA LISTE
	  if (searchBar.value.length >= 3) {

		ingredients = results.map(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient))
		ingredients = [...new Set([].concat(...ingredients))].sort()

		ingredientResult.innerHTML = "";

		ingredients.forEach((ingredient) => {
   
			return ingredientResult.innerHTML += `<li class="ingredient-item">${ingredient}</li>`;			
		});
        
		// S'IL Y A AU MOINS TROIS CARACTÈRES ET UN FILTRE, TRIER LES INGRÉDIENTS EN FONCTION DES RECETTES
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

		// S'IL Y A MOINS DE TROIS CARACTÈRES MAIS QU'IL Y A UN FILTRE, AFFICHER LA LISTE EN FONCTION DU FILTRE 

	  } else if(searchBar.value.length <= 2 && result) {
		
		ingredients = result.map(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient))
		ingredients = [...new Set([].concat(...ingredients))].sort()
        
		// ENLEVER DE LA LISTE L'INGRÉDIENT CLIQUÉ
		filterSelected.forEach((selectedFilter) => {
   
			ingredients.splice(ingredients.indexOf(selectedFilter),1)						
		});

		ingredientResult.innerHTML = "";

		ingredients.forEach((ingredient) => {
   
			return ingredientResult.innerHTML += `<li class="ingredient-item">${ingredient}</li>`;			
		});

		// SI MOINS DE TROIS CARACTÈRES, METTRE LA LISTE ORIGINALE
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
				barFilterMgt(noduplicateFilter, recipes);
				ingredientResult.style.display = "none"
				ingredientArrow.classList.replace("fa-chevron-up", "fa-chevron-down");
				ingredientInput.style.width = "100%";
	            
               // REFILTRER LA BARRE DE RECHERCHE
				if (searchBar.value.length >= 3) {
					recipesSection.innerHTML = "";
					filteredResult = filteredRecipes(recipes, searchBar.value);
					createRecipesCard(filteredResult);
				}	
			});
		});
	};

	/* APPARATUS */

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
	    
	    // S'IL Y A UN FILTRE, TRIER LA LISTE EN FONCTION DE CELUI-CI

		if (result) {
	
			apparatus = result.map(recipe => recipe.appliance)
			apparatus = [...new Set([].concat(...apparatus))].sort()
            
			// ENLEVER L'ÉLÉMENT CLIQUÉ
			filterSelected.forEach((selectedFilter) => {
   
				apparatus.splice(apparatus.indexOf(selectedFilter),1)				
			});
	
			apparatusResult.innerHTML = "";
	
			apparatus.forEach((apparatus) => {
		
				return apparatusResult.innerHTML += `<li class="app-item">${apparatus}</li>`;				
			});	
		  }
          
		  // S'IL Y A AU MOINS TROIS CARACTÈRES, TRIER LA LISTE
		if (searchBar.value.length >= 3) {

			apparatus = results.map(recipe => recipe.appliance)
			apparatus = [...new Set([].concat(...apparatus))].sort()
	
			apparatusResult.innerHTML = "";
	
			apparatus.forEach((apparatus) => {
	   
				return apparatusResult.innerHTML += `<li class="app-item">${apparatus}</li>`;				
			});

			// S'IL Y A AU MOINS TROIS CARACTÈRES ET UN FILTRE, TRIER LES APPLIANCES EN FONCTION DES RECETTES

		if (result) {
			
			filteredRecipe = filteredRecipes(recipes, searchBar.value);
	
			apparatus = filteredRecipe.map(recipe => recipe.appliance)
			apparatus = [...new Set([].concat(...apparatus))].sort()
            
			// ENLEVER L'ÉLÉMENT CLIQUÉ
			filterSelected.forEach((selectedFilter) => {
   
				apparatus.splice(apparatus.indexOf(selectedFilter),1)							
			});
	
			apparatusResult.innerHTML = "";
	
			apparatus.forEach((apparatus) => {
	   
				return apparatusResult.innerHTML += `<li class="app-item">${apparatus}</li>`;				
			});	
	
		}
		  
		// S'IL Y A MOINS DE TROIS CARCTÈRES MAIS UN FILTRE, AFFICHER LA LISTE EN FONCTION DU FILTRE
		  } else if(searchBar.value.length <= 2 && result) {

			apparatus = result.map(recipe => recipe.appliance)
			apparatus = [...new Set([].concat(...apparatus))].sort()
            
			// ENLEVER DE LA LISTE L'INGRÉDIENT CLIQUÉ
			filterSelected.forEach((selectedFilter) => {
   
				apparatus.splice(apparatus.indexOf(selectedFilter),1)						
			});
	
			apparatusResult.innerHTML = "";
	
			apparatus.forEach((apparatus) => {
	   
				return apparatusResult.innerHTML += `<li class="app-item">${apparatus}</li>`;				
			});
			
			// S'IL Y A MOINS DE TROIS CARACTÈRES, METTRE LA LISTE ORIGINALE
		  } else if(searchBar.value.length <= 2) {
	
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
				filterSelected.push(item.textContent);
				const noduplicateFilter = [...new Set(filterSelected)];
				barFilterMgt(noduplicateFilter, recipes);
				apparatusResult.style.display = "none"
				apparatusArrow.classList.replace("fa-chevron-up", "fa-chevron-down");
	             
                // REFILTRER LA BARRE DE RECHERCHE
				if (searchBar.value.length >= 3) {
					recipesSection.innerHTML = "";
					filteredResult = filteredRecipes(recipes, searchBar.value);
					createRecipesCard(filteredResult);
				}	
			});
		});
	};
	
	function openCloseUstensils() {
		if(ustensilsResult.style.display === 'grid') {
			ustensilsResult.style.display = 'none'
			ustensilArrow.classList.replace("fa-chevron-up", "fa-chevron-down");
		} else {
			ustensilsResult.style.display = 'grid'
			ustensilArrow.classList.replace("fa-chevron-down", "fa-chevron-up");
	
			ingredientResult.style.display = 'none'
			ingredientArrow.classList.replace("fa-chevron-up", "fa-chevron-down");
			ingredientInput.classList.remove("open");
	
			apparatusResult.style.display = 'none'
			apparatusArrow.classList.replace("fa-chevron-up", "fa-chevron-down");
		}
	
	}
	
	ustensilArrow.addEventListener("click", () => {
	
		openCloseUstensils()
	
		ustensilsResult.innerHTML = "";
	
		ustensils.forEach((ustensil) => {
			
			return ustensilsResult.innerHTML += `<li class="ustensil-item">${ustensil}</li>`;		
		});

		// S'IL Y A UN FILTRE, TRIER LA LISTE EN FONCTION DE CELUI-CI
		if (result) {
		
			ustensils = result.map(recipe => recipe.ustensils.map(ustensil => ustensil))
			ustensils = [...new Set([].concat(...ustensils))]
	        
			// ENLEVER L'ÉLÉMENT CLIQUÉ
			filterSelected.forEach((selectedFilter) => {
	   
				ustensils.splice(ustensils.indexOf(selectedFilter),1)				
			});
		
			ustensilsResult.innerHTML = "";
		
			ustensils.forEach((ustensil) => {
			
				return ustensilsResult.innerHTML += `<li class="ustensil-item">${ustensil}</li>`;				
			});	
		}
	     
		// S'IL Y A AU MOINS TROIS CARACTÈRES, TRIER LA LISTE
		if (searchBar.value.length >= 3) {
			ustensils = results.map(recipe => recipe.ustensils.map(ustensil => ustensil))
			ustensils = [...new Set([].concat(...ustensils))].sort();
			
			ustensilsResult.innerHTML = "";
			
			ustensils.forEach((ustensil) => {
						
				return ustensilsResult.innerHTML += `<li class="ustensil-item">${ustensil}</li>`;					
			});

	        // S'IL Y A AU MOINS TROIS CARCTÈRES ET UN FILTRE, TRIER LES USTENSILS EN FONCTION DES RECETTES
			if (result) {
				
				filteredRecipe = filteredRecipes(recipes, searchBar.value);
		
				ustensils = filteredRecipe.map(recipe => recipe.ustensils.map(ustensil => ustensil))
				ustensils = [...new Set([].concat(...ustensils))].sort();
	            
				// ENLEVER L'ÈLÈMENT CLIQUÈ
				filterSelected.forEach((selectedFilter) => {
	   
				    ustensils.splice(ustensils.indexOf(selectedFilter),1)				
				});
		
				ustensilsResult.innerHTML = "";
		
				ustensils.forEach((ustensil) => {
						
					return ustensilsResult.innerHTML += `<li class="ustensil-item">${ustensil}</li>`;					
				});	
		
			}

			// SI MOINS DE TROIS CARACTÈRES MAIS UN FILTRE, AFFICHER LA LISTE EN FONCTION DU FILTRE
			} else if(searchBar.value.length <= 2 && result) {
					
				ustensils = result.map(recipe => recipe.ustensils.map(ustensil => ustensil))
				ustensils = [...new Set([].concat(...ustensils))].sort();
	            
				// ENLEVER L'ÉLÉMENT CLIQUÉ
				filterSelected.forEach((selectedFilter) => {
	   
					ustensils.splice(ustensils.indexOf(selectedFilter),1)
							
				});
			
				ustensilsResult.innerHTML = "";
			
				ustensils.forEach((ustensil) => {
			   
					return ustensilsResult.innerHTML += `<li class="ustensil-item">${ustensil}</li>`;
						
				});
				
				// S'IL Y A MOINS DE TROIS CARACTÈRES, METTRE LA LISTE ORIGINALE
				} else if(searchBar.value.length <= 2) {
			
					ustensils = recipes.map(recipe => recipe.ustensils.map(ustensil => ustensil))
					ustensils = [...new Set([].concat(...ustensils))].sort();
			
					ustensilsResult.innerHTML = "";
			
					ustensils.forEach((ustensil) => {
			   
						return ustensilsResult.innerHTML += `<li class="ustensil-item">${ustensil}</li>`;
						
					});
				}
	
			    
	
		displayUstensilItems();
	})
	
	ustensilsInput.addEventListener("keyup", (e) => {
	
		if (e.target.value.length >= 3) {
	
			ustensils = recipes.map(recipe => recipe.ustensils.map(ustensil => ustensil))
			ustensils = [...new Set([].concat(...ustensils))].sort();
	
			ustensilsResult.innerHTML = '';
	
			const query = e.target.value;
			
			const results = ustensils.filter((ustensil) => {
				ustensilsResult.style.display = 'none';
				ingredientInput.classList.remove("open");
				return ustensil.toLowerCase().includes(query.toLowerCase());
			});
			
			results.forEach((result) => {
				ustensilsResult.style.display = 'grid';
				apparatusResult.style.display = 'none';
				ingredientResult.style.display = 'none';
				return ustensilsResult.innerHTML += `<li class="ustensil-item">${result}</li>`;
			});
	
		} else {
			ustensilsResult.style.display = 'none';
		}
		displayUstensilItems();
	})
	
	const displayUstensilItems = () => {
		const ustensilsItems = document.querySelectorAll(".ustensil-item");
		ustensilsItems.forEach((item) => {
			item.addEventListener("click", () => {
				filterSelected.push(item.textContent);
				const noduplicateFilter = [...new Set(filterSelected)];
				barFilterMgt(noduplicateFilter, recipes);
				ustensilsResult.style.display = "none"
				ustensilArrow.classList.replace("fa-chevron-up", "fa-chevron-down");
	            
				// REFILTRER LA BARRE DE RECHERCHE
				if (searchBar.value.length >= 3) {
					recipesSection.innerHTML = "";
					filteredResult = filteredRecipes(recipes, searchBar.value);
					createRecipesCard(filteredResult);
				}				
			});
		});
	};
}

