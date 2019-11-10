import React from 'react';
import PropTypes from "prop-types";

export const Mistakes = (props) => {
  return <div className="game__mistakes">
    {new Array(props.mistakes).fill(true).map((it, i) => {
      return <div key={i} className="wrong"></div>;
    })}
  </div>;
};

Mistakes.propTypes = {
  mistakes: PropTypes.number.isRequired
};
