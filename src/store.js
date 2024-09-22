import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import recipeReducer from './recipeSlice';
import recipeSaga from './recipeSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        recipes: recipeReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(recipeSaga);

export default store;
