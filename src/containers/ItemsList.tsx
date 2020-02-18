import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { SingleItem } from '../types/interfaces';
import { ADD_ITEMS } from '../actions/actions';

const mapDispatchToProps = (dispatch: (arg0: { type: string; items: SingleItem[] }) => any) => {
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
	const [ errorState, setErrorState ] = useState(false);

	const loadMore = () => {
		fetch(`http://127.0.0.1:4010/offers?limit=10&offset=${itemsList.offset}`, {
			headers: new Headers({
				Authorization: 'Bearer loremipsum'
			})
		})
			.then((response) => {
				return response.status === 200 ? response.json() : [];
			})
			.then((json) => {
				const filteredData = json.filter((item: SingleItem) => item.status === 'published');
				addItem(filteredData);
			})
			.then(() => {
				setTimeout(() => {
					shouldLoadMore();
				}, 50);
				setErrorState(false);
			})
			.catch((e) => {
				console.log(e);
				setErrorState(true);
			});
	};
	const shouldLoadMore = () => {
		if (itemsListRef.current) {
			if (itemsListRef.current.clientHeight <= window.innerHeight + window.pageYOffset) {
				loadMore();
			}
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', () => {
			shouldLoadMore();
		});
		if (itemsList.items.length === 0) {
			shouldLoadMore();
		}

		// clean up
		return () => window.removeEventListener('scroll', shouldLoadMore);
	}, []);
	return (
		<div>
			<div ref={itemsListRef}>
				<ul>
					{itemsList.items.map((item: SingleItem) => {
						return (
							<li key={item.id}>
								<p>
									<Link to={`/offer/${item.id}`}>
										<b>Title: </b> {item.title}
									</Link>
								</p>

								<p>
									<b>Status: </b>
									{item.status}
								</p>
								<p>
									<b>Desription: </b>
									{item.description}
								</p>
							</li>
						);
					})}
				</ul>
				{errorState ? (
					<button className="bt bt-danger" onClick={shouldLoadMore}>
						Cannot load data. Click to try again.
					</button>
				) : null}
			</div>
		</div>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
