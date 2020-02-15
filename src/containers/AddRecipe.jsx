import React, { useState } from 'react';
import { v1 } from 'uuid';
import { connect } from 'react-redux';
import { ADD_ITEM } from '../actions/Actions';
import { strToArray } from '../utils';
import RecipeForm from '../components/RecipeForm';

const mapStateToProps = (state) => {
	const { recipesList } = state;
	return { recipesList };
};

const mapDispatchToProps = (dispatch) => {
	return {
		addItem: (title, ingredients) =>
			dispatch({
				type: ADD_ITEM,
				title,
				ingredients: ingredients,
				key: v1()
			})
	};
};

const AddRecipe = ({ addItem, close }) => {
	const initialState = {
		title: '',
		ingredients: ''
	};
	const [ state, setState ] = useState(initialState);
	const handleChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const title = state.title.trim();
		const ingredients = strToArray(state.ingredients);
		addItem(title, ingredients);
		close();
		setState(initialState);
	};

	return (
		<RecipeForm
			handleSubmit={handleSubmit}
			handleChange={handleChange}
			title={state.title}
			ingredients={state.ingredients}
			edit={false}
			close={close}
		/>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipe);
