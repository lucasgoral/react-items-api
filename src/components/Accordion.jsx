import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

const Accordion = ({ title, children }) => {
  const initialState = { display: false };
  const [state, setState] = useState(initialState);
  const childEl = useRef(null);
  const toggle = () => {
    setState({ display: !state.display });
  };

  return (
    <div className={`accordion ${state.display ? "open" : "close"}`}>
      <button type="button" className="accordion__title" onClick={toggle}>
        <h2>
          {title}
          <span className="accordion__arrow"></span>
        </h2>
      </button>
      <div
        className="accordion__wrapper"
        style={{ display: state.display ? "block" : "none" }}
      >
        <div ref={childEl} className="accordion__child">
          {children}
        </div>
      </div>
    </div>
  );
};

Accordion.propTypes = {
  title: PropTypes.string.isRequired
};

export default Accordion;
