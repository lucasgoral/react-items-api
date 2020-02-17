import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReactDOM from "react-dom";
import "./sass/index.scss";
import * as serviceWorker from "./serviceWorker";
import rootReducer from "./reducers";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ItemsList from "./containers/ItemsList";
import ItemDetails from "./containers/ItemDetails";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={ItemsList} />
        <Route path="/offer/:id" component={ItemDetails} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
