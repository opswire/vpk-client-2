import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../StoreContext';

const RecipeCard = observer(({ recipe }) => {
    const { recipeStore } = useStore();
    const showIngredients = recipeStore.ingredientVisibility[recipe.id];

    const handleToggleShowIngredients = () => {
        recipeStore.toggleIngredients(recipe.id);
    };

    const handleToggleFavorite = (e) => {
        e.stopPropagation();
        recipeStore.toggleFavorite(recipe.id);
    };

    const handleDeleteRecipe = (e) => {
        e.stopPropagation();
        recipeStore.deleteRecipe(recipe.id);
    };

    return (
        <div className={`recipe-card-container ${recipe.isFavorite ? 'favorite' : ''}`} onClick={handleToggleShowIngredients}>
            <img src={recipe.image} className='recipe-img' alt={recipe.name} />
            {showIngredients && (
                <h2 className='recipe-p'>{recipe.name}</h2>
            )}
            <div className="recipe-gradient"></div>

            <div className="recipe-actions">
                <button className="favorite-btn" onClick={handleToggleFavorite}>
                    {recipe.isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
                </button>
                <button className="delete-btn" onClick={handleDeleteRecipe}>Удалить рецепт</button>
            </div>

            {showIngredients && (
                <div className="ingredients-list">
                    <h3>Ингредиенты:</h3>
                    <ul>
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
});

export default RecipeCard;
