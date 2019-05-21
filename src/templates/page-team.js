import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Person from '../components/Person';


const Page = ({ data, pageContext }) => {
  const location = pageContext.slug || 'home';
  const { title, content, wedding_party, acf: { page_featured_image } } = data.wordpressPage;
  const { the_girls, the_guys, the_family } = wedding_party;
  const featuredImage = page_featured_image ? page_featured_image.localFile.childImageSharp.fluid : null;

  // State
  const [activeGroup, setActiveGroup] = useState(the_girls);
  const [visibleCount, setVisibleCount] = useState(0);

  let vc = 0;

  const updateVisibleCount = isVisible => {
    vc = vc + isVisible;

    if (vc < 0) {
      vc = 0;
    }

    setVisibleCount(vc);
  };


  return (
    <>
      <Header linkTitle={location !== 'home'} />

      <Wrapper contextClass={`main page--${location || 'base'}`}>

        <div className="teampage__contentpane">

          {title ? <h2 className="page-title">{title}</h2> : null}
          <div className="content__main" dangerouslySetInnerHTML={{ __html: content }} />
          <div className="team__contents">
            <button onClick={() => setActiveGroup(the_guys)}>Groomsman</button> |
            <button onClick={() => setActiveGroup(the_girls)}>Bridesmaids</button> |
            <button onClick={() => setActiveGroup(the_family)}>Families</button>
          </div>

          <div className="teampage__imagepane">
            {featuredImage && <Img className={`team__default-img${visibleCount === 0 ? ' is-visible' : ''}`} fluid={featuredImage} />}
          </div>

          {the_girls && (
            <ul>
              {activeGroup.map(person => <Person key={person.name} person={person} updateVisibleCount={updateVisibleCount} />)}
            </ul>
          )}

          <div className="team__footer">
          Groomsman | Bridesmaids | Families
          </div>

          <Footer />
        </div>
      </Wrapper>
    </>
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
      }
      wedding_party {
        the_girls {
          name
          role
          pictures {
            image {
              localFile {
                publicURL
                childImageSharp {
                  fluid(maxWidth: 680, quality: 90) {
                    ...GatsbyImageSharpFluid_noBase64
                  }
                }
              }
            }
          }
        }
        the_guys {
          name
          role
          pictures {
            image {
              localFile {
                publicURL
                childImageSharp {
                  fluid(maxWidth: 680, quality: 90) {
                    ...GatsbyImageSharpFluid_noBase64
                  }
                }
              }
            }
          }
        }
        the_family {
          name
          role
          pictures {
            image {
              localFile {
                publicURL
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
  }
`;
