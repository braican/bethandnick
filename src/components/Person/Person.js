import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import './Person.scss';

const Person = ({ person, updateVisibleCount }) => {
  const el = useRef();
  const { name, role, pictures } = person;
  const picCount = pictures ? pictures.length : [];

  // State
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    if (!el.current || pictures.length === 0) {
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: [0.5],
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const isInView = entry.intersectionRatio > .5;
        setVisible(isInView);
        updateVisibleCount(isInView ? 1 : -1);
      });
    }, observerOptions);
    observer.observe(el.current);

    return () => {
      observer.unobserve(el.current);
    };

  }, []);

  return (
    <li className={`Person${isVisible ? ' is-visible' : ''}`} ref={el} data-person={name}>
      <div>
        <h6 className="person__name">{name}</h6>
        <p>{role}</p>
      </div>
      <div className={`person__pics person__pics--${picCount}`}>
        {picCount > 0 && pictures.map((pic, index) => <img alt="" className={`person-pic person-pic--${index}`} src={pic.image.localFile.publicURL} key={index} />)}
      </div>
    </li>
  );
};

Person.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    picture: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  updateVisibleCount: PropTypes.func.isRequired,
};

export default Person;
