import React from 'react';
import { graphql } from 'gatsby';
import BaseLayout from '../layouts/BaseLayout';

export default props => {
  const { data } = props;
  const post = data.wordpressPage;
  const location = props['*'] || 'home';

  return (
    <BaseLayout location={location}>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </BaseLayout>
  );
};

export const query = graphql`
  query($slug: String!) {
    wordpressPage(slug: { eq: $slug }) {
      title
      content
    }
  }
`;
