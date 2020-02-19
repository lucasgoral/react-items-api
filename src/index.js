import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReactDOM from "react-dom";
import "./sass/index.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import thunk from "redux-thunk";
import * as serviceWorker from "./serviceWorker";
import ItemsList from "./containers/ItemsList";
import ItemDetails from "./containers/ItemDetails";
import rootReducer from './reducers/index'


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
