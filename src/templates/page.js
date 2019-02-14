import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import BaseLayout from '../layouts/BaseLayout';

const Page = props => {
  const { data, pageContext } = props;
  const location = pageContext.slug || 'home';
  const { content, page_image, title } = data.wordpressPage;

  return (
    <BaseLayout location={location} featuredImage={page_image} pageTitle={title}>
      <div className="content__main" dangerouslySetInnerHTML={{ __html: content }} />
    </BaseLayout>
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
      page_image: PropTypes.string,
    }),
  }),
};

export default Page;

export const query = graphql`
  query($slug: String!) {
    wordpressPage(slug: { eq: $slug }) {
      title
      content
      page_image {
        photo {
          localFile {
            childImageSharp {
              # Try editing the "width" and "height" values.
              resolutions(width: 200, height: 200) {
                src
              }
            }
          }
        }
      }
    }
  }
`;
