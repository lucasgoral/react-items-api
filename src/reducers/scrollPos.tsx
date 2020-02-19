import { SET_SCROLL } from '../actions/actions';


const scrollPos = 0;

const reducer = (state = scrollPos, action: { type: string; y: number }) => {
	switch (action.type) {
		case SET_SCROLL:
			return action.y

		default:
			return state;
	}
};

export default reducer;
