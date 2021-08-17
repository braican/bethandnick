import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import { className } from '../../util';

import styles from './Person.module.scss';

const Person = ({ person }) => {
  const { name, role, pictures } = person;
  const photos = pictures.filter((pic) => pic && pic.image);

  return (
    <div className={styles.person} data-person={name}>
      <div className={styles.about}>
        <div className={styles.aboutWrap}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.role}>{role}</p>
        </div>
      </div>
      <div className={styles.pics}>
        {photos.length > 0 &&
          photos.map(({ image }, index) => {
            const { aspectRatio } = image.localFile.childImageSharp.fluid;
            return (
              <div {...className(styles.pic, aspectRatio > 1.1 && styles.picWide)} key={index}>
                <Img
                  style={{ overflow: 'visible' }}
                  fluid={image.localFile.childImageSharp.fluid}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

Person.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    pictures: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default Person;
