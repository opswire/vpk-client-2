import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Асинхронный thunk для загрузки рецептов
export const fetchRecipes = createAsyncThunk(
    'recipes/fetchRecipes',
    async () => {
      const response = await fetch('https://dummyjson.com/recipes');
      const data = await response.json();
      console.log('thunk: ', data)
      return data.recipes;
    }
);  

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
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchRecipes.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchRecipes.fulfilled, (state, action) => {
            state.loading = false;
            console.log('fulfilled action.payload: ', action.payload);
            state.recipes = action.payload;
          })
          .addCase(fetchRecipes.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
    },
})

export const { toggleFavorite, deleteRecipe, toggleShowFavorites, toggleShowIngredients, setPage }  = recipeSlice.actions

export default recipeSlice.reducer