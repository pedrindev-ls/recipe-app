import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../css/Explore.css';
import Pedrin from '../images/Pedrin.png';
import { addCategorieFilter, saveDataDrink } from '../redux/actions';
import { requestExploreIngredientDrink, resquestByDrink } from '../services/apiRequest';
import { NUMBER_ELEVEN } from '../services/consts';

export default function ExploreDrinkByIngredient() {
  const [loading, setLoading] = useState(true);
  const { drinks } = useSelector((state) => state.dataReducer.dataDrink);
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();

  async function askApi() {
    const drinksList = await requestExploreIngredientDrink();
    dispatch(saveDataDrink(drinksList));
    setLoading(false);
    // setIngredient(drinksList);
  }

  useEffect(() => {
    askApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCick = async ({ target }) => {
    const { value } = target;
    if (pathname === '/explore/drinks/ingredients') {
      const drinksByCategorie = await resquestByDrink('ingredient', value);
      dispatch(saveDataDrink(drinksByCategorie));
      dispatch(addCategorieFilter(value));
    }
    history.push('/drinks');
  };

  return (
    <div className="container">
      <div className="explore-header">
        <Header />
        <Link to="/">
          <img src={ Pedrin } alt="logo" width="50px" />
        </Link>
        <span data-testid="page-title">Explore Ingredients</span>
      </div>
      <div
        data-testid="ingredient-container"
      >
        {
          loading ? <p>Loading...</p> : (
            <div className="ingredient">
              {
                drinks.map((drink, index) => (
                  index <= NUMBER_ELEVEN && (
                    <div
                      key={ index }
                      className="ingredient-container"

                    >
                      <img
                        data-testid={ `${index}-card-img` }
                        src={ `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Small.png` }
                        alt="recipes cards"
                      />

                      <p data-testid={ `${index}-card-name` }>
                        {drink.strIngredient1}

                      </p>
                      <button
                        type="button"
                        onClick={ handleCick }
                        value={ drink.strIngredient1 }
                        data-testid={ `${index}-ingredient-card` }
                        className="btn-ingredient"
                      >
                        {drink.strIngredient1}
                      </button>
                    </div>
                  )))
              }
            </div>
          )
        }
      </div>
      <Footer />
    </div>
  );
}
