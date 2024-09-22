import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecipeCard from './RecipeCard';
import Pagination from '../helpers/Pagination';
import catAnimation from '../assets/cat.gif';
import { fetchRecipes, toggleShowFavorites, setPage } from '../recipeSlice';

const RecipeList = () => {
    const dispatch = useDispatch()
    const { 
        recipes,
        loading, 
        error, 
        showFavorites, 
        currentPage, 
        recipesPerPage,
    } = useSelector(state => state.recipes)
    
    const filteredRecipes = showFavorites ? recipes.filter(recipe => recipe.isFavorite) : recipes;
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const handlePageChange = (pageNumber) => {
        dispatch(setPage(pageNumber));
    };

    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch])

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
                <img src={catAnimation} alt="Кот" style={{ width: '50px', marginLeft: '10px' }} />
            </h2>
            <button className="filter-btn" onClick={() => dispatch(toggleShowFavorites())}>
                {showFavorites ? 'Показать все рецепты' : 'Показать только избранные'}
            </button>
            {currentRecipes.map((recipe) => (
                <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe}
                />
            ))}
           <Pagination 
                totalRecipes={filteredRecipes.length} 
                recipesPerPage={recipesPerPage} 
                paginate={handlePageChange}
                currentPage={currentPage}
            />
        </div>
    );
}

export default RecipeList;