import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchRecipesSuccess, fetchRecipesFailure } from './recipeSlice';

function* fetchRecipes() {
    try {
        const response = yield call(fetch, 'https://dummyjson.com/recipes');
        const data = yield response.json();
        yield put(fetchRecipesSuccess(data.recipes));
    } catch (error) {
        yield put(fetchRecipesFailure(error.message));
    }
}

function* recipeSaga() {
    yield takeLatest('recipes/fetchRecipesRequest', fetchRecipes);
}

export default recipeSaga;
