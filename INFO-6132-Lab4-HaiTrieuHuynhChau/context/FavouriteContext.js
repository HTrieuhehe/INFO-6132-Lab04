import { createContext, useContext, useState } from "react";

const FavouriteContext = createContext();

export const FavouriteProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const addFavourite = (event) => {
    //avoid dup
    if (!favourites.some((e) => e.id === event.id)) {
      setFavourites([...favourites, event]);
    }
  };

  const removeFavourite = (id) => {
    setFavourites(favourites.filter((item) => item.id !== id));
  };

  const clearAll = () => {
    setFavourites([]);
  };

  return (
    <FavouriteContext.Provider
      value={{ favourites, addFavourite, removeFavourite, clearAll }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouriteContext);
