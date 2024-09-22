import { createSlice } from '@reduxjs/toolkit'

export const recipeSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: [],
        loading: false,
        error: null,
        showFavorites: false,
        currentPage: 1,
        recipesPerPage: 5,
    },
    reducers: {
        fetchRecipesRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchRecipesSuccess: (state, action) => {
            state.loading = false;
            state.recipes = action.payload;
        },
        fetchRecipesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        toggleFavorite: (state, action) => {
            const recipe = state.recipes.find((recipe) => recipe.id === action.payload)
            if (recipe) {
                recipe.isFavorite = !recipe.isFavorite
            }
        },
        deleteRecipe: (state, action) => {
            state.recipes = state.recipes.filter((recipe) => recipe.id !== action.payload)
        },
        toggleShowFavorites: (state) => {
            state.showFavorites = !state.showFavorites
        },
        toggleShowIngredients: (state, action) => {
            const recipe = state.recipes.find((recipe) => recipe.id === action.payload)
            if (recipe) {
                recipe.showIngredients = !recipe.showIngredients
            }
        },
        setPage: (state, action) => {
            state.currentPage = action.payload;
        }
    }
})

export const {
    fetchRecipesRequest,
    fetchRecipesSuccess,
    fetchRecipesFailure,
    toggleFavorite,
    deleteRecipe,
    toggleShowFavorites,
    toggleShowIngredients,
    setPage,
    toggleIngredients,
} = recipeSlice.actions;

export default recipeSlice.reducer