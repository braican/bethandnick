import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { isDesktop, className } from '../../util';

import styles from './Person.module.scss';

const Person = ({ person, updateVisibleCount }) => {
  const el = useRef();
  const { name, role, pictures } = person;
  const picCount = pictures ? pictures.length : [];

  // State
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {

    if (!isDesktop() || !el.current || pictures.length === 0) {
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
    <li {...className(styles.person, isVisible && styles.personVisible)} ref={el} data-person={name}>
      <div>
        <h6 className={styles.name}>{name}</h6>
        <p>{role}</p>
      </div>
      <div {...className(styles.pics)}>
        {picCount > 0 && pictures.filter(pic => pic && pic.image).map((pic, index) => <div className={styles.pic} key={index}><img alt="" src={pic.image.localFile.publicURL} /></div>)}
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
