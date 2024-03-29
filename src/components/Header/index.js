import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql, Link } from 'gatsby';

import { className } from '../../util';
import OptionalLink from '../Util/OptionalLink';
import AmpersandIcon from '../../svg/ampersand';
import Arrow from '../../svg/arrow-right';

import Promo from '../Promo';

import styles from './Header.module.scss';

const Header = ({ info, big = false, inNav = false, fixed = false, hero = false }) => (
  <div
    {...className(
      styles.header,
      big && styles.bigHeader,
      !big && !inNav && styles.defaultHeader,
      hero && styles.defaultHeaderOverlay,
      inNav && styles.inNavHeader,
      fixed && styles.navFixed
    )}
  >
    <OptionalLink to="/" when={!big && !inNav}>
      <h1 className={styles.title}>
        <span>Beth</span>{' '}
        <span className={styles.ampersand}>
          <AmpersandIcon />
        </span>{' '}
        <span>Nick</span>
      </h1>

      {(big || inNav) && <p className={styles.save_new_date}>Save the date!</p>}

      <div className={styles.info}>
        <p className={styles.date}>{info.wedding_date}</p>
        <p className={styles.venue}>{info.venue_name}</p>
      </div>

      {big && (
        <div className={styles.promo}>
          <Promo />
        </div>
      )}
    </OptionalLink>
  </div>
);

Header.propTypes = {
  info: PropTypes.shape({
    wedding_date: PropTypes.string,
    venue_name: PropTypes.string,
  }),
  big: PropTypes.bool,
  inNav: PropTypes.bool,
  fixed: PropTypes.bool,
  hero: PropTypes.bool,
};

Header.defaultProps = {
  big: false,
  inNav: false,
  fixed: false,
  hero: false,
};

const HeaderWithQuery = (props) => (
  <StaticQuery
    query={graphql`
      query HeaderStaticQuery {
        wordpressBethandnickInfo {
          wedding_date
          venue_name
        }
      }
    `}
    render={(data) => <Header {...props} info={data.wordpressBethandnickInfo} />}
  />
);

export default HeaderWithQuery;
