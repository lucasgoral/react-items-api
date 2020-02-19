import React, { useEffect, useRef, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { SingleItem } from '../types/interfaces';
import { ADD_ITEMS, SET_SCROLL } from '../actions/actions';

const mapDispatchToProps = (dispatch: (arg0: { type: string; items?: SingleItem[]; y?: number; }) => any) => {
	return {
		addItem: (items: SingleItem[]) =>
			dispatch({
				type: ADD_ITEMS,
				items
			}),
		setScroll: (yPos: number) =>
			dispatch({
				type: SET_SCROLL,
				y: yPos
			}),


	};
};

const mapStateToProps = (state: { itemsList: any, scrollPos: number }) => {
	const { itemsList, scrollPos } = state;

	return { itemsList, scrollPos };
};

function ItemsList({ itemsList, addItem, setScroll, scrollPos }: any) {

	const itemsListRef = useRef<HTMLDivElement>(null);
	const [errorState, setErrorState] = useState(false);

	const loadMore = useCallback(() => {
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
	}, []);
	const shouldLoadMore = useCallback(() => {
		if (itemsListRef.current) {
			if (itemsListRef.current.clientHeight <= window.innerHeight + window.pageYOffset) {
				loadMore();
			}
		}
	}, []);

	const saveScroll = useCallback(() => {
		
		setScroll(window.pageYOffset);
	}, [])


	useEffect(() => {
		window.scrollTo(0, scrollPos);
		window.addEventListener('scroll',
			shouldLoadMore
		);
		window.addEventListener('scroll',
			saveScroll
		);
		if (itemsList.items.length === 0) {
			shouldLoadMore();
		}

		// clean up
		return () => {
			window.removeEventListener('scroll', shouldLoadMore);
			window.removeEventListener('scroll', saveScroll)
		}

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
