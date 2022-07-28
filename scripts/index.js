let ingredients = [];
let apparatus = [];
let ustensils = [];
let resultFiltered;
const filterSelected = [];

const globalSearchBar = document.querySelector(".search-bar");
const recipesSection = document.querySelector(".recipes-section");

const ingredientArrow = document.querySelector(".ingredient-arow");
const ingredientForm = document.querySelector(".ingredient-dropdown");
const ingredientInput = document.querySelector(".ingredient-input");
const ingredientWrapper = document.querySelector(".ingredient-results");

const apparatusArrow = document.querySelector(".apparatus-arrow");
const apparatusForm = document.querySelector(".apparatus-dropdown");
const apparatusInput = document.querySelector(".apparatus-dropdown");
const apparatusWrapper = document.querySelector(".apparatus-results");

const ustensilArrow = document.querySelector(".ustensils-arrow");
const ustensilsForm = document.querySelector(".ustensils-dropdown");
const ustensilsInput = document.querySelector(".ustensils-dropdown");
const ustensilsWrapper = document.querySelector(".ustensils-results");


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
  displayInputs(recipes);
  inputSearch(recipes)
  filteredRecipes(recipes, globalSearchBar)

};
  
init();