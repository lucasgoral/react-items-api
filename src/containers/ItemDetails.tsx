import React, { useState, useEffect } from 'react';
import { SingleItem } from '../types/interfaces';

export default function ItemDetails({ history, match }: any) {
	const initialState: SingleItem[] = [];
	const [ errorState, setErrorState ] = useState(false);
	const [ state, setState ] = useState(initialState);
	useEffect(() => {
		fetch(`http://127.0.0.1:4010/offers/${match.params.id}`, {
			headers: new Headers({
				Authorization: 'Bearer loremipsum'
			})
		})
			.then((response) => {
				return response.status === 200 ? response.json() : [];
			})
			.then((json) => {
				setState([ json ]);
			})
			.catch((e) => {
				console.log(e);
				setErrorState(true);
			});
		return () => {};
	}, []);

	return (
		<div>
				{state.map((item) => {
					return (
						<div key={item.id}>
							<button type="button" onClick={history.goBack} className="bt">
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
						</div>
					);
				})}
			{errorState ? <p>Cannot load data.</p> : null}
		</div>
	);
}
