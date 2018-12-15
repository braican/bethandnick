import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import Nav from '../../components/Nav';

import './infobox.scss';

const InfoBox = () => (
  <StaticQuery
    query={graphql`
      {
        wordpressBethandnickInfo {
          wedding_date
          venue_name
        }
      }
    `}
    render={data => {
      const { wedding_date, venue_name } = data.wordpressBethandnickInfo;

      return (
        <div className="infobox">
          <p className="infobox__wedding-info">
            <span className="wedding-info__date">{wedding_date}</span>
            <br />
            <span className="wedding-info__venue">at {venue_name}</span>
          </p>

          <Nav weddingDate={wedding_date} venueName={venue_name} />
        </div>
      );
    }}
  />
);

InfoBox.propTypes = {
  siteName: PropTypes.string
};

export default InfoBox;
