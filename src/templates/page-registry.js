import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { contentFilter } from '../util';

import SplitLayout from '../layouts/Split';
import Seo from '../components/Seo';
import Registry from '../components/Registry';

const Page = ({ data }) => {
  const {
    content,
    title,
    acf: { page_featured_image },
  } = data.wordpressPage;
  const featuredImage = page_featured_image
    ? page_featured_image.localFile.childImageSharp.fluid
    : null;
  const filteredContent = contentFilter(content);

  return (
    <SplitLayout featuredImage={featuredImage} bigHeader={false} pageTitle={title}>
      <Seo title={title} />
      <div className="content__main" dangerouslySetInnerHTML={{ __html: filteredContent }} />
      <Registry />
    </SplitLayout>
  );
};

Page.propTypes = {
  data: PropTypes.shape({
    wordpressPage: PropTypes.shape({
      content: PropTypes.string,
      title: PropTypes.string,
      acf: PropTypes.shape({
        page_featured_image: PropTypes.object,
      }),
    }),
  }),
};

export default Page;

export const query = graphql`
  query ($slug: String!) {
    wordpressPage(slug: { eq: $slug }) {
      title
      content
      acf {
        page_featured_image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 680, quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`;
