import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql, Link } from 'gatsby';

import styles from './Footer.module.scss';

const Footer = ({ info }) => (
  <footer className={styles.footer}>
    <div className={styles.main}>
      <div>
        <p>
          &copy; {new Date().getFullYear()} Beth &amp;{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://www.braican.com">
            Nick
          </a>{' '}
          | {info.wedding_date}
        </p>

        {/* Footer promo */}
        <p className={styles.mainContent}>
          <Link className={styles.footerPromo} to="/accommodations/">
            Book your hotel!
          </Link>
        </p>
      </div>
    </div>
  </footer>
);

Footer.propTypes = {
  info: PropTypes.shape({
    wedding_date: PropTypes.string,
  }),
};

const FooterWithQuery = (props) => (
  <StaticQuery
    query={graphql`
      query FooterStaticQuery {
        wordpressBethandnickInfo {
          wedding_date
        }
      }
    `}
    render={(data) => <Footer {...props} info={data.wordpressBethandnickInfo} />}
  />
);

export default FooterWithQuery;
