import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import SimpleLayout from '../layouts/Simple';
import Seo from '../components/Seo';
import Team from '../components/Team';

const Page = ({ data }) => {
  const { title, content, wedding_party: { the_girls, the_guys, the_family } } = data.wordpressPage;

  return (
    <SimpleLayout>
      <Seo title="The Team" />

      <div className="simplelayout__main">
        {title && <h2 className="page-title" title={title}>{title}</h2>}
        <div className="content__main" dangerouslySetInnerHTML={{ __html: content }} />
      </div>

      <Team girls={the_girls} guys={the_guys} family={the_family} />
    </SimpleLayout>
  );
};

Page.propTypes = {
  data: PropTypes.shape({
    wordpressPage: PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.string,
      wedding_party: PropTypes.shape({
        the_girls: PropTypes.array,
        the_guys: PropTypes.array,
        the_family: PropTypes.array,
      }),
    }),
  }),
};

export default Page;

export const query = graphql`
  fragment PersonImage on File {
    publicURL
    childImageSharp {
      fluid(maxWidth: 680, quality: 90) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }

  query TeamPageQuery($slug: String!) {
    wordpressPage(slug: { eq: $slug }) {
      title
      content
      acf {
        page_featured_image {
          localFile {
            ...PersonImage
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
                ...PersonImage
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
                ...PersonImage
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
                ...PersonImage
              }
            }
          }
        }
      }
    }
  }
`;
