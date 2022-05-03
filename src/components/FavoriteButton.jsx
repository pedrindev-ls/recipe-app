/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { handleCHangeFavoriteDrink,
  handleChangeFavoriteMeals,
  checkFavoriteDrinks,
  checkFavoriteMeals } from '../services/Helpers';

export default function FavoriteButton(props) {
  const { recipe } = props;
  const location = useLocation();
  const { pathname } = location;
  const [favorite, setFavorite] = useState(true);

  const handleChangeFavorite = () => {
    if (pathname.includes('/foods')) {
      handleChangeFavoriteMeals(recipe, favorite);
    } else if (pathname.includes('/drinks')) {
      handleCHangeFavoriteDrink(recipe, favorite);
    }

    if (favorite) return setFavorite(false);
    return setFavorite(true);
  };

  const checkFavorite = () => {
    if (pathname.includes('/foods')) {
      const checking = checkFavoriteMeals(recipe);
      setFavorite(!checking);
    } else if (pathname.includes('/drinks')) {
      const checking = checkFavoriteDrinks(recipe);
      setFavorite(!checking);
    }
  };

  useEffect(() => {
    checkFavorite();
  }, []);

  return (
    <button
      type="button"
      onClick={ handleChangeFavorite }
    >
      {favorite
        ? (
          <img
            data-testid="favorite-btn"
            src={ whiteHeartIcon }
            alt="favoritar"
          />
        )
        : (
          <img
            data-testid="favorite-btn"
            src={ blackHeartIcon }
            alt="favoritar"
          />
        )}
    </button>
  );
}

FavoriteButton.propTypes = {
  recipe: PropTypes.array,
}.isRequired;
