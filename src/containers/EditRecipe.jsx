import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { EDIT_ITEM } from "../actions/Actions";
import { strToArray } from "../utils";
import RecipeForm from "../components/RecipeForm";

const mapStateToProps = state => {
  const { recipesList } = state;
  return { recipesList };
};

const mapDispatchToProps = dispatch => {
  return {
    editItem: (title, ingredients, key) => {
      dispatch({
        type: EDIT_ITEM,
        title,
        ingredients: strToArray(ingredients),
        key
      });
    }
  };
};

const EditRecipe = ({ itemId, editItem, recipesList, close }) => {
  const itemToEdit = recipesList.find(item => item.key === itemId);

  const initialState = {
    title: itemToEdit.title,
    ingredients: itemToEdit.ingredients.toString(),
    key: itemToEdit.key
  };

  const [state, setState] = useState(initialState);
  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    editItem(state.title, state.ingredients, state.key);
    close();
  };
  return (
    <RecipeForm
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      title={state.title}
      ingredients={state.ingredients}
      edit={true}
      close={close}
    />
  );
};

EditRecipe.propTypes = {
  itemId: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRecipe);
