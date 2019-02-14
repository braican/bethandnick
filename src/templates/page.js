import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import BaseLayout from '../layouts/BaseLayout';

const Page = props => {
  const { data, pageContext } = props;
  const location = pageContext.slug || 'home';
  const { content, acf, title } = data.wordpressPage;
  const featuredImage = acf.page_featured_image.localFile.childImageSharp.fluid;

  return (
    <BaseLayout location={location} featuredImage={featuredImage} pageTitle={title}>
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
              fluid(maxWidth: 680) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
      }
    }
  }
`;
