import React from 'react';
import { graphql } from 'gatsby';
import BaseLayout from '../layouts/BaseLayout';

export default props => {
  const location = props['*'] || 'home';
  const { data } = props;
  const { content, page_image } = data.wordpressPage;

  return (
    <BaseLayout location={location} featuredImage={page_image}>
      <div className="content__main" dangerouslySetInnerHTML={{ __html: content }} />
    </BaseLayout>
  );
};

export const query = graphql`
  query($slug: String!) {
    wordpressPage(slug: { eq: $slug }) {
      title
      content
      page_image
    }
  }
`;
