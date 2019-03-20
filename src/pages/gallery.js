import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import Footer from '../components/Footer';

import './styles/gallery.scss';

const GalleryPage = ({ wordpressBethandnickGallery: data }) => {
  const { gallery } = data;

  const galleryWidth = gallery.reduce((prev, curr) => {
    return prev + curr.image.localFile.childImageSharp.fixed.width;
  }, 0);

  console.log(galleryWidth);

  return (
    <Wrapper contextClass="layout--gallery">
      <Header contextClass="header--main" />

      <main className="GalleryLayout">
        {gallery ? (
          <div className="Gallery" style={{ width: `${galleryWidth}px` }}>
            {gallery.map(({ image }, index) => {
              const { aspectRatio } = image.localFile.childImageSharp.fixed;
              // let aspectClass = 'base';

              // if (aspectRatio > 1.4) {
              //   aspectClass = 'wide';
              // } else if (aspectRatio < 1) {
              //   aspectClass = 'tall';
              // }

              return <Img key={index} fixed={image.localFile.childImageSharp.fixed} />;
            })}
          </div>
        ) : null}
      </main>

      <Footer />
    </Wrapper>
  );
};

GalleryPage.propTypes = {
  wordpressBethandnickGallery: PropTypes.shape({
    gallery: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.shape({
          localFile: PropTypes.shape({
            childImageSharp: PropTypes.shape({}),
          }),
        }),
      })
    ),
  }),
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
                  fixed(height: 680) {
                    ...GatsbyImageSharpFixed
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
