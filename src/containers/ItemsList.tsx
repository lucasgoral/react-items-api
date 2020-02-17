import React, { useState, useEffect, useRef } from "react";
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
  const itemsListRef = useRef<HTMLDivElement>(null);
  const loadMore = () => {
    fetch(`http://127.0.0.1:4010/offers?limit=10&offset=${itemsList.offset}`, {
      headers: new Headers({
        Authorization: "Bearer loremipsum"
      })
    })
      .then(response => {
        return response.status === 200 ? response.json() : [];
      })
      .then(json => {
        console.log(json);
        if (itemsListRef.current) {
          console.log(window.innerHeight);
          console.log(itemsListRef.current.clientHeight);
          if (itemsListRef.current.clientHeight < window.innerHeight) {
            addItem(json);
          }
        }
      })
      .then(() => {
        if (itemsListRef.current) {
          console.log(window.innerHeight);
          console.log(itemsListRef.current.clientHeight);
          if (itemsListRef.current.clientHeight < window.innerHeight) {
            loadMore();
          }
        }
      });
  };

  return (
    <div>
      <div ref={itemsListRef}>
        <ul>
          {itemsList.items.map(
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
      </div>
      {<button onClick={loadMore}>Load more</button>}

      {console.log(itemsList)}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
