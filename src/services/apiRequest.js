import { NUMBER_ONE } from './consts';

export async function request(URL) {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

export async function resquestByMeal(searchMethod, searchValue) {
  let URL = '';
  if (searchMethod === 'name') {
    URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
  }
  if (searchMethod === 'ingredient') {
    URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchValue}`;
  }
  if (searchMethod === 'firstLetter') {
    const alert = 'Your search must have only 1 (one) character';
    if (searchValue.length > NUMBER_ONE) {
      global.alert(alert);
    } else {
      URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchValue}`;
    }
  }
  const data = await request(URL);
  return data;
}

export async function resquestByDrink(searchMethod, searchValue) {
  let URL = '';
  if (searchMethod === 'name') {
    URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`;
  }
  if (searchMethod === 'ingredient') {
    URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchValue}`;
  }
  if (searchMethod === 'firstLetter') {
    const alert = 'Your search must have only 1 (one) character';
    if (searchValue.length > NUMBER_ONE) {
      global.alert(alert);
    } else {
      URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchValue}`;
    }
  }
  const data = await request(URL);
  return data;
}

export async function requestRandomByFood() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const data = await response.json();
  return data;
}

export async function requestRandomByDrink() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const data = await response.json();
  return data;
}

export async function requestMeal() {
  const mealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(mealsUrl);
  const data = await response.json();
  return data;
}
export async function requestDrinks() {
  const mealsUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(mealsUrl);
  const data = await response.json();
  return data;
}

export async function requestFoodRecipeById(id) {
  const mealsUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(mealsUrl);
  const data = await response.json();
  return data;
}

export async function requestMealsCategories() {
  const mealsCategories = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(mealsCategories);
  const data = await response.json();
  return data;
}

export async function requestDrinkRecipeById(id) {
  const mealsUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(mealsUrl);
  const data = await response.json();
  return data;
}
export async function requestDrinksCategories() {
  const drinkCategories = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(drinkCategories);
  const data = await response.json();
  return data;
}

export async function requestMealsByCategory(categorie) {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

export async function requestDrinksByCategories(categorie) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categorie}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}
