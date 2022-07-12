const getData = () =>
	fetch('./scripts/data/recipes.json') 
    .then(response => response.json()) 
    .then(data => { 
      return data;
    })

const createRecipesCard = (recipes) => {
    recipes.forEach((recipe) => {
      recipesSection.innerHTML += new RecipeCard(recipe).recipeCard;
    });
   
  };

  const init = async () => {
    
  const { recipes } = await getData();
    
  createRecipesCard(recipes)
  

};
  
init();
