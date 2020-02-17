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
const itemsList: Item[] = [
  // {
  //   id: 1,
  //   title: "title 1",
  //   description: "lorem",
  //   img_url: "gfhfgh",
  //   price: 12,
  //   status: "published",
  //   created_at: "3123",
  //   discount: 123,
  //   rating: 34
  // },
  // {
  //   id: 2,
  //   title: "title 2",
  //   description: "lorem",
  //   img_url: "gfhfgh",
  //   price: 12,
  //   status: "published",
  //   created_at: "3123",
  //   discount: 123,
  //   rating: 34
  // }
];

const reducer = (
  state = itemsList,
  action: { type: string; items: Item[] }
) => {
  switch (action.type) {
    case ADD_ITEMS:
      return [...state, ...action.items];

    default:
      return state;
  }
};

export default reducer;
