class RecipeCard {
	constructor(data) {
		this._id = data.id;
		this._name = data.name;
		this._description = data.description;
		this._time = data.time;
		this._servings = data.servings;
		this._ustensils = data.ustensils;
		this._ingredients = data.ingredients;
		this._appliance = data.appliance;
	}

	get recipeCard() {

	const card =  `
		<article class="recipe">
		
			<div class="recipe-img"></div>
			
			<section class="recipe-section">
			
			<header class="recipe-header"> 
			
			<h2 class="recipe-title">${this._name}</h2>
			<h2 class="recipe-time">
			${this._time}min <i class="fal fa-clock recipe-icon"></i>
			</h2>
			
			</header>

			<div class="recipe-aside"> 

			<ul class="recipe-list">

			    ${						
				    this._ingredients.map((ingredient) => {
				        return `<li class="recipe-item"><strong>${ingredient.ingredient}</strong>
				        ${ingredient.quantity ? ingredient.quantity : ""}
				        ${ingredient.unit ? ingredient.unit : ""}
				        </li>`
			        }).join('')
		        }
			</ul>

			<p class="recipe-description">${this._description}</p>

			</div>
			
			</section>

		</article>

		`
		return card;
		
	}
	
}