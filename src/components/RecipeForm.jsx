import React, { useState } from "react";
import PropTypes from "prop-types";
import { strToArray } from "../utils";

const RecipeForm = ({
  handleSubmit,
  handleChange,
  ingredients,
  title,
  edit,
  close
}) => {
  const initialValidation = {
    title: title.trim().length > 0,
    ingredients: strToArray(ingredients).length > 0,
    titleChanged: false,
    ingChanged: false
  };

  const [validation, seValidation] = useState(initialValidation);
  const validate = e => {
    if (e.target.name === "title") {
      seValidation({
        ...validation,
        title: e.target.value.trim().length > 0,
        titleChanged: true
      });
    }
    if (e.target.name === "ingredients") {
      seValidation({
        ...validation,
        ingredients: strToArray(e.target.value).length > 0,
        ingChanged: true
      });
    }
  };
  const validAndHandleCHnage = e => {
    handleChange(e);
    validate(e);
  };

  const submitDisabled = () => {
    if (edit) {
      return (
        (validation.ingChanged || validation.titleChanged) &&
        validation.title &&
        validation.ingredients
      );
    }
    return (
      validation.ingChanged &&
      validation.titleChanged &&
      validation.title &&
      validation.ingredients
    );
  };
  return (
    <div>
      <form>
        <h2> {edit ? "Edit the recipe" : "Add a recipe"} </h2>
        <div>
          <h3> Recipe title </h3>
          <input
            type="text"
            name="title"
            onChange={validAndHandleCHnage}
            value={title}
            placeholder="Recipe title"
          />
          <p
            className="error"
            style={{
              display:
                !validation.title && validation.titleChanged ? "block" : "none"
            }}
          >
            Incorrect title
          </p>
        </div>
        <div>
          <h3> Ingredients </h3>
          <textarea
            name="ingredients"
            onChange={validAndHandleCHnage}
            value={ingredients}
            placeholder="List of ingredients separated by comma e.g. apple, banana, pear"
          />
          <p
            className="error"
            style={{
              display:
                !validation.ingredients && validation.ingChanged
                  ? "block"
                  : "none"
            }}
          >
            Incorrect ingredients list
          </p>
        </div>
        <button
          className={`bt  ${submitDisabled() ? "bt-good" : "bt-disabled"}`}
          type="button"
          onClick={handleSubmit}
        >
          {edit ? "Edit Item" : "Add item"}
        </button>
        <button type="button" className="bt" onClick={close}>
          Close
        </button>
      </form>
    </div>
  );
};

RecipeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  ingredients: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  edit: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};

export default RecipeForm;
