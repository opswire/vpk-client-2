import { makeAutoObservable } from 'mobx';

class RecipeStore {
    recipes = [];
    loading = false;
    error = null;
    showFavorites = false;
    currentPage = 1;
    recipesPerPage = 5;
    ingredientVisibility = {};

    constructor() {
        makeAutoObservable(this);
    }

    async fetchRecipes() {
        this.loading = true;
        try {
            const response = await fetch('https://dummyjson.com/recipes');
            const data = await response.json();
            this.recipes = data.recipes;
        } catch (error) {
            this.error = error.message;
        } finally {
            this.loading = false;
        }
    }

    toggleFavorite(id) {
        const recipe = this.recipes.find((recipe) => recipe.id === id);
        if (recipe) {
            recipe.isFavorite = !recipe.isFavorite;
        }
    }

    deleteRecipe(id) {
        this.recipes = this.recipes.filter((recipe) => recipe.id !== id);
    }

    toggleShowFavorites() {
        this.showFavorites = !this.showFavorites;
        this.currentPage = 1;
    }

    setPage(pageNumber) {
        this.currentPage = pageNumber;
    }

    toggleIngredients(id) {
        this.ingredientVisibility[id] = !this.ingredientVisibility[id];
    }
}

const recipeStore = new RecipeStore();
export default recipeStore;
