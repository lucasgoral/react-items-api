import React from "react";
import PropTypes from "prop-types";
import { v1 } from "uuid";
import Accordion from "../components/Accordion";

const RecipeItem = ({ title, ingredients, remove, edit }) => {
  return (
    <Accordion title={title}>
      <div>
        <ul>
          {ingredients.map(item => (
            <li key={v1()}>{item}</li>
          ))}
        </ul>
        <button className="bt bt-danger" type="button" onClick={remove}>
          Remove
        </button>
        <button type="button" className="bt" onClick={edit}>
          Edit
        </button>
      </div>
    </Accordion>
  );
};

RecipeItem.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  remove: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired
};

export default RecipeItem;
