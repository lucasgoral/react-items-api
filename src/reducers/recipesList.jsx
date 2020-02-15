import { REMOVE_ITEM, ADD_ITEM, EDIT_ITEM } from "../actions/Actions";

const recipesList = [];

const reducer = (state = recipesList, action) => {
  switch (action.type) {
    case REMOVE_ITEM:
      return [...state].filter(item => item.key !== action.key);

    case ADD_ITEM:
      return [
        ...state,
        {
          title: action.title,
          key: action.key,
          ingredients: [...action.ingredients]
        }
      ];
    case EDIT_ITEM: {
      const index = state.findIndex(item => item.key === action.key);

      const newState = [...state];
      newState[index] = {
        title: action.title,
        key: action.key,
        ingredients: [...action.ingredients]
      };

      return newState;
    }

    default:
      return state;
  }
};

export default reducer;
