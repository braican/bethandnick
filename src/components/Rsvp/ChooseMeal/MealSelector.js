import React from 'react';
import PropTypes from 'prop-types';
import mealOptions from '../_data/meals';


const MealSelector = ({ name, checked, onChange }) => (
  <ul>
    {mealOptions.map(({ key, label }) => (
      <li key={key}>
        <label>
          {label}
          <input type="radio" name={name} value={label} checked={checked === label} onChange={onChange} />
        </label>
      </li>
    ))}
  </ul>
);

MealSelector.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default MealSelector;
