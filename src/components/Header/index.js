import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql, Link } from 'gatsby';

import './header.scss';

const Header = ({ siteTitle, featuredImage }) => (
  <StaticQuery
    query={graphql`
      query {
        allWordpressPage(sort: { fields: [menu_order], order: ASC }) {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
      }
    `}
    render={data => (
      <div className={`header${featuredImage ? ' header--has-featured' : ''}`}>
        <div className="header__meta">
          <h1 className="header__banner">
            {siteTitle.split(' ').map(part => (
              <span key={part}>{part}</span>
            ))}
          </h1>

          <nav className="l-main header__nav">
            <ul className="header__menu">
              <li>
                <Link to="/" className="header__link">
                  Home
                </Link>
              </li>
              {data.allWordpressPage.edges
                .filter(({ node }) => node.slug !== 'home')
                .map(({ node }) => (
                  <li key={node.id}>
                    <Link to={`/${node.slug}`} className="header__link">
                      {node.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </div>

        {featuredImage ? (
          <div className="header__featured-img">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 950 956">
              <g>
                <clipPath id="featured-mask">
                  <path
                    d="M950,868.45V0H101.75S89,29.73,72.62,78.71c-24.15,72-56.35,185.6-68.09,307.55C-10.6,543.36,8.22,714.33,121.94,828.05c71,71,164.38,106.52,262.74,120.52,139.94,19.92,290-3.65,400.35-30.28C883.27,894.58,950,868.45,950,868.45Z"
                    fill="none"
                  />
                </clipPath>
              </g>
              <image
                clipPath="url(#featured-mask)"
                height="104%"
                width="104%"
                xlinkHref={featuredImage}
                x="-10px"
              />
            </svg>
          </div>
        ) : null}
      </div>
    )}
  />
);

Header.propTypes = {
  featuredImage: PropTypes.string
};

export default Header;
