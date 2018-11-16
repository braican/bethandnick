import React from 'react';
import { graphql } from 'gatsby';
import BaseLayout from '../layouts/BaseLayout';

export default props => {
  const location = props['*'] || 'home';
  const { data } = props;
  const { content, page_featured_image } = data.wordpressPage;
  const featuredImage = page_featured_image ? page_featured_image.source_url : null;

  return (
    <BaseLayout location={location} featuredImage={featuredImage}>
      <div className="content__main" dangerouslySetInnerHTML={{ __html: content }} />
    </BaseLayout>
  );
};

export const query = graphql`
  query($slug: String!) {
    wordpressPage(slug: { eq: $slug }) {
      title
      content
      page_featured_image {
        source_url
      }
    }
  }
`;
