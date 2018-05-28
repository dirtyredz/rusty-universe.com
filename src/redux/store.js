import { createStore, compose } from 'redux'

import rootReducer from './rootReducer'

const defaultState = {
  volume: {
    Muted: false
  },
}

const enhancers = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
)

const store = createStore(
    rootReducer,
    defaultState,
    enhancers
);

export default store