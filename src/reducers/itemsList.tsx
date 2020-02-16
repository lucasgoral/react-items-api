import { REMOVE_ITEM, ADD_ITEM, EDIT_ITEM } from '../actions/Actions';

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
interface Action {
	type: string;
	items?: any;
}

console.log('test');
const itemsList: Item[] = [];

const reducer = (state = itemsList, action: Action) => {
	switch (action.type) {
		case ADD_ITEM:
			return [ ...state, ...action.items ];

		default:
			return state;
	}
};

export default reducer;
