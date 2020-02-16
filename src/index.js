import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import ReactDOM from "react-dom";
import "./sass/index.scss";
import * as serviceWorker from "./serviceWorker";
import rootReducer from "./reducers";
import { loadState, saveState } from "./utils/localStorage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ItemsList from "./containers/ItemsList";
import ItemDetails from "./containers/ItemDetails";

const persistedState = loadState();
const store = createStore(rootReducer, persistedState);
store.subscribe(() => {
  saveState({
    recipesList: store.getState().recipesList
  });
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={ItemsList} />
        <Route path="/offer" component={ItemDetails} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
