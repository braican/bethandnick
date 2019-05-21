import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Person from '../components/Person';

import bridesmaidIcon from '../svg/bridesmaid.svg';
import groomsmanIcon from '../svg/groomsman.svg';
import familyIcon from '../svg/family.svg';


const Page = ({ data, pageContext }) => {
  const location = pageContext.slug || 'home';
  const { title, content, wedding_party, acf: { page_featured_image } } = data.wordpressPage;
  const { the_girls, the_guys, the_family } = wedding_party;
  const featuredImage = page_featured_image ? page_featured_image.localFile.childImageSharp.fluid : null;

  // State
  const [activeGroup, setActiveGroup] = useState(the_girls);
  const [visibleCount, setVisibleCount] = useState(0);
  const [isScrolling, setScrolling] = useState(false);

  let vc = 0;

  const updateVisibleCount = isVisible => {
    vc = vc + isVisible;

    if (vc < 0) {
      vc = 0;
    }

    setVisibleCount(vc);
  };

  const handleNavClick = group => {
    setActiveGroup(group);

    setScrolling(true);
    setTimeout(() => setScrolling(false), 1000);

    document.querySelector('#active-group').scrollIntoView({
      behavior: 'smooth',
    });
  };

  // eslint-disable-next-line
  const Nav = ({ footer }) => (
    <div className={`team__nav team__nav--${footer ? 'footer' : 'main' }`}>
      <button onClick={() => handleNavClick(the_girls)} className={`team__navlink${activeGroup === the_girls ? ' active' : ''}`}>
        <svg><use xlinkHref={`#${bridesmaidIcon.id}`} /></svg>
        <span>Bridesmaids</span>
      </button>
      <button onClick={() => handleNavClick(the_guys)} className={`team__navlink${activeGroup === the_guys ? ' active' : ''}`}>
        <svg><use xlinkHref={`#${groomsmanIcon.id}`} /></svg>
        <span>Groomsmen</span>
      </button>
      <button onClick={() => handleNavClick(the_family)} className={`team__navlink${activeGroup === the_family ? ' active' : ''}`}>
        <svg><use xlinkHref={`#${familyIcon.id}`} /></svg>
        <span>Families</span>
      </button>
    </div>
  );

  return (
    <>
      <Header linkTitle={location !== 'home'} />

      <Wrapper contextClass={`main page--${location || 'base'}${isScrolling ? ' scrolling-to-content' : ''}`}>

        <div className="teampage__contentpane">

          {title ? <h2 className="page-title">{title}</h2> : null}
          <div className="content__main" dangerouslySetInnerHTML={{ __html: content }} />
          <Nav />

          <div className="teampage__imagepane">
            {featuredImage && <Img className={`team__default-img${visibleCount === 0 ? ' is-visible' : ''}`} fluid={featuredImage} />}
          </div>

          {activeGroup && (
            <ul id="active-group">
              {activeGroup.map(person => <Person key={person.name} person={person} updateVisibleCount={updateVisibleCount} />)}
            </ul>
          )}

          <Nav footer />

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
