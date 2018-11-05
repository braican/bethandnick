import React from 'react';
import { graphql } from 'gatsby';
import BaseLayout from '../layouts/BaseLayout';

export default props => {
  const { data } = props;
  const { content, page_featured_image } = data.wordpressPage;
  const location = props['*'] || 'home';

  return (
    <BaseLayout location={location} featuredImage={page_featured_image.source_url}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
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
