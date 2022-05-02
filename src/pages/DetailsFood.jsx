import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { recipeDispatch, saveDataDrink } from '../redux/actions';
import { requestDrinks, requestFoodRecipeById } from '../services/apiRequest';
import { NUMBER_SIX } from '../services/consts';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../css/footer.css';
import ButtonShare from '../components/ButtonShare';

export default function DetailsFood() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(true);

  const getRecipeById = async () => {
    const { meals } = await requestFoodRecipeById(id);
    setRecipe(meals[0]);
    setLoading(false);
    dispatch(recipeDispatch(meals[0]));
  };

  async function askApi() {
    const drinksList = await requestDrinks();
    dispatch(saveDataDrink(drinksList));
  }

  useEffect(() => {
    getRecipeById();
    askApi();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { drinks } = useSelector((state) => state.dataReducer.dataDrink);
  const ingredients = Object.keys(recipe)
    .filter((key) => key.includes('strIngredient'));
  const measure = Object.keys(recipe)
    .filter((key) => key.includes('strMeasure'));

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  const handleChangeFavorite = () => {
    if (favorite) return setFavorite(false);
    return setFavorite(true);
  };

  return (
    <div>
      {
        loading ? <p>Loading...</p> : (
          <div className="recipe-details">
            <img
              data-testid="recipe-photo"
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
            />
            <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
            <p data-testid="recipe-category">{recipe.strCategory}</p>
            {
              ingredients.map((ingredient, index) => (recipe[ingredient] !== ''
                && (
                  <p
                    key={ ingredient }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {`${recipe[ingredient]} - ${recipe[measure[index]]}`}
                  </p>
                )
              ))
            }
            <p data-testid="instructions">{recipe.strInstructions}</p>
            <video width="320" height="240" controls data-testid="video">
              <source src={ recipe.strYoutube } type="video/mp4" />
              <track
                src="captions_en.vtt"
                kind="captions"
                srcLang="en"
                label="english_captions"
              />
              Your browser does not support the video tag.
            </video>
            <div>
              <Slider { ...settings }>
                {
                  drinks && drinks.map((drink, index) => (
                    index < NUMBER_SIX && (
                      <div
                        data-testid={ `${index}-recomendation-card` }
                        key={ drink.idDrink }
                      >
                        <Link to={ `/drinks/${drink.idDrink}` }>
                          <img
                            data-testid={ `${index}-card-img` }
                            src={ drink.strDrinkThumb }
                            alt="recipes cards"
                          />
                          <p
                            data-testid={ `${index}-recomendation-title` }
                          >
                            {drink.strDrink}
                          </p>
                        </Link>
                      </div>
                    )))
                }
              </Slider>
            </div>
            <div>
              <ButtonShare />
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
            </div>
            <Link to={ `/foods/${recipe.idMeal}/in-progress` }>
              <button
                className="footer-fixed"
                type="button"
                data-testid="start-recipe-btn"
              >
                Start
              </button>
            </Link>
          </div>
        )
      }
    </div>
  );
}
