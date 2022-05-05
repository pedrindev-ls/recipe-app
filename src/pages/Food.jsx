/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Searchheader from '../components/SearchHeader';
import '../css/food.css';
import { saveDataFood } from '../redux/actions';
import { requestMeal } from '../services/apiRequest';
import { NUMBER_ELEVEN } from '../services/consts';

export default function Food() {
  const { meals } = useSelector((state) => state.dataReducer.dataFood);
  const dispatch = useDispatch();

  async function askApi() {
    const mealsList = await requestMeal();
    dispatch(saveDataFood(mealsList));
  }

  useEffect(() => {
    askApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-page">
      <div className="header-title">
        <Header />
        <span data-testid="page-title">Foods</span>
        <Searchheader />
      </div>
      {
        meals && meals.map((meal, index) => (
          index <= NUMBER_ELEVEN && (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ meal.idMeal }
              className="card-recipe"
            >
              <Link to={ `/foods/${meal.idMeal}` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ meal.strMealThumb }
                  alt="recipes cards"
                  className="card-img"
                />
                <p
                  data-testid={ `${index}-card-name` }
                  className="card-name"
                >
                  {meal.strMeal}

                </p>
              </Link>
            </div>
          )))
      }
      <Footer />
    </div>
  );
}
