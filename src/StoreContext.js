import React from 'react';
import recipeStore from './RecipeStore';

const StoreContext = React.createContext();

export const StoreProvider = ({ children }) => {
    return (
        <StoreContext.Provider value={{ recipeStore }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => React.useContext(StoreContext);
