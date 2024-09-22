import { useDispatch } from 'react-redux'
import { toggleFavorite, toggleShowIngredients, deleteRecipe } from '../recipeSlice';

const RecipeCard = ({ recipe }) => {
    const dispatch = useDispatch()

    const handleToggleShowIngredients = () => {
        dispatch(toggleShowIngredients(recipe.id))
    }

    const handleToggleFavorite = (e) => {
        e.stopPropagation()
        dispatch(toggleFavorite(recipe.id))
    }

    const handleDeleteRecipe = (e) => {
        e.stopPropagation()
        dispatch(deleteRecipe(recipe.id))
    }

    return (
        <div className={`recipe-card-container ${recipe.isFavorite ? 'favorite' : ''}`} onClick={handleToggleShowIngredients}>
            <img src={recipe.image} className='recipe-img' alt={recipe.name} />
            {recipe.showIngredients && (
                <h2 className='recipe-p'>{recipe.name}</h2>
            )}
            <div className="recipe-gradient"></div>

            <div className="recipe-actions">
                <button className="favorite-btn" onClick={handleToggleFavorite}>
                    {recipe.isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
                </button>
                <button className="delete-btn" onClick={handleDeleteRecipe}>Удалить рецепт</button>
            </div>

            {recipe.showIngredients && (
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
