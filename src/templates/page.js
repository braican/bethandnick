import React from 'react';
import { graphql } from 'gatsby';
import BaseLayout from '../layouts/BaseLayout';

export default ({ data }) => {
  const post = data.wordpressPage;

  return (
    <BaseLayout>
      <h1>{post.title}</h1>
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
