import React, { useState, useEffect } from 'react';
interface Items {
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
const initialState: Items[] = [];

export default function ItemsList() {
	const [ state, setstate ] = useState(initialState);
	const [ offset, setOffset ] = useState(0);
	const loadMore = () => {
		setOffset(offset + 1);
	};
	useEffect(
		() => {
			fetch(`http://127.0.0.1:4010/offers?limit=10&offset=${offset}`, {
				headers: new Headers({
					Authorization: 'Bearer loremipsum'
				})
			})
				.then((response) => {
					return response.status === 200 ? response.json() : [];
				})
				.then((json) => {
					console.log(json);

					setstate([ ...state, ...json ]);
				});
			return () => {};
		},
		[ offset ]
	);
	return (
		<div>
			<ul>
				{state.map((item) => {
					return (
						<li key={item.id}>
							<b>Title:</b> {item.title}
						</li>
					);
				})}
			</ul>
			<button onClick={loadMore}>Load more</button>
		</div>
	);
}
