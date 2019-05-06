import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Person from '../components/Person';


const Page = ({ data, pageContext }) => {
  const location = pageContext.slug || 'home';
  const { content, acf, title } = data.wordpressPage;
  const { the_girls, the_guys, the_family, page_featured_image } = acf;
  const featuredImage = page_featured_image ? page_featured_image.localFile.childImageSharp.fluid : null;

  return (
    <Wrapper contextClass={`main page--${location || 'base'}`}>
      <div className="splitpane__img">
        {featuredImage ? (
          <Img src={featuredImage.src} size={featuredImage} fluid={featuredImage} />
        ) : null}
      </div>

      <div className="splitpane__content">
        <Header contextClass="header--main" linkTitle={location !== 'home'} />
        {title ? <h2 className="page-title">{title}</h2> : null}
        <div className="content__main" dangerouslySetInnerHTML={{ __html: content }} />

        {the_girls && (
          <ul>
            {the_girls.map( girl => <Person person={girl} key={girl.name} />)}
          </ul>
        )}

        <Footer />
      </div>
    </Wrapper>
  );
};

Page.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string,
  }),
  data: PropTypes.shape({
    wordpressPage: PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.string,
    }),
  }),
};

export default Page;

export const query = graphql`
  query($slug: String!) {
    wordpressPage(slug: { eq: $slug }) {
      title
      content
      acf {
        page_featured_image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 680, quality: 90) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
        the_girls {
          name
          role
          picture {
            localFile {
              childImageSharp {
                fluid(maxWidth: 680, quality: 90) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        }
        the_guys {
          name
          role
          picture {
            localFile {
              childImageSharp {
                fluid(maxWidth: 680, quality: 90) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        }
        the_family {
          name
          role
          picture {
            localFile {
              childImageSharp {
                fluid(maxWidth: 680, quality: 90) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        }
      }
    }
  }
`;
