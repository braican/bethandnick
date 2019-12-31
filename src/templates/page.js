import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { contentFilter } from '../util';

import SplitLayout from '../layouts/Split';
import Seo from '../components/Seo';

const Page = ({ data, pageContext: { slug } }) => {
  const { content, title, acf: { page_featured_image } } = data.wordpressPage;
  const featuredImage = page_featured_image ? page_featured_image.localFile.childImageSharp.fluid : null;
  const filteredContent = contentFilter(content);

  return (
    <SplitLayout featuredImage={featuredImage} bigHeader={slug === 'home'}>
      <Seo title={title} />
      <div className="content__main" dangerouslySetInnerHTML={{ __html: filteredContent }} />
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
  pageContext: PropTypes.shape({
    slug: PropTypes.string,
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
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`;
