import { ADD_ITEMS } from "../actions/Actions";

interface Item {
  id: number;
  title: string;
  description: string;
  img_url: string;
  price: number;
  status: string;
  created_at: string;
  discount: number;
  rating: number;
}

console.log("test");
const itemsList = {
  offset: 0,
  items: []
};

const reducer = (
  state = itemsList,
  action: { type: string; items: Item[] }
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
