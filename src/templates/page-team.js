import React, { useEffect, useState } from 'react';
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

  const [splitImage, setSplitImage] = useState(featuredImage);
  const [imageVisible, setImageVisibility] = useState(true);

  const updateImage = img => {
    setSplitImage(img);
  //   setImageVisibility(false);
  //   setTimeout(() => setSplitImage(img), 400);
  //   setTimeout(() => setImageVisibility(true), 400);
  };

  const loadImage = src => new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve();
    img.src = src;
  });


  const loadImages = () => {
    const deferredImages = the_girls.filter(girl => girl.picture).map(girl => loadImage(girl.picture.localFile.childImageSharp.fluid));
    Promise.all(deferredImages).then(() => {
      console.log('all have been loaded');

    });

  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <Wrapper contextClass={`main page--${location || 'base'}`}>
      <Header linkTitle={location !== 'home'} />

      <div className="splitpane__img">
        {splitImage ? <Img className={`person-image ${imageVisible ? 'person-image--visible' : ''}`} fluid={splitImage} /> : null}
      </div>

      <div className="splitpane__content">

        {title ? <h2 className="page-title">{title}</h2> : null}
        <div className="content__main" dangerouslySetInnerHTML={{ __html: content }} />
        <div>Groomsman | Bridesmaids | Families</div>

        {the_girls && (
          <ul>
            {the_girls.map( girl => <Person key={girl.name} person={girl} updateImage={updateImage} />)}
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
      }
      wedding_party {
        the_girls {
          name
          role
          pictures {
            image {
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
        the_guys {
          name
          role
          pictures {
            image {
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
        the_family {
          name
          role
          pictures {
            image {
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
  }
`;
