import React from 'react';
import PropTypes from 'prop-types';

import './Person.scss';

const Person = ({ person }) => (
  <li className="Person">
    <div>
      <h6>{person.name}</h6>
      <p>{person.role}</p>
    </div>
  </li>
);

Person.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    picture: PropTypes.object,
  }),
};

export default Person;
