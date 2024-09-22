import { useState } from 'react';
import './RecipeCard.css';

const RecipeCard = ({recipe, onDelete, onFavorite}) => {
    const [showIngredients, setShowIngredients] = useState(false);

    const toggleIngredients = (e) => {
        if (e.target.classList.contains('favorite-btn')) return;
        setShowIngredients(!showIngredients);
    };

    return (
        <div className={`recipe-card-container ${recipe.isFavorite ? 'favorite' : ''}`} onClick={toggleIngredients}>
            <img src={recipe.image} className='recipe-img' alt={recipe.name} />
            {showIngredients && (
                <h2 className='recipe-p'>{recipe.name}</h2>
            )}
            <div className="recipe-gradient"></div>

            <div className="recipe-actions">
                <button className="favorite-btn" onClick={(e) => { e.stopPropagation(); onFavorite(recipe.id); }}>
                    {recipe.isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
                </button>
                <button className="delete-btn" onClick={(e) => { e.stopPropagation(); onDelete(recipe.id); }}>Удалить рецепт</button>
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
}

export default RecipeCard;
