import { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import Pagination from '../helpers/Pagination';
import catAnimation from '../assets/cat.gif'; // Путь к вашему изображению

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [showFavorites, setShowFavorites] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(5);

    const handleDelete = (id) => {
        setRecipes(recipes.filter(recipe => recipe.id !== id));
    };

    const handleFavorite = (id) => {
        console.log(`Рецепт с id ${id} добавлен/убран из избранного`);
        setRecipes(
            recipes.map((recipe) =>
                recipe.id === id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
            )
        );
    };

    const filteredRecipes = showFavorites ? recipes.filter(recipe => recipe.isFavorite) : recipes;

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        setCurrentPage(1);
    }, [showFavorites]);

    useEffect(() => {
        fetch('https://dummyjson.com/recipes')
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                setRecipes(data.recipes);
            })
            .catch((error) => {
                console.error('Error fetching recipes:', error);
            });
    }, []);

    return (
        <div>
            <h2 style={{ display: 'flex', alignItems: 'center' }}>
                Список рецептов: 
                <img src={catAnimation} alt="Котик" style={{ width: '50px', marginLeft: '10px' }} />
            </h2>
            <button className="filter-btn" onClick={() => setShowFavorites(!showFavorites)}>
                {showFavorites ? 'Показать все рецепты' : 'Показать только избранные'}
            </button>
            {currentRecipes.map((recipe) => (
                <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe}
                    onDelete={handleDelete}
                    onFavorite={handleFavorite}
                />
            ))}
            <Pagination 
                totalRecipes={filteredRecipes.length} 
                recipesPerPage={recipesPerPage} 
                paginate={paginate} 
            />
        </div>
    );
}

export default RecipeList;