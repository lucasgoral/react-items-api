import { ADD_ITEMS } from "../actions/actions";
import { SingleItem } from "../types/interfaces";



console.log("test");
const itemsList = {
  offset: 0,
  items: []
};

const reducer = (
  state = itemsList,
  action: { type: string; items: SingleItem[] }
) => {
  switch (action.type) {
    case ADD_ITEMS:
      return {
        ...state,
        items: [...state.items, ...action.items],
        offset: state.offset + 1
      };

    default:
      return state;
  }
};

export default reducer;
