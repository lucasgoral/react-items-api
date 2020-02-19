import { combineReducers } from "redux";
import itemsList from "./itemsList";
import scrollPos from './scrollPos'

export default combineReducers({
  itemsList, scrollPos
});
