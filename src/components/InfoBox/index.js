import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';

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
          <p>
            {wedding_date} at {venue_name}
          </p>

          <Nav />
        </div>
      );
    }}
  />
);

export default InfoBox;
