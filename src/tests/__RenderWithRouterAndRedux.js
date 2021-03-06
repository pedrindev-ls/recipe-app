import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createStore } from 'redux';
import reducer from '../redux/reducers';

/* function customRender(
  ui,
  route = '/',
) {
  const store = createStore(reducer);
  const history = createMemoryHistory({ initialEntries: [route] });
  return {
    ...render(
      <Provider store={ store }>
        <Router history={ history }>{ui}</Router>
      </Provider>,
    ),
    store,
    history,
  };
} */

const customRender = (
  component,
  route,
) => {
  const history = createMemoryHistory({ initialEntries: [route] });
  const store = createStore(reducer);

  // spread do retorno do render { getByTestId, getByRole, etc }
  return ({ ...render(
    <Router history={ history }>
      <Provider store={ store }>
        {component}
      </Provider>
    </Router>,
  ),

  // history usado acima
  history,

  // store usada acima
  store,
  });
};

export default customRender;
