import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import Wrapper from '../components/Wrapper';
import Header from '../components/Header';

const GalleryPage = ({ wordpressBethandnickGallery: data }) => {
  return (
    <Wrapper>
      <Header contextClass="header--main" />
      <h1>Test</h1>
    </Wrapper>
  );
};

GalleryPage.propTypes = {
  wordpressBethandnickGallery: PropTypes.object,
};

const GalleryPageWithQuery = () => (
  <StaticQuery
    query={graphql`
      query GalleryPage {
        wordpressBethandnickGallery {
          gallery {
            image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1680) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={GalleryPage}
  />
);

export default GalleryPageWithQuery;
