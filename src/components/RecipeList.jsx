import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../StoreContext';
import RecipeCard from './RecipeCard';
import Pagination from '../helpers/Pagination';
import catAnimation from '../assets/cat.gif';

const RecipeList = observer(() => {
    const { recipeStore } = useStore();
    const { recipes, loading, error, showFavorites, currentPage, recipesPerPage } = recipeStore;

    useEffect(() => {
        recipeStore.fetchRecipes();
    }, [recipeStore]);

    const filteredRecipes = showFavorites ? recipes.filter(recipe => recipe.isFavorite) : recipes;
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    if (loading) {
        return <p>Загрузка рецептов...</p>;
    }

    if (error) {
        return <p>Ошибка при загрузке рецептов: {error}</p>;
    }

    return (
        <div>
            <h2 style={{ display: 'flex', alignItems: 'center' }}>
                Список рецептов:
                <img src={catAnimation} alt="Котик" style={{ width: '50px', marginLeft: '10px' }} />
            </h2>
            <button className="filter-btn" onClick={() => recipeStore.toggleShowFavorites()}>
                {showFavorites ? 'Показать все рецепты' : 'Показать только избранные'}
            </button>
            {currentRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
            <Pagination 
                totalRecipes={filteredRecipes.length} 
                recipesPerPage={recipesPerPage} 
                paginate={(pageNumber) => recipeStore.setPage(pageNumber)} 
                currentPage={currentPage} 
            />
        </div>
    );
});

export default RecipeList;
