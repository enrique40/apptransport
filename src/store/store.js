import { createStore, combineReducers, compose } from 'redux';
import pruebaRedux from '../reducers/pruebaRedux';
import { UsereducerPros } from '../reducers/UsereducerPros';

const reducers = combineReducers({
	dtprops: pruebaRedux
})


const enhancers = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

export const store = createStore(
		reducers,
		enhancers
	);