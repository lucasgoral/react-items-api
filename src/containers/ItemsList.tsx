import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { SingleItem } from "../types/interfaces";
import { ADD_ITEMS } from "../actions/actions";



const mapDispatchToProps = (
  dispatch: (arg0: { type: string; items: SingleItem[] }) => any
) => {
  return {
    addItem: (items: SingleItem[]) =>
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
        addItem(json);
      })
      .then(() => {
        shouldLoadMore();
      });
  };
  const shouldLoadMore = () => {

    if (itemsListRef.current) {
      console.log(window.pageYOffset);
      console.log(itemsListRef.current.clientHeight);
      if (
        itemsListRef.current.clientHeight <=
        window.innerHeight + window.pageYOffset
      ) {
        loadMore();
      }
    }
  };

  useEffect(() => {
    // shouldLoadMore();
    window.addEventListener("scroll", () => {

      shouldLoadMore();
    });
    console.log(itemsList.items);
    if (itemsList.items.length === 0) {
      console.log('run should load more')
      shouldLoadMore();
    }

    // clean up
    return () => window.removeEventListener("scroll", shouldLoadMore);
  }, []);
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
