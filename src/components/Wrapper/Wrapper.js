import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { decodeHtmlEntities } from '../../util/strings';

import Nav from '../Nav';

const Wrapper = ({ contextClass, data, children }) => {
  useEffect(() => {
    document.body.classList.remove('prevent-scroll', 'menu-is-open');
  }, []);

  const siteName = data.wordpressSiteMetadata.name;
  const { wedding_date: weddingDate, venue_name: venueName } = data.wordpressBethandnickInfo;

  return (
    <div className={contextClass}>
      <Helmet
        title={decodeHtmlEntities(siteName)}
        meta={[{ name: 'description', content: 'Beth and Nick are getting married.' }]}
      />
      {children}
      <Nav weddingDate={weddingDate} venueName={venueName} />
    </div>
  );
};

Wrapper.propTypes = {
  contextClass: PropTypes.string,
  data: PropTypes.shape({
    wordpressSiteMetadata: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
  children: PropTypes.node,
};

const WrapperQuery = props => (
  <StaticQuery
    query={graphql`
      {
        wordpressSiteMetadata {
          name
        }
        wordpressBethandnickInfo {
          wedding_date
          venue_name
        }
      }
    `}
    render={data => <Wrapper data={data} {...props} />}
  />
);

export default WrapperQuery;
