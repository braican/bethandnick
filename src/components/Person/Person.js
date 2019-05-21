import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './Person.scss';

const Person = ({ person, updateImage }) => {
  const el = useRef();
  const picture = person.picture ? person.picture.localFile.childImageSharp.fluid : null;

  useEffect(() => {
    if (!el.current || !picture) {
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0.5) {
          updateImage(picture);
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    });

    observer.observe(el.current);

    return () => {
      observer.unobserve(el.current);
    };

  }, []);

  return (
    <li className="Person" ref={el}>
      <div>
        <h6 className="person__name">{person.name}</h6>
        <p>{person.role}</p>
      </div>
    </li>
  );
};

Person.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    picture: PropTypes.object,
  }),
  updateImage: PropTypes.func,
};

export default Person;
