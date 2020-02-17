import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { ADD_ITEMS } from "../actions/Actions";
import { Link } from "react-router-dom";

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

const mapDispatchToProps = (
  dispatch: (arg0: { type: string; items: Item[] }) => any
) => {
  return {
    addItem: (items: Item[]) =>
      dispatch({
        type: ADD_ITEMS,
        items
      })
  };
};

const mapStateToProps = (state: { itemsList: any }) => {
  const { itemsList } = state;
  return { itemsList };
};

const initialState: Item[] = [];

function ItemsList({ itemsList, addItem }: any) {
  const [offset, setOffset] = useState(0);
  const loadMore = () => {
    setOffset(offset + 1);
  };
  useEffect(() => {
    fetch(`http://127.0.0.1:4010/offers?limit=10&offset=${offset}`, {
      headers: new Headers({
        Authorization: "Bearer loremipsum"
      })
    })
      .then(response => {
        return response.status === 200 ? response.json() : [];
      })
      .then(json => {
        console.log(json);

        addItem(json);
      });
    return () => {};
  }, [offset]);

  return (
    <div>
      <ul>
        {itemsList.map(
          (item: {
            id: string | number | undefined;
            title: React.ReactNode;
          }) => {
            return (
              <li key={item.id}>
                <Link to={`/offer/${item.id}`}>
                  <b>Title:</b> {item.title}
                </Link>
              </li>
            );
          }
        )}
      </ul>
      {<button onClick={loadMore}>Load more</button>}

      {console.log(itemsList)}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
