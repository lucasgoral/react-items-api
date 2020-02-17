import React, { useState, useEffect } from "react";

export default function ItemDetails({ history, match }: any) {
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
  const initialState: Item[] = [];

  const [state, setState] = useState(initialState);
  useEffect(() => {
    fetch(`http://127.0.0.1:4010/offers/${match.params.id}`, {
      headers: new Headers({
        Authorization: "Bearer loremipsum"
      })
    })
      .then(response => {
        return response.status === 200 ? response.json() : [];
      })
      .then(json => {
        console.log(json);

        setState([json]);
      });
    return () => {};
  }, []);

  return (
    <div>
      <ul>
        {state.map(item => {
          return (
            <li key={item.id}>
              <button type="button" onClick={history.goBack}>
                Back to the list
              </button>
              <p>
                <b>Title:</b> {item.title}
              </p>
              <p>
                <b>Id: </b>
                {match.params.id}
              </p>
              <p>
                <b>Desription:</b> {item.description}
              </p>
              <p>
                <b>Rating:</b> {item.rating}
              </p>
              <p>
                <b>Price:</b> {item.price}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
